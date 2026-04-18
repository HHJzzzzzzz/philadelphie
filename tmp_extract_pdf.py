from pathlib import Path
from pypdf import PdfReader
path = Path("PERMANANCE VALIDEE_JAN_2026.pdf")
reader = PdfReader(path)
for i, page in enumerate(reader.pages, start=1):
    print(f"--- Page {i} ---")
    print(page.extract_text() or "")
