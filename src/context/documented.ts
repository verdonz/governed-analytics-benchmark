import { readFile } from 'node:fs/promises';
import { rawSchemaContext } from './raw-schema.js';
export async function documentedContext() { return `${await rawSchemaContext()}\n\nBUSINESS DOCUMENTATION\n${await readFile('benchmark/business-documentation.md', 'utf8')}`; }
