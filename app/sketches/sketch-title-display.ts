/**
 * スケッチの表示用タイトル — JPG / PNG / HEIC 等のデータ形式表記を除く（内部の slug ・ data の title は据え置き）。
 */
const TRAILING_FORMAT = new RegExp(
  `[,，]\\s*(${[
    "JPG",
    "JPEG",
    "PNG",
    "HEIC",
    "HEIF",
    "WEBP",
    "TIFF",
    "GIF",
    "BMP",
 ].join("|")})\\s*$`,
  "iu"
);

const PAREN_FORMAT = /\(\s*(JPG|JPEG|PNG|HEIC|HEIF)\s*\)\s*$/iu;

export function sketchTitleForDisplay(raw: string): string {
  let s = raw.trim();
  for (let i = 0; i < 4; i++) {
    const next = s.replace(TRAILING_FORMAT, "").replace(PAREN_FORMAT, "").trim();
    if (next === s) break;
    s = next;
  }
  s = s.replace(/[,，]\s*$/u, "").trim();
  return s;
}
