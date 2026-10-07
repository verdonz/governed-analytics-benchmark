import { setupDatabase } from '../src/database/setup.js';
console.log('Generating deterministic synthetic DuckDB dataset...');
const data = await setupDatabase();
console.log(`Dataset ready (seed ${data.seed}; ${Object.values(data.tables).reduce((n, rows) => n + rows.length, 0)} rows).`);
