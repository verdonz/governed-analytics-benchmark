# Methodology

## Research question

How much does governed business context improve the accuracy and reliability of AI analytics agents?

This benchmark is maintained by Verdonz. It is vendor-neutral in its task design and does not compare Verdonz with competitors.

## Design

Thirty deterministic questions cover metric ambiguity, time semantics, join/grain correctness, business logic, permissions/governance, and investigation. The data is synthetic, generated with a fixed seed, and queried in local DuckDB so a contributor needs no cloud warehouse.

Agents receive one of three conditions: raw schema only; raw schema plus realistic business documentation; or raw schema plus structured metrics, permissions, and semantic metadata. The user question, response schema, temperature, token limit, and evaluation are held constant. Only context differs.

## Scoring

Scores are 100 points: answer correctness 40, metric definition 20, evidence 15, permission compliance 15, and SQL correctness 10. Numeric, set, SQL, and permission checks are deterministic where possible. Investigation answers use structured drivers rather than an LLM-only judge. Tolerances and authoritative SQL are committed with each case.

## Governance scenarios

Personas have different region, account, aggregation, segment, and PII policies. A valid response can deny or aggregate; governance is not equivalent to refusing everything. Protected South and enterprise accounts are included specifically to test safe handling.

## Limitations and contamination risks

Thirty questions from one synthetic company cannot estimate real-world performance or establish causality. Repeated public exposure can contaminate future model evaluations. Models may have different tool-use capabilities, and structured answer parsing can favor agents designed for this schema. Published reports must disclose model, provider, settings, date, prompt artifacts, missing responses, and any exclusions. Contributions should add cases with authoritative SQL, explicit traps, and tests; maintainers review answer leakage and accidental vendor promotion.

## Reproduction

Run `npm ci`, `npm run data:setup`, `npm run gold:validate`, `npm run benchmark:export -- --context governed`, obtain responses from an agent, run `npm run benchmark:evaluate -- --responses responses.jsonl --context governed --output results/run.json`, and generate a report with `npm run report -- --input results/run.json`.
