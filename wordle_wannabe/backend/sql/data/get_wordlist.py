# Invoke-WebRequest https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt -OutFile words_alpha.txt

import json, uuid, os, sys
from pathlib import Path

DATA_DIR = Path(__file__).parent
SOURCE_FILE = DATA_DIR / "words_alpha.txt"
JSON_OUTPUT = DATA_DIR / "wordlist.json"

def load_and_filter_words(path: Path) -> list:
    seen = set()
    filtered = []
    with open(path, "r", encoding="utf-8") as f:
        for raw in f:
            w = raw.strip().lower()
            if len(w) != 5:
                continue
            if not w.isalpha():
                continue
            if w in seen:
                continue
            seen.add(w)
            filtered.append(w)
    return filtered

def write_source_words(path: Path, words: list):
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(words) + ("\n" if words else ""))

def write_json(path: Path, words: list):
    records = [{
        "id": str(uuid.uuid4()),
        "word": w,
        "length": len(w)
    } for w in words]
    with open(path, "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=2)


if not SOURCE_FILE.exists():
    print(f"Source file not found: {SOURCE_FILE}", file=sys.stderr)
    sys.exit(1)
words = load_and_filter_words(SOURCE_FILE)
write_source_words(SOURCE_FILE, words)
write_json(JSON_OUTPUT, words)
print(f"Filtered {len(words)} words. Saved to {SOURCE_FILE.name} and {JSON_OUTPUT.name}.")


