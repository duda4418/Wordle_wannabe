from fastapi import APIRouter, HTTPException, Query
from app.random_word.models import RandomWord
from app.random_word.utils import get_random_word
from app.storage.db import db

random_word_router = APIRouter()

@random_word_router.get(
    "/api/random_word",
    response_model=RandomWord,
    summary="Get a random word of specified length",
    tags=["random_word"],
)
async def get_random_words(length: int = Query(5, ge=1, le=64, description="Desired word length")):
    """Return a random word of the given length.

    Query Parameter:
        length (int): Length of word requested (default 5).
    """
    wordlist = db.get_wordlist().values()
    filtered_words = [word for word in wordlist if word.get("length") == length]

    if not filtered_words:
        raise HTTPException(status_code=404, detail=f"No words found for length {length}")

    return get_random_word(filtered_words)

