import type { PaintingItem } from "./data";

/**
 * サイドメニュー: 「All」＋年代のみ（コレクション分類は未使用）
 * 行ごとに 8px ギャップが入るよう複数行に分割
 */
export const PAINTINGS_FILTER_GROUPS: string[][] = [
  ["All", "2026", "2025", "2024", "2023"],
  ["2022", "2021", "2020"],
  ["2019", "2018"],
];

const ALL_FILTER_LABELS = new Set(PAINTINGS_FILTER_GROUPS.flat());

export function isValidPaintingsFilterLabel(label: string): boolean {
  return ALL_FILTER_LABELS.has(label);
}

export function filterPaintings(
  items: readonly PaintingItem[],
  activeLabel: string
): PaintingItem[] {
  if (activeLabel === "All") return [...items];
  if (/^\d{4}$/.test(activeLabel)) {
    const y = Number(activeLabel);
    return items.filter((p) => p.year === y);
  }
  return [];
}

export function paintingsFilterHref(label: string): string {
  return label === "All"
    ? "/paintings"
    : `/paintings?filter=${encodeURIComponent(label)}`;
}
