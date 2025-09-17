from app.storage.db_models import User, WordList

def get_users(session):
    users = session.query(User).all()
    return User.serialize_users(users)

def get_wordlist(session):
    wordlist = session.query(WordList).all()
    return WordList.serialize_wordlist(wordlist)
