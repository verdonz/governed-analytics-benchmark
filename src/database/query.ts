import { DuckDBConnection, DuckDBInstance } from '@duckdb/node-api';
export type Connection = DuckDBConnection;
export async function openDatabase(path = 'data/benchmark.duckdb') { const instance = await DuckDBInstance.create(path); const connection = await instance.connect(); return { instance, connection }; }
export async function run(connection: Connection, sql: string) { await connection.run(sql); }
export async function queryRows(connection: Connection, sql: string): Promise<Record<string, unknown>[]> { const result = await connection.runAndReadAll(sql); return result.getRowObjectsJson() as Record<string, unknown>[]; }
