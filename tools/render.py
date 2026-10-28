"""Rebuild faithful page assets: python render.py path/to/source.pdf"""
import sys,json,hashlib
from pathlib import Path
import pypdfium2 as pdfium
from pypdf import PdfReader
from PIL import Image,ImageOps,ImageDraw
root=Path(__file__).resolve().parents[1]
src=Path(sys.argv[1]); reader=PdfReader(src); doc=pdfium.PdfDocument(src)
assets=root/'assets'; assets.mkdir(exist_ok=True)
pages=[]; samples=[]
for i,p in enumerate(reader.pages):
    page=doc[i]; w,h=page.get_size()
    im=page.render(scale=2400/w).to_pil().convert('RGB')
    im.save(assets/f'{i+1:03}.webp',quality=90,method=6)
    thumb=im.copy(); thumb.thumbnail((200,230)); thumb.save(assets/f't{i+1:03}.webp',quality=70)
    pages.append({'page':i+1,'width':w,'height':h,'rotation':p.get('/Rotate',0),'text':(p.extract_text() or '')[:2000]})
    if i<15: samples.append(im.copy())
    print(i+1,flush=True)
data={'count':len(pages),'sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'pages':pages,'pairs':[[1]]+[[i,i+1] for i in range(2,len(pages),2)]}
(root/'audit.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
sheet=Image.new('RGB',(1200,900),'#ddd'); draw=ImageDraw.Draw(sheet)
for i,im in enumerate(samples):
    im.thumbnail((220,260)); x=(i%5)*240; y=(i//5)*300; sheet.paste(im,(x,y)); draw.text((x,y+265),str(i+1),fill='black')
preview=root/'tools'/'contact.jpg'
sheet.save(preview)

