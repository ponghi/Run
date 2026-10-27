"""Export the same prototype as a self-contained HTML and a ZIP for static hosting."""
from pathlib import Path
import zipfile
root = Path(__file__).resolve().parent.parent
output = Path('/workspace/shared/downloads')
output.mkdir(parents=True, exist_ok=True)
html = (root / 'index.html').read_text()
model = (root / 'model.js').read_text()
standalone = html.replace('<script src="model.js"></script>', '<script>\n' + model + '\n</script>')
(output / 'RUN-Alpha.html').write_text(standalone)
with zipfile.ZipFile(output / 'RUN-Alpha.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    archive.write(root / 'index.html', 'index.html')
    archive.write(root / 'model.js', 'model.js')
    for name in ['partner.html', 'partner.js', 'partner-model.js']:
        archive.write(root / name, name)
    for name in ['PILOTA-ROMA.md', 'LANCIO-PARTNER.md']:
        archive.write(root / 'docs' / name, 'docs/' + name)
partner = (root / 'partner.html').read_text().replace('<script src="partner-model.js" defer></script><script src="partner.js" defer></script>', '')
partner = partner.replace('</body>', '<script>' + (root / 'partner-model.js').read_text() + '</script><script>' + (root / 'partner.js').read_text() + '</script></body>')
(output / 'RUN-Partner.html').write_text(partner)
for name in ['PILOTA-ROMA.md', 'LANCIO-PARTNER.md', 'scenari.csv']:
    (output / name).write_bytes((root / 'docs' / name).read_bytes())
print('Esportati HTML autonomo, ZIP, piano pilota e scenari CSV.')
