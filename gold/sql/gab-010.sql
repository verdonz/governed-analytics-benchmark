SELECT ROUND(SUM(p.annual_price),2) AS value FROM subscriptions s JOIN plans p ON p.plan_id=s.plan_id WHERE s.started_at BETWEEN DATE '2025-07-01' AND DATE '2025-09-30'
