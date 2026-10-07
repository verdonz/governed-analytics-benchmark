import { describe, expect, it } from 'vitest';
import { parseResponse } from '../src/evaluation/evaluator.js';
describe('response contract', () => {
  it('accepts structured responses', () => { expect(parseResponse(JSON.stringify({ answer: 2, metric: 'arr', evidence: ['sql'] }))).toMatchObject({ answer: 2, metric: 'arr' }); });
  it('rejects malformed permission decisions', () => { expect(() => parseResponse(JSON.stringify({ permissionDecision: 'maybe' }))).toThrow(); });
});
