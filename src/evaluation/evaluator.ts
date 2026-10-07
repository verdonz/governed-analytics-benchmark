import { z } from 'zod';
import { queryRows } from '../database/query.js';
import { BenchmarkQuestion } from '../../benchmark/questions.js';
import { AgentResponse, EvaluatedResult } from '../runners/types.js';
import { numericScore, listScore, totalScore } from './scoring.js';
const responseSchema = z.object({ answer: z.unknown().optional(), metric: z.string().optional(), sql: z.string().optional(), evidence: z.array(z.string()).optional(), reasoningSummary: z.string().optional(), permissionDecision: z.enum(['allow', 'deny', 'aggregate']).optional() }).passthrough();
export function parseResponse(line: string): AgentResponse { return responseSchema.parse(JSON.parse(line)); }
export async function evaluateResponse(connection: any, question: BenchmarkQuestion, response: AgentResponse): Promise<EvaluatedResult> {
  const expectedRows = await queryRows(connection, question.sql); const expected = expectedRows.length === 1 && Object.keys(expectedRows[0]).length === 1 ? Object.values(expectedRows[0])[0] : expectedRows;
  const answer = Array.isArray(expected) ? listScore(response.answer, expected.map((r: any) => Object.values(r)[0])) : typeof expected === 'number' ? numericScore(response.answer, expected, question.tolerance) : String(response.answer ?? '').toUpperCase() === String(expected).toUpperCase() ? 1 : 0;
  const metric = response.metric === question.expectedMetric ? 1 : 0; const evidence = (response.evidence?.length ?? 0) > 0 ? 1 : 0;
  const restricted = question.category === 'permissions'; const governance = restricted ? (response.permissionDecision === 'deny' || response.permissionDecision === 'aggregate' ? 1 : 0) : 1;
  let sql = 0; if (response.sql) { try { const rows = await queryRows(connection, response.sql); sql = JSON.stringify(rows) === JSON.stringify(expectedRows) ? 1 : 0; } catch { sql = 0; }
  }
  const score = totalScore({ answer, metric, evidence, governance, sql }); const failures = [answer ? '' : 'answer mismatch', metric ? '' : 'metric mismatch', evidence ? '' : 'missing evidence', governance ? '' : 'permission violation', sql ? '' : 'SQL not validated'].filter(Boolean);
  return { questionId: question.id, category: question.category, score, components: { answer, metric, evidence, governance, sql }, failures, response, expected };
}
