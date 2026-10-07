import { readFile, writeFile } from 'node:fs/promises';
import { questions } from '../benchmark/questions.js';
import { rawSchemaContext } from '../src/context/raw-schema.js';
import { documentedContext } from '../src/context/documented.js';
import { governedContext } from '../src/context/governed.js';
import { ContextMode, PromptRecord } from '../src/runners/types.js';
import { evaluateResponse, parseResponse } from '../src/evaluation/evaluator.js';
import { openDatabase } from '../src/database/query.js';
const mode = (process.argv.find((x) => x === 'raw' || x === 'documented' || x === 'governed') ?? 'governed') as ContextMode;
const value = (flag: string) => { const i = process.argv.indexOf(flag); return i >= 0 ? process.argv[i + 1] : undefined; };
const context = mode === 'raw' ? await rawSchemaContext() : mode === 'documented' ? await documentedContext() : await governedContext();
const schema = '{ answer, metric, sql, evidence, reasoningSummary, permissionDecision }';
if (process.argv[2] === 'export') {
  const prompts: PromptRecord[] = questions.map((q) => ({ benchmarkVersion: '26.10.0', datasetVersion: '26.10.0', questionId: q.id, question: q.question, contextMode: mode, context, responseSchema: schema, modelSettings: { temperature: 0, maxTokens: 1200 } }));
  await writeFile(`prompts-${mode}.jsonl`, prompts.map((p) => JSON.stringify(p)).join('\n') + '\n'); console.log(`Exported ${prompts.length} prompts to prompts-${mode}.jsonl`);
} else if (process.argv[2] === 'evaluate') {
  const input = value('--responses'); if (!input) throw new Error('--responses is required');
  const { instance, connection } = await openDatabase(); const lines = (await readFile(input, 'utf8')).split('\n').filter(Boolean); const byId = new Map(lines.map((line) => { const parsed = JSON.parse(line); return [parsed.questionId, parseResponse(JSON.stringify(parsed.response ?? parsed))]; }));
  const results = []; for (const q of questions) results.push(await evaluateResponse(connection, q, byId.get(q.id) ?? {}));
  const output = value('--output') ?? 'results/run.json'; await writeFile(output, JSON.stringify({ benchmark_version: '26.10.0', dataset_version: '26.10.0', context_mode: mode, provider: 'imported-jsonl', model: 'unknown', timestamp: new Date().toISOString(), results }, null, 2) + '\n'); connection.closeSync(); instance.closeSync(); console.log(`Evaluated ${results.length} responses to ${output}`);
}
