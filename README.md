docker compose up --build
docker compose down -v
docker compose up --build
docker exec -i $container psql -U $env:POSTGRES_USER -d $env:POSTGRES_DB < backend/sql/01-init.sql
## Wordle Wannabe – Version 1 Run Guide

Monorepo: **Next.js 14 (frontend)** + **FastAPI (backend)** + **Postgres** via Docker.

### TL;DR Quick Start (Version 1)
```powershell
git clone https://github.com/<your-user>/Wordle_wannabe.git
cd Wordle_wannabe/wordle_wannabe
Copy-Item .env.example .env
docker compose up --build
# Frontend: http://localhost:3000
# Backend health: http://localhost:8000/health
# Random word:    http://localhost:8000/api/random_word?length=5
```

If the random word endpoint returns 404, the seed may not have run (see Reset DB below).

### Services
| Layer | Tech | Path | Notes |
|-------|------|------|-------|
| Frontend | Next.js 14 + TS | `frontend/` | Fetches backend API |
| Backend | FastAPI + SQLAlchemy | `backend/` | Provides `/health`, `/api/random_word`, `/api/check_word` |
| Database | Postgres 16 | Docker service | Seeded with word list into `"WordList"` |

### Environment Variables
Copy `.env.example` to `.env`. Key values:
| Var | Purpose | Default |
|-----|---------|---------|
| `NEXT_PUBLIC_API_BASE` | Frontend API base | `http://localhost:8000` |
| `DATABASE_URL` | Backend DB URL | `postgresql://wordle:wordle@postgres:5432/wordle_wannabe_db` |
| `POSTGRES_USER/PASSWORD/DB` | DB bootstrap | `wordle` / `wordle` / `wordle_wannabe_db` |

### Core Endpoint
| Method | Path | Query | Description |
|--------|------|-------|-------------|
| GET | `/api/random_word` | `length` (int) | Random word of given length |

Example:
```powershell
curl "http://localhost:8000/api/random_word?length=5"
```
Sample response:
```json
{ "id": "<uuid>", "word": "apple", "length": 5 }
```

### Health Check
```powershell
curl http://localhost:8000/health
```

### Reset DB (Re-run seed)
```powershell
docker compose down -v
docker compose up --build
```

### Manual Inspect DB
```powershell
$pg = (docker ps --filter "name=postgres" --format "{{.ID}}")
docker exec -it $pg psql -U wordle -d wordle_wannabe_db -c "SELECT length, COUNT(*) FROM \"WordList\" GROUP BY length;"
```

### Run Frontend Only (Dev mode)
```powershell
cd frontend
npm install
$env:NEXT_PUBLIC_API_BASE="http://localhost:8000"
npm run dev
```

### Run Backend Only (Local Python)
```powershell
cd backend
python -m venv .venv
./.venv/Scripts/Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Requires Postgres running (Docker or local) + proper `DATABASE_URL`.

### Troubleshooting
| Symptom | Cause | Fix |
|---------|-------|-----|
| 404 random word | Empty table / wrong length | Reset DB or check length param |
| ECONNREFUSED frontend fetch | Backend not ready / wrong port | Check logs; confirm `NEXT_PUBLIC_API_BASE` |
| 404 during first run | Seed race (backend queried before seed) | Wait a few seconds & retry |
| No color updates in game | Game logic not refreshing | Reload page (server component re-fetch) |

### Common Maintenance
Rebuild after dependency change:
```powershell
docker compose build backend
docker compose up -d
```
Stop stack:
```powershell
docker compose down
```

### Roadmap (Short List)
1. Replace in-memory preload with per-request DB queries.
2. Add `/api/check_word` validation endpoint (currently implicit logic in frontend or legacy code).
3. Add tests (pytest + React Testing Library).
4. Add guess evaluation API and stats tracking.

