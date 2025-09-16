from fastapi import APIRouter, HTTPException
from ..db import get_connection
import random

router = APIRouter()

@router.get('/word')
async def get_word():
    conn = await get_connection()
    try:
        rows = await conn.fetch('SELECT word FROM "Word"')
        if not rows:
            raise HTTPException(status_code=500, detail='No words available')
        chosen = random.choice(rows)['word'].upper()
        return { 'word': chosen }
    finally:
        await conn.close()

@router.get('/checkword/{word}')
async def check_word(word: str):
    conn = await get_connection()
    try:
        row = await conn.fetchrow('SELECT word FROM "Word" WHERE word = $1', word.lower())
        return { 'valid': row is not None }
    finally:
        await conn.close()
