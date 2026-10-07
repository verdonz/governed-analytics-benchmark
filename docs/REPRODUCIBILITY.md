# Reproducibility

Use Node 20+, `npm ci`, then `npm run data:setup` and `npm run gold:validate`. Data generation is seeded, context construction is source-visible, and prompts record benchmark version, dataset version, context mode, provider, model settings, and question IDs. Real runs must retain the exported prompts and imported responses. API calls are never made automatically.
