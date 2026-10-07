import { readFile, writeFile, unlink } from 'node:fs/promises';
import { generateData, Row } from '../../data/generate.js';
import { openDatabase, run, Connection } from './query.js';
import { questions } from '../../benchmark/questions.js';

function literal(value: Row[string]) {
  if (value === null) return 'NULL';
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
  if (typeof value === 'number') return String(value);
  return `'${value.replaceAll("'", "''")}'`;
}

async function insertRows(connection: Connection, table: string, rows: Row[]) {
  if (!rows.length) return;
  const columns = Object.keys(rows[0]);
  for (let i = 0; i < rows.length; i += 500) {
    const chunk = rows.slice(i, i + 500).map((row) => `(${columns.map((c) => literal(row[c])).join(',')})`).join(',');
    await run(connection, `INSERT INTO ${table} (${columns.join(',')}) VALUES ${chunk}`);
  }
}

export async function setupDatabase(path = 'data/benchmark.duckdb') {
  await unlink(path).catch(() => undefined);
  const { instance, connection } = await openDatabase(path);
  await run(connection, await readFile('data/schema.sql', 'utf8'));
  const generated = generateData();
  for (const [table, rows] of Object.entries(generated.tables)) await insertRows(connection, table, rows);
  await writeFile('benchmark/questions.json', JSON.stringify(questions, null, 2) + '\n');
  for (const question of questions) await writeFile(`gold/sql/${question.id.toLowerCase()}.sql`, question.sql + '\n');
  await writeFile('data/.dataset-version', '26.10.0\n');
  connection.closeSync(); instance.closeSync();
  return generated;
}
