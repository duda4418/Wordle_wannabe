import uuid
from sqlalchemy import UUID, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'User'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False, default=uuid.uuid4)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)

    @staticmethod
    def serialize_users(users):
        serialized_users = {}
        for user in users:
            serialized_users[str(user.id)] = {
                "id": str(user.id),
                "name": str(user.name),
                "password": str(user.password)
            }
        return serialized_users

class WordList(Base):
    __tablename__ = 'WordList'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False, default=uuid.uuid4)
    words = Column(String, nullable=False)
    length = Column(Integer, nullable=False)

    @staticmethod
    def serialize_wordlist(wordlist):
        serialized_wordlist = {}
        for word in wordlist:
            serialized_wordlist[str(word.id)] = {
                "id": str(word.id),
                "words": str(word.words),
                "length": int(word.length)
            }
        return serialized_wordlist
