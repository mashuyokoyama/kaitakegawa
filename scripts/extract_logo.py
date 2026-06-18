#!/usr/bin/env python3
"""
黒い文字だけを抽出し、背景を透明にする。
使用: python scripts/extract_logo.py <入力画像.png> [出力.png]
"""
from PIL import Image
import sys
import os

def auto_threshold(img: Image.Image) -> int:
    hist = img.convert("L").histogram()
    mode_val = hist.index(max(hist))
    return min(255, max(80, mode_val - 30))

def extract_logo(input_path: str, output_path: str, threshold=None) -> None:
    img = Image.open(input_path).convert("RGBA")
    if threshold is None:
        threshold = auto_threshold(img)
        print(f"Auto threshold: {threshold}")
    data = img.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        luminance = (r * 299 + g * 587 + b * 114) / 1000
        if luminance >= threshold:
            new_data.append((0, 0, 0, 0))
        else:
            alpha = int(255 * (1 - min(luminance, threshold) / threshold))
            alpha = max(0, min(255, alpha))
            if luminance < 60:
                alpha = 255
            new_data.append((0, 0, 0, alpha))
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    if len(sys.argv) < 2 or not os.path.exists(sys.argv[1]):
        print("Usage: python extract_logo.py <input.png> [output.png]")
        sys.exit(1)
    src, dst = sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None
    out = dst or src.replace(".png", "-logo.png")
    extract_logo(src, out)
