import { readFile } from 'node:fs/promises';
import { rawSchemaContext } from './raw-schema.js';
export async function governedContext() { return `${await rawSchemaContext()}\n\nGOVERNED METRICS\n${await readFile('benchmark/metric-definitions.yaml', 'utf8')}\n\nPERMISSIONS\n${await readFile('benchmark/permissions.yaml', 'utf8')}`; }
