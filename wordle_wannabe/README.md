## Wordle Wannabe – Monorepo (Frontend + Python Backend + Postgres)

This repository now contains:

| Layer     | Tech                | Path        | Notes |
|-----------|---------------------|-------------|-------|
| Frontend  | Next.js 14 + TS     | `frontend/` | Game UI, fetches backend API |
| Backend   | FastAPI (Python)    | `backend/`  | Provides `/word`, `/checkword`, `/health` |
| Database  | Postgres (Docker)   | container   | Stores word list in table `"Word"` |

Docker Compose orchestrates Postgres, backend, and frontend containers.

---
## Quick Start (All in Docker)

1. Copy environment file:
```bash
cp .env.example .env
```
2. Start services:
```bash
docker compose up --build
```
3. Open the app:
```
Frontend: http://localhost:3000
Backend Health: http://localhost:4000/health
Random Word: http://localhost:4000/word
Check Word:  http://localhost:4000/checkword/APPLE
```

If the frontend shows only the fallback word (APPLE), ensure the database has rows in the `"Word"` table.

---
## Environment Variables

`.env.example` contains defaults:

| Variable | Used By | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_BASE` | Frontend | Base URL for backend API (default `http://localhost:4000`) |
| `POSTGRES_USER` | Postgres | DB user |
| `POSTGRES_PASSWORD` | Postgres | DB password |
| `POSTGRES_DB` | Postgres | Database name |
| `DATABASE_URL` | Backend | Postgres connection string |

Frontend reads `NEXT_PUBLIC_API_BASE` at build/runtime.

---
## Backend Endpoints

| Method | Path | Response |
|--------|------|----------|
| GET | `/health` | `{ "status": "ok" }` |
| GET | `/word` | `{ "word": "APPLE" }` (random word uppercased) |
| GET | `/checkword/{word}` | `{ "valid": true|false }` |

Errors return JSON with appropriate status codes (e.g. 500 if no words exist).

---
## Adding Words

Currently the backend queries table `"Word"` with columns:
```sql
word   TEXT PRIMARY KEY
length INT
```
You can insert manually:
```sql
INSERT INTO "Word" (word, length) VALUES ('apple', 5);
```
Using psql in the running Postgres container:
```bash
docker exec -it $(docker ps -qf name=postgres) psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
```

---
## Development (Separate – Optional)

Frontend only (without Docker):
```bash
cd frontend
npm install
npm run dev
```
Backend only (without Docker):
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 4000
```
Ensure Postgres is running (via Docker or locally) and `DATABASE_URL` matches.

---
## Cleanup / Next Steps
1. Delete legacy root `src/` + old config files if no longer needed.
2. Add seeding script (Python) to populate words automatically.
3. Add tests (pytest for backend; Playwright or Jest/RTL for frontend).
4. Add CORS middleware if you deploy frontend separately.

Example CORS (if needed):
```python
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:3000"],
	allow_methods=["*"],
	allow_headers=["*"],
)
```

---
## Troubleshooting
| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Frontend 404 on `/word` | Backend not running / wrong port | Check `docker compose logs backend` |
| Always shows APPLE | Empty DB table | Insert rows into `"Word"` |
| `asyncpg` import error | Missing dependency | Rebuild backend image |
| Connection refused | Postgres not ready | Restart backend after DB up |

---
## License
Add a license file if you intend to open source.

---
_Generated restructuring documentation._

---
## Updated Architecture (Port 8000 + WordList)

Backend now runs on port `8000` and exposes a new endpoint:
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/random_word?length=5` | Returns a random word of the requested length |

The legacy `/word` and `/checkword` endpoints are deprecated. Frontend should use `NEXT_PUBLIC_API_BASE=http://localhost:8000` and request `/api/random_word?length=5`.

### Quick Run (Fresh Setup)
```powershell
Copy-Item .env.example .env
docker compose up --build
# Open: http://localhost:3000 (frontend)
# Test backend health & random word:
curl http://localhost:8000/health
curl "http://localhost:8000/api/random_word?length=5"
```

### Resetting the Database Volume
If you change SQL init scripts or need to re-run seed logic:
```powershell
docker compose down -v
docker compose up --build
```
This removes the Postgres volume so `/docker-entrypoint-initdb.d/*.sql` re-executes.

### Manual Seeding (Fallback)
If automatic seeding was skipped you can exec into the DB container and run SQL manually:
```powershell
$container = (docker ps --filter "name=postgres" --format "{{.ID}}")
docker exec -it $container psql -U $env:POSTGRES_USER -d $env:POSTGRES_DB -c "SELECT count(*) FROM \"WordList\";"
```
Or run a file:
```powershell
docker exec -i $container psql -U $env:POSTGRES_USER -d $env:POSTGRES_DB < backend/sql/01-init.sql
```

### Environment Variables (Updated)
| Variable | Default | Notes |
|----------|---------|-------|
| `NEXT_PUBLIC_API_BASE` | `http://localhost:8000` | Frontend base for API |
| `DATABASE_URL` | `postgresql://wordle:wordle@postgres:5432/wordle_wannabe_db` | In compose network |

### Verifying Random Word Endpoint
Expected JSON shape:
```json
{ "id": "<uuid>", "word": "apple", "length": 5 }
```
If you get 404: no words of that length exist (check seeding). If you get connection errors: ensure backend logs show successful DB connection.

### Troubleshooting Addendum
| Symptom | Cause | Action |
|---------|-------|--------|
| 404 on /api/random_word | Query param length mismatch or empty table | Confirm length int, check row count in "WordList" |
| `No words found for length` | Filter returned empty list | Verify seed inserted words of that length |
| ECONNREFUSED fetch in frontend | Wrong `NEXT_PUBLIC_API_BASE` | Update `.env.local` or `.env` to port 8000 |

---
## Roadmap (Next)
1. Replace in-memory load with per-request SQLAlchemy session queries.
2. Add pagination / length distribution stats endpoint.
3. Add tests for `/api/random_word` (length filtering & 404 case).
4. Add user guess submission endpoint with evaluation logic.

