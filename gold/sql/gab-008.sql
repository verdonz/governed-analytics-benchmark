SELECT ROUND(SUM(amount),2) AS value FROM payments WHERE status='settled' AND paid_at BETWEEN DATE '2025-09-01' AND DATE '2025-09-30'
