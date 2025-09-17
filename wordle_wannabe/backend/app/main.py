import uvicorn
from fastapi import FastAPI

from app.random_word.random_word import random_word_router

app = FastAPI()
app.include_router(random_word_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)