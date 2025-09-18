def validate_word(word, wordlist):

    words = [w['words'].lower() for w in wordlist]

    if word in words:
        return {"valid": True}
    else:
        return {"valid": False}