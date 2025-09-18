import random

from nltk.corpus.reader import wordlist


def get_random_word(filtered_words):

    selected_word = random.choice(filtered_words)
    return {
        "id": selected_word["id"],
        "word": selected_word["words"],
        "length": selected_word["length"]
    }
