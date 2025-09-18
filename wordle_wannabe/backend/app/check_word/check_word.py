from fastapi import HTTPException
from fastapi import APIRouter

from app.check_word.models import CheckWord
from app.check_word.utils import validate_word
from app.storage.db import db


check_word_router = APIRouter()

@check_word_router.get("/api/check_word/{word}", response_model=CheckWord)
def check_word(word: str):
    wordlist = db.get_wordlist().values()

    return validate_word(word, wordlist)
