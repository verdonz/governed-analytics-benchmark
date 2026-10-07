import { describe, expect, it } from 'vitest';
import { rawSchemaContext } from '../src/context/raw-schema.js';
import { documentedContext } from '../src/context/documented.js';
import { governedContext } from '../src/context/governed.js';
describe('context isolation', () => {
  it('does not leak governed definitions into raw mode', async () => { const raw = await rawSchemaContext(); expect(raw).not.toContain('net_revenue'); expect(raw).not.toContain('metric-definitions'); });
  it('makes documented and governed contexts meaningfully different', async () => { expect(await documentedContext()).toContain('Analytics handbook'); expect(await governedContext()).toContain('net_revenue'); });
});
