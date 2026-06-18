#!/usr/bin/env python3
"""Resize artwork assets and generate gallery thumbnails."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

IMAGE_DIRS = (
    "paintings",
    "sketches",
    "digital-compositions",
    "others",
    "fragments",
)

MAIN_MAX_EDGE = 2000
MAIN_JPEG_QUALITY = 85
MAIN_PNG_COMPRESS = 6
THUMB_WIDTH = 480
THUMB_JPEG_QUALITY = 80
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}


def flatten_for_thumb(img: Image.Image) -> Image.Image:
    if img.mode in ("RGBA", "LA") or (
        img.mode == "P" and "transparency" in img.info
    ):
        background = Image.new("RGB", img.size, (255, 255, 255))
        rgba = img.convert("RGBA")
        background.paste(rgba, mask=rgba.split()[-1])
        return background
    if img.mode != "RGB":
        return img.convert("RGB")
    return img


def resize_to_max_edge(img: Image.Image, max_edge: int) -> Image.Image:
    width, height = img.size
    longest = max(width, height)
    if longest <= max_edge:
        return img
    if width >= height:
        new_width = max_edge
        new_height = round(height * (max_edge / width))
    else:
        new_height = max_edge
        new_width = round(width * (max_edge / height))
    return img.resize((new_width, new_height), Image.Resampling.LANCZOS)


def resize_to_width(img: Image.Image, width: int) -> Image.Image:
    img_width, img_height = img.size
    if img_width <= width:
        return img
    new_height = round(img_height * (width / img_width))
    return img.resize((width, new_height), Image.Resampling.LANCZOS)


def save_main(path: Path, img: Image.Image) -> None:
    suffix = path.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        rgb = flatten_for_thumb(img)
        img.save(
            path,
            format="JPEG",
            quality=MAIN_JPEG_QUALITY,
            optimize=True,
            progressive=True,
        )
        return

    if suffix == ".png":
        img.save(path, format="PNG", optimize=True, compress_level=MAIN_PNG_COMPRESS)
        return

    if suffix == ".webp":
        img.save(path, format="WEBP", quality=MAIN_JPEG_QUALITY, method=6)


def save_thumb(path: Path, img: Image.Image) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    thumb = flatten_for_thumb(img)
    thumb.save(
        path,
        format="JPEG",
        quality=THUMB_JPEG_QUALITY,
        optimize=True,
        progressive=True,
    )


def optimize_file(path: Path, thumb_dir: Path) -> tuple[int, int]:
    before = path.stat().st_size

    with Image.open(path) as opened:
        img = ImageOps.exif_transpose(opened)
        main = resize_to_max_edge(img, MAIN_MAX_EDGE)
        thumb = resize_to_width(main, THUMB_WIDTH)

    save_main(path, main)
    save_thumb(thumb_dir / f"{path.stem}.jpg", thumb)

    after = path.stat().st_size
    return before, after


def main() -> int:
    total_before = 0
    total_after = 0
    count = 0

    for folder in IMAGE_DIRS:
        root = PUBLIC / folder
        if not root.is_dir():
            continue

        thumb_dir = root / "thumbs"
        thumb_dir.mkdir(exist_ok=True)

        for path in sorted(root.iterdir()):
            if not path.is_file():
                continue
            if path.suffix.lower() not in IMAGE_SUFFIXES:
                continue

            before, after = optimize_file(path, thumb_dir)
            total_before += before
            total_after += after
            count += 1
            print(
                f"optimized {path.relative_to(ROOT)} "
                f"({before // 1024}KB -> {after // 1024}KB)"
            )

    print(
        f"\nDone: {count} files, "
        f"{total_before / (1024 * 1024):.1f}MB -> {total_after / (1024 * 1024):.1f}MB"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
