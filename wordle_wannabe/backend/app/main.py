import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.check_word.check_word import check_word_router
from app.random_word.random_word import random_word_router

app = FastAPI()

# CORS: allow everything (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(random_word_router)
app.include_router(check_word_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)