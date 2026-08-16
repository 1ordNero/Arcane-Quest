from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np

SRC = Path('assets/icons/game')
DST = Path('assets/icons/game-v2')
CANVAS = 512
MARGIN = 18  # ~3.5% per side: artwork reaches almost to the edge.
# UI choices, arena stances, arena challengers, city locations and common resources
# now live in assets/icons/ui and must not be regenerated from the retired game set.
FILES = [
'dungeon_portal.webp','combat_crossed_swords.webp','sealed_niche.webp','shadow_beast.webp','grave_knight.webp','arcane_shrine.webp','archive_scroll.webp','crypt_weaver.webp','dungeon_boss.webp','quest_raid.webp','quest_event.webp','quest_bounty.webp','skull_danger.webp','city_trainer.webp','class_warrior.webp','class_mage.webp','class_ranger.webp','class_dark.webp','resource_essence.webp'
]

def border_pixels(rgb):
    h, w, _ = rgb.shape
    band = max(2, min(h, w) // 24)
    return np.concatenate([
        rgb[:band].reshape(-1, 3), rgb[-band:].reshape(-1, 3),
        rgb[:, :band].reshape(-1, 3), rgb[:, -band:].reshape(-1, 3)
    ], axis=0)

def remove_baked_background(im):
    rgba = np.array(im.convert('RGBA')).astype(np.float32)
    rgb = rgba[..., :3]
    alpha = rgba[..., 3] / 255.0
    if np.percentile(alpha, 10) < 0.98:
        a = np.clip((alpha - 0.015) / 0.985, 0, 1)
    else:
        border = border_pixels(rgb)
        bg = np.median(border, axis=0)
        corners = np.array([rgb[0,0], rgb[0,-1], rgb[-1,0], rgb[-1,-1], bg], dtype=np.float32)
        d = np.min(np.sqrt(((rgb[...,None,:] - corners[None,None,:,:]) ** 2).sum(axis=3)), axis=2)
        low, high = 20.0, 72.0
        a = np.clip((d - low) / (high - low), 0, 1)
        bgmask = (d < 55).astype(np.uint8) * 255
        mask_img = Image.fromarray(bgmask, 'L').filter(ImageFilter.GaussianBlur(radius=1.2))
        bgsoft = np.asarray(mask_img).astype(np.float32) / 255.0
        a *= (1.0 - 0.82 * bgsoft)
        a = np.clip((a - 0.06) / 0.94, 0, 1)
    out = rgba.copy()
    out[..., 3] = a * 255.0
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), 'RGBA')

def fit_full(im):
    a = np.asarray(im.getchannel('A'))
    ys, xs = np.where(a > 18)
    if len(xs) == 0:
        return im.resize((CANVAS, CANVAS), Image.Resampling.LANCZOS)
    left, right, top, bottom = xs.min(), xs.max()+1, ys.min(), ys.max()+1
    crop = im.crop((left, top, right, bottom))
    max_side = CANVAS - 2 * MARGIN
    scale = min(max_side / crop.width, max_side / crop.height)
    size = (max(1, round(crop.width * scale)), max(1, round(crop.height * scale)))
    crop = crop.resize(size, Image.Resampling.LANCZOS)
    canvas = Image.new('RGBA', (CANVAS, CANVAS), (0,0,0,0))
    x = (CANVAS - size[0]) // 2
    y = (CANVAS - size[1]) // 2
    canvas.alpha_composite(crop, (x, y))
    return canvas

def main():
    DST.mkdir(parents=True, exist_ok=True)
    for name in FILES:
        src = SRC / name
        if not src.exists():
            print('missing', src)
            continue
        im = Image.open(src).convert('RGBA')
        im = remove_baked_background(im)
        im = fit_full(im)
        out = DST / name
        im.save(out, 'WEBP', lossless=True, quality=100, method=6, exact=True)
        print(out)

if __name__ == '__main__':
    main()
