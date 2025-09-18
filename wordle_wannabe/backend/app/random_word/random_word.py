from http.client import HTTPException

from fastapi import APIRouter
from app.random_word.models import RandomWord
from app.random_word.utils import get_random_word
from app.storage.db import db
from app.storage.db import get_wordlist

random_word_router = APIRouter()

@random_word_router.get("/api/random_word", response_model=RandomWord)
async def get_random_words(length: str):
    wordlist = db.get_wordlist().values()
    filtered_words = [word for word in wordlist if word["length"] == length]

    if not filtered_words:
        raise HTTPException(status_code=404, detail="Length not found")

    return get_random_word(filtered_words)

