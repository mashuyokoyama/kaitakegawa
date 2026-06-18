/** 一覧ページ（グリッド）で使う現在地 */
export type ArtworkIndexNavId = "paintings" | "sketches" | "digital";

/** ヘッダーナビの全項目（TOP・studio 共通） */
export type ArtworkStudioNavId =
  | ArtworkIndexNavId
  | "fragments"
  | "others"
  | "shop";

export const ARTWORK_INDEX_NAV_ITEMS: readonly {
  label: string;
  href: string;
  id: ArtworkStudioNavId;
}[] = [
  { label: "paintings", href: "/paintings", id: "paintings" },
  { label: "sketches", href: "/sketches", id: "sketches" },
  { label: "digital", href: "/digital-compositions", id: "digital" },
  { label: "fragments", href: "/fragments", id: "fragments" },
  { label: "others", href: "/others", id: "others" },
  { label: "shop", href: "/shop", id: "shop" },
] as const;
