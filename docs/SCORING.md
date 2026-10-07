# Scoring

The 100-point score is deterministic: final-answer correctness 40, metric/business-definition correctness 20, evidence 15, governance 15, and executable SQL 10. Numeric values use the question tolerance. Lists use a precision/recall mean. Governance uses hard pass/fail behavior for deny or aggregate decisions. Narrative questions are evaluated through structured driver overlap in the review workflow; this v1 harness keeps the core score deterministic and does not use an LLM as the sole judge.
