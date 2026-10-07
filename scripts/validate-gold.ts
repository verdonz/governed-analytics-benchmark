import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { openDatabase, queryRows } from '../src/database/query.js';
import { questions } from '../benchmark/questions.js';
await mkdir('gold', { recursive: true });
const { instance, connection } = await openDatabase();
const answers: Record<string, unknown> = {};
for (const q of questions) answers[q.id] = await queryRows(connection, q.sql);
const storedPath = 'gold/answers.json';
let stored: Record<string, unknown> = {};
try { stored = JSON.parse(await readFile(storedPath, 'utf8')); } catch { /* first generation */ }
for (const q of questions) if (stored[q.id] && JSON.stringify(stored[q.id]) !== JSON.stringify(answers[q.id])) throw new Error(`Gold mismatch: ${q.id}`);
await writeFile(storedPath, JSON.stringify({ benchmark_version: '26.10.0', dataset_version: '26.10.0', answers }, null, 2) + '\n');
connection.closeSync(); instance.closeSync();
console.log(`Validated ${questions.length} authoritative SQL answers.`);
