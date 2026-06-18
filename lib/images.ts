/**
 * 一覧・サムネ帯向けの軽量 JPEG（`scripts/optimize_images.py` で生成）。
 * 詳細ヒーローは `src` の最適化済み原寸を使用。
 */
export function artworkThumbSrc(src: string): string {
  const slash = src.lastIndexOf("/");
  if (slash === -1) return src;

  const dir = src.slice(0, slash);
  const filename = src.slice(slash + 1);
  const dot = filename.lastIndexOf(".");
  const base = dot === -1 ? filename : filename.slice(0, dot);

  return `${dir}/thumbs/${base}.jpg`;
}
