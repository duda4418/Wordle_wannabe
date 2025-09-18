from fastapi import APIRouter, HTTPException, Query
from app.random_word.models import RandomWord
from app.random_word.utils import get_random_word
from app.storage.db import db

random_word_router = APIRouter()

@random_word_router.get("/api/random_word", response_model=RandomWord,)
async def get_random_words(length: int = Query(5, ge=1, le=64, description="Desired word length")):
    wordlist = db.get_wordlist().values()
    filtered_words = [word for word in wordlist if int(word.get("length")) == length]

    if not filtered_words:
        raise HTTPException(status_code=404, detail=f"No words found for length {length}")

    return get_random_word(filtered_words)

