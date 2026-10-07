SELECT COUNT(DISTINCT account_id) AS value FROM subscriptions WHERE canceled_at BETWEEN DATE '2025-07-01' AND DATE '2025-09-30' AND (reactivated_at IS NULL OR reactivated_at > canceled_at)
