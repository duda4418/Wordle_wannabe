from pydantic import BaseModel

class CheckWord(BaseModel):
    valid: bool
