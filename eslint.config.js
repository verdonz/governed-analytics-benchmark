import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
export default [{ ignores: ['dist/**', 'node_modules/**', 'data/benchmark.duckdb'] }, { files: ['**/*.ts'], languageOptions: { parser }, plugins: { '@typescript-eslint': tseslint }, rules: { 'no-console': 'off', '@typescript-eslint/no-explicit-any': 'off' } }];
