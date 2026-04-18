from pathlib import Path
from pypdf import PdfReader
import re
import collections

path = Path('PERMANANCE VALIDEE_JAN_2026.pdf')
reader = PdfReader(str(path))
lines = []
for page in reader.pages:
    lines.extend((page.extract_text() or '').splitlines())

day_names = {'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'}

def is_name_token(token):
    return bool(re.fullmatch(r"[A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ'’-]+", token))

grades = collections.Counter()
for line in lines:
    stripped = line.strip()
    if not re.match(r'^\d+\s', stripped):
        continue
    parts = stripped.split()
    i = 0
    while i < len(parts) and parts[i].isdigit():
        i += 1
    if i < len(parts) and parts[i] in day_names:
        i += 1
    grade_tokens = []
    while i < len(parts) and not is_name_token(parts[i]):
        grade_tokens.append(parts[i])
        i += 1
    grade = ' '.join(grade_tokens) if grade_tokens else (parts[i] if i < len(parts) else '')
    if grade:
        grades[grade] += 1

for g, c in grades.most_common():
    print(f'{c:03d} {g}')
