import { readFile } from 'node:fs/promises';
export async function rawSchemaContext() { return `RAW SCHEMA ONLY\n${await readFile('data/schema.sql', 'utf8')}`; }
