-- Idempotent initialization script for Wordle Wannabe database
-- Auto-executed by Postgres only on first container startup (empty PGDATA) when mounted at /docker-entrypoint-initdb.d
-- Manual run: psql -h localhost -U wordle -d wordle_wannabe_db -f backend/sql/01-init.sql

-- Enable extension for gen_random_uuid() (pgcrypto) if available (postgres user required)
DO $$
BEGIN
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
EXCEPTION WHEN insufficient_privilege THEN
    RAISE NOTICE 'Skipping pgcrypto extension (insufficient privilege)';
END$$;

BEGIN;

-- Application users table (matches SQLAlchemy model User)
CREATE TABLE IF NOT EXISTS "User" (
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name      TEXT NOT NULL,
    password  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_user_name ON "User" (name);

-- WordList table (matches SQLAlchemy model WordList)
CREATE TABLE IF NOT EXISTS "WordList" (
    id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    words  TEXT NOT NULL,
    length INT  NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_wordlist_length ON "WordList" (length);

COMMIT;

-- Verification queries (for manual use):
-- \dt
-- \d "User"
-- \d "WordList"