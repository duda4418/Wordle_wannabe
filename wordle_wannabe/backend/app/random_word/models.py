from pydantic import BaseModel

class RandomWord(BaseModel):
    id: str
    word: str
    length: int
