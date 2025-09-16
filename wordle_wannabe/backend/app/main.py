from fastapi import FastAPI, HTTPException
import asyncpg, random, os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://wordle:wordle@localhost:5432/wordledb")

app = FastAPI()

@app.get('/health')
async def health():
    return { 'status': 'ok' }

async def get_conn():
    return await asyncpg.connect(DATABASE_URL)

@app.get('/word')
async def get_word():
    conn = await get_conn()
    try:
        rows = await conn.fetch('SELECT word FROM "Word"')
        if not rows:
            raise HTTPException(status_code=500, detail='No words available')
        chosen = random.choice(rows)['word'].upper()
        return { 'word': chosen }
    finally:
        await conn.close()

@app.get('/checkword/{word}')
async def check_word(word: str):
    conn = await get_conn()
    try:
        row = await conn.fetchrow('SELECT word FROM "Word" WHERE word = $1', word.lower())
        return { 'valid': row is not None }
    finally:
        await conn.close()
