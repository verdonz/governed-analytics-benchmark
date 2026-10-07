SELECT segment, COUNT(*) AS value FROM accounts WHERE segment <> 'enterprise' GROUP BY segment ORDER BY segment
