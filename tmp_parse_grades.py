from pathlib import Path
from pypdf import PdfReader
import re
path = Path('PERMANANCE VALIDEE_JAN_2026.pdf')
reader = PdfReader(str(path))
lines = []
for page in reader.pages:
    text = page.extract_text() or ''
    lines.extend(text.splitlines())

groups = []
current = []
for line in lines:
    stripped = line.strip()
    if re.match(r'^\d+\s', stripped):
        if current:
            groups.append(' '.join(current))
        current = [stripped]
    else:
        if current:
            current.append(stripped)
        else:
            current = [stripped]
if current:
    groups.append(' '.join(current))

def is_name_token(token):
    # Names are usually all uppercase letters, possibly with accents or apostrophes or hyphens,
    # but not punctuation like periods used in grade abbreviations.
    return bool(re.fullmatch(r"[A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ'’-]+", token))

day_names = {'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'}
grades = set()
for group in groups:
    if group.startswith('JOUR DE GARDE'):
        continue
    parts = group.split()
    if len(parts) < 4:
        continue
    i = 0
    while i < len(parts) and parts[i].isdigit():
        i += 1
    if i < len(parts) and parts[i] in day_names:
        i += 1
        grade_tokens = []
        while i < len(parts) and not is_name_token(parts[i]):
            grade_tokens.append(parts[i])
            i += 1
        if grade_tokens:
            grades.add(' '.join(grade_tokens))
    elif i < len(parts):
        grades.add(parts[i])

for g in sorted(grades):
    print(g)
print('TOTAL', len(grades))
