from app.storage.db_models import User, WordList


def get_users(session):
    users = session.query(User).all()
    return users.serialize_users(users)

def get_wordlist(session):
    wordlist = session.query(WordList).all()
    return wordlist.serialize_wordlist(wordlist)