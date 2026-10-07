# Governed Analytics Agent Benchmark

A reproducible benchmark for testing whether AI agents can answer business questions correctly when metric definitions, semantic context, permissions, and evidence matter.

Maintained by [Verdonz](https://www.verdonz.com).

## Why this exists

The research question is: **How much does governed business context improve the accuracy and reliability of AI analytics agents?** This is a vendor-neutral research asset, not a Verdonz-versus-competitors benchmark.

## What it measures

Thirty questions test metric ambiguity, time semantics, join/grain correctness, business logic, permissions/governance, and investigation/root-cause reasoning. The data is synthetic, deterministic, local, and intentionally designed with realistic traps.

## Three context modes

- `raw`: schema and discoverable relationships only.
- `documented`: raw schema plus less-structured business documentation.
- `governed`: raw schema plus structured metric definitions, permissions, and semantic metadata.

The user question, response schema, model settings, and evaluator remain constant across modes.

## Quick start

```bash
npm ci
npm run data:setup
npm run gold:validate
```

## Running the benchmark

Export prompts for any agent:

```bash
npm run benchmark:export -- --context governed
```

The JSONL runner is offline and provider-neutral. Each response should contain `questionId`, `answer`, `metric`, optional `sql`, `evidence`, a concise `reasoningSummary`, and `permissionDecision`. Evaluate an imported file:

```bash
npm run benchmark:evaluate -- --responses responses.jsonl --context governed --output results/run.json
npm run report -- --input results/run.json
```

No paid API call is made automatically. A trusted local command runner can be added around the same JSONL contract. OpenAI and Anthropic adapters are intentionally not invented here; provider SDK integrations should be contributed only after their installed/current interfaces are verified.

## Dataset

The generated DuckDB includes approximately 2,000 customers, 5,000 users, 3,000 subscriptions, 20,000 orders, 50,000 order items, 15,000 invoices, and 100,000+ events, with 18+ months of dates. See [docs/DATASET.md](docs/DATASET.md).

## Evaluating results

The 100-point score weights answer correctness 40, metric correctness 20, evidence 15, governance 15, and SQL 10. See [docs/SCORING.md](docs/SCORING.md).

## Reproducing published results

Retain the exported prompts, model/provider/settings, imported responses, benchmark version, dataset version, and generated report. This repository will never claim scores that were not run.

## Adding a model or benchmark case

Use the JSONL contract for a model/agent integration. For cases, provide authoritative SQL and run `npm run gold:validate`; see [docs/CONTRIBUTING_BENCHMARK_CASES.md](docs/CONTRIBUTING_BENCHMARK_CASES.md).

## Results

`results/latest.*` is generated only from an actual run and is gitignored. The checked-in fixture is explicitly **EXAMPLE DATA — NOT BENCHMARK RESULTS**. There are no headline results in this initial release.

## Limitations

This is a small synthetic benchmark, useful for repeatable comparisons but not a substitute for production evaluation. Public cases can eventually contaminate training or prompting. See [docs/METHODOLOGY.md](docs/METHODOLOGY.md).

## Citation

```bibtex
@software{verdonz_governed_analytics_benchmark,
  title = {Governed Analytics Agent Benchmark},
  author = {{Verdonz}},
  year = {2026},
  version = {26.10.0},
  url = {https://github.com/verdonz/governed-analytics-benchmark}
}
```

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and [LICENSE](LICENSE). Code and synthetic data are MIT licensed.

## Maintained by Verdonz

The benchmark is maintained by Verdonz and intended to be useful independently of Verdonz.
