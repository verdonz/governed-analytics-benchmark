import { describe, expect, it } from 'vitest';
import { numericScore, listScore, totalScore } from '../src/evaluation/scoring.js';
describe('scoring', () => {
  it('scores numeric tolerance', () => { expect(numericScore(10.00001, 10, 0.001)).toBe(1); expect(numericScore(11, 10)).toBe(0); });
  it('scores lists with precision and recall', () => { expect(listScore(['a', 'b'], ['a', 'b'])).toBe(1); expect(listScore(['a'], ['a', 'b'])).toBe(0.75); });
  it('uses the published weights', () => { expect(totalScore({ answer: 1, metric: 1, evidence: 1, governance: 1, sql: 1 })).toBe(100); });
});
