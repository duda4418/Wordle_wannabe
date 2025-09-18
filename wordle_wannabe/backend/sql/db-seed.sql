-- Seed script for WordList table from JSON array in wordlist.json
-- Executed automatically only on first database initialization (empty volume)
-- Requires that 01-init.sql already created the tables and (optionally) pgcrypto.
-- Path inside container: /docker-entrypoint-initdb.d/db-seed.sql
-- JSON file expected at: /docker-entrypoint-initdb.d/data/wordlist.json
-- IMPORTANT: Ensure the file exists BEFORE starting the postgres container the first time.


-- Skip seeding if table already populated
DO $$
DECLARE existing_count bigint;
BEGIN
	PERFORM 1 FROM information_schema.tables WHERE table_name = 'WordList';
	IF NOT FOUND THEN
		RAISE NOTICE 'Table "WordList" does not exist yet (unexpected)';
		RETURN;
	END IF;
	SELECT COUNT(*) INTO existing_count FROM "WordList";
	IF existing_count > 0 THEN
		RAISE NOTICE 'WordList already has % rows - skipping seed', existing_count;
		RETURN;
	END IF;
END$$;

-- Load the JSON file into a temp staging table line-by-line
CREATE TEMP TABLE seed_json(line text);
COPY seed_json FROM '/docker-entrypoint-initdb.d/data/wordlist.json';

-- Reassemble the JSON (pretty printed) and insert rows
WITH json_raw AS (
	SELECT string_agg(line, E'\n') AS doc FROM seed_json
), ins AS (
	INSERT INTO "WordList"(id, words, length)
	SELECT (elem->>'id')::uuid AS id,
				 elem->>'word'       AS words,
				 (elem->>'length')::int AS length
	FROM json_raw, LATERAL jsonb_array_elements(json_raw.doc::jsonb) elem
	ON CONFLICT (id) DO NOTHING
	RETURNING 1
)
SELECT COUNT(*) AS inserted_rows FROM ins;


