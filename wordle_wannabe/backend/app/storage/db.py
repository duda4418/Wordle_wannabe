import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.storage.db_models import Base
from app.storage.utils import get_users, get_wordlist

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://wordle:wordle@localhost:5432/wordle_wannabe_db")

engine = create_engine(DATABASE_URL, echo=True, future=True)

with engine.connect() as connection:
    Session = sessionmaker(bind=engine)
    session = Session()

    Base.metadata.create_all(engine)

class Database:
    def __init__(self):
        self.db = {
            "users":self.get_users(),
            "wordlist":self.get_wordlist()
        }

    @staticmethod
    def get_users():
       return get_users(session=session)

    @staticmethod
    def create_user():
        pass

    @staticmethod
    def get_wordlist():
        return get_wordlist(session=session)

db = Database()
