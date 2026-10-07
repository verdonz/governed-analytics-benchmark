# Contributing benchmark cases

Add a stable ID, one answerable question, one authoritative SQL query, expected metric/time/grain/dimensions, permission requirements, evidence expectations, tolerance, and documented failure modes. Add a test when the case introduces a new trap. Never use real data or manually guessed gold numbers; run gold validation against the generated database.
