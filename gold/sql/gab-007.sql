SELECT ROUND(SUM(il.amount),2) AS value FROM invoice_lines il JOIN invoices i ON i.invoice_id=il.invoice_id WHERE i.status='posted' AND i.invoice_date BETWEEN DATE '2025-09-01' AND DATE '2025-09-30'
