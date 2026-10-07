# The Governed Analytics Agent Benchmark

## How reliably can AI agents answer business questions when metrics, permissions, and business definitions matter?

## Executive summary

This open benchmark measures analytics-agent reliability across three context conditions. Results are intentionally blank until a real run is imported.

## Why this benchmark exists

Business questions are often underspecified. Correct answers depend on definitions, time semantics, joins, permissions, and evidence—not only SQL syntax.

## Methodology

See [docs/METHODOLOGY.md](../docs/METHODOLOGY.md). The benchmark uses deterministic synthetic data in DuckDB and 30 reviewed cases.

## Dataset

Accounts, users, subscriptions, orders, invoice recognition, payments, refunds, funnel events, ownership history, and support tickets; no real customer data.

## Three context conditions

Raw schema; raw schema plus business documentation; governed semantic context with structured metrics and policies.

## Benchmark categories

Metric definition ambiguity, time semantics, join/grain correctness, business logic, permissions/governance, and investigation/root-cause reasoning.

## Results

_Results will be populated from a real benchmark run. EXAMPLE DATA — NOT BENCHMARK RESULTS._

## Failure examples

The repository records common traps such as refund timing, invoice fan-out, account versus user grain, and protected-region access.

## Governance results

Reports will separately show safe denials, correct aggregation, and permission violations.

## Reproduce the benchmark

Clone the repository, install dependencies, generate the database, export prompts, import responses, and run the evaluator locally. No cloud warehouse is required.

## Download the data

The synthetic generator, schema, cases, gold SQL, and generated answers are available in the repository under the MIT license.

## Limitations

This is a small synthetic benchmark, not a claim about all analytics agents or production data.

## Citation

See `CITATION.cff` and the README.

## About the benchmark

Maintained by Verdonz as a vendor-neutral research asset.

## About Verdonz

Verdonz builds governed AI agents for your business. Learn more at https://www.verdonz.com.
