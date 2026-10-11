"""Gera os derivados de imagem a partir dos arquivos de marca em assets/.

Executar com: python3 -I scripts/make-images.py
Requer Pillow. Os arquivos gerados são versionados; só rode de novo se a marca mudar.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
A = ROOT / "assets"
icon = Image.open(A / "vipdesk-icon.png").convert("RGBA")
logo = Image.open(A / "vipdesk-logo.png").convert("RGBA")


def fit(img, h):
    w = round(img.width * h / img.height)
    return img.resize((w, h), Image.LANCZOS)


# Ícone do cabeçalho: exibido com 34px de altura -> 2x para telas de alta densidade.
hdr = fit(icon, 68)
hdr.save(A / "vipdesk-icon-68.png", optimize=True)
hdr.save(A / "vipdesk-icon-68.webp", quality=90, method=6)
print("header", hdr.size)


def square(size, pad_ratio, bg):
    canvas = Image.new("RGBA", (size, size), bg)
    inner = round(size * (1 - 2 * pad_ratio))
    ic = icon.copy()
    ic.thumbnail((inner, inner), Image.LANCZOS)
    canvas.alpha_composite(ic, ((size - ic.width) // 2, (size - ic.height) // 2))
    return canvas


square(32, 0.02, (0, 0, 0, 0)).save(A / "favicon-32.png", optimize=True)
square(180, 0.12, (255, 255, 255, 255)).convert("RGB").save(A / "apple-touch-icon.png", optimize=True)
square(48, 0.02, (0, 0, 0, 0)).save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

# Imagem de compartilhamento social (Open Graph) 1200x630.
W, H = 1200, 630
og = Image.new("RGB", (W, H))
stops = [(0.0, (0x4A, 0x24, 0x59)), (0.45, (0x5C, 0x2D, 0x6F)), (1.0, (0x7E, 0x3E, 0x97))]
px = og.load()
for x in range(W):
    for y in range(H):
        t = (x / W) * 0.75 + (y / H) * 0.25
        for (t0, c0), (t1, c1) in zip(stops, stops[1:]):
            if t0 <= t <= t1:
                k = (t - t0) / (t1 - t0)
                px[x, y] = tuple(round(a + (b - a) * k) for a, b in zip(c0, c1))
                break
og = og.convert("RGBA")
d = ImageDraw.Draw(og)
# Base branca atrás do símbolo, que é roxo e sumiria sobre o fundo roxo.
d.rounded_rectangle((90, 100, 302, 262), radius=28, fill="white")
og.alpha_composite(fit(icon, 118), (108, 122))
wordmark = fit(logo, 150)
wordmark = wordmark.crop((round(wordmark.width * 0.255), 0, wordmark.width, wordmark.height))
og.alpha_composite(wordmark, (318, 106))
bold = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 50)
reg = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 30)
d.text((96, 340), "Atendimento omnichannel,", font=bold, fill="white")
d.text((96, 402), "CRM e IA em uma só plataforma", font=bold, fill="white")
d.text((96, 500), "vipdesk.com.br  ·  Uma solução Vipphone Software", font=reg, fill=(255, 255, 255, 215))
d.rectangle((96, 470, 186, 476), fill=(0, 0xA9, 0xB7))
og.convert("RGB").save(A / "og-vipdesk.png", optimize=True)
print("og", og.size)
