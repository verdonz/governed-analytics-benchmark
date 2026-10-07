import { describe, expect, it } from 'vitest';
import { questions } from '../benchmark/questions.js';
describe('benchmark cases', () => {
  it('has exactly 30 stable questions in six balanced categories', () => { expect(questions).toHaveLength(30); expect(new Set(questions.map((q) => q.id))).toHaveLength(30); for (const c of ['metric-definition', 'time-semantics', 'join-grain', 'business-logic', 'permissions', 'investigation']) expect(questions.filter((q) => q.category === c)).toHaveLength(5); });
});
