# Analytics handbook (internal draft)

This is intentionally written like ordinary internal documentation rather than a semantic API. The finance team generally talks about revenue when it means posted invoice lines after refunds, and the date on the revenue report is the date revenue is recognized. Cash is different: use payments and their settled date. Billing reports use invoice date.

An account is the commercial customer. A customer record is a contact and an account may have multiple contacts and subscriptions. Do not count users as customers. One account can cancel and later reactivate. ARR is recurring subscription value only; one-time orders are not ARR. The customer-success churn list excludes accounts that later reactivate.

Marketing conversion excludes bots and internal traffic. For geographic reporting, use the account billing region, not the region inferred from an event IP. Sales ownership is effective-dated, so use the owner valid on the relevant invoice date.

Some people can see only aggregates. Enterprise accounts and the Protected South region are sensitive. Do not disclose PII. A regional manager may receive a permitted aggregate but not rows. General employees should receive a short explanation when a request is outside their access.

The examples in this document are guidance, not an exhaustive metric catalogue. When a definition is material, the governed metric layer is authoritative.
