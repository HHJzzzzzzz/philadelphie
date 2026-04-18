from pathlib import Path
from pypdf import PdfReader
import re
path = Path('PERMANANCE VALIDEE_JAN_2026.pdf')
reader = PdfReader(str(path))
lines = []
for page in reader.pages:
    text = page.extract_text() or ''
    lines.extend(text.splitlines())

# group lines starting with a digit
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

for i, g in enumerate(groups[:30], 1):
    print(f'GROUP {i}: {g}')
    print('---')
