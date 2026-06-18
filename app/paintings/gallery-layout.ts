/**
 * Paintings 一覧（PC・filter=All）の行レイアウト。
 * PC モック: 縦長（画像 h>w）は 2 列、横長（w>h）は 1 枚行で左/右寄せ。
 * 並びはモックの視覚説明に合わせ、`public/paintings` の実ピクセル比で縦/横を振り分け直した。
 *
 * `paintingsGallerySlugOrder()` の並びは `data.ts` の `PAINTINGS` と一致させること。
 */
export type PaintingsGallerySoloAlign = "left" | "right" | "center";

/**
 * - bouquet-under-pair: 白帯幅の約 2/3・左寄せ
 * - wide-full-band: 極横など大きい作品 — 白帯いっぱい（width 100%）
 */
export type PaintingsGallerySoloWidth = "bouquet-under-pair" | "wide-full-band";

export type PaintingsGalleryRow =
  | { kind: "pair"; slugs: readonly [string, string] }
  | {
      kind: "solo";
      slug: string;
      align: PaintingsGallerySoloAlign;
      soloWidth?: PaintingsGallerySoloWidth;
    };

export const PAINTINGS_GALLERY_ROWS: readonly PaintingsGalleryRow[] = [
  /* 1 縦2列 */
  { kind: "pair", slugs: ["rat-1", "rat-2"] },
  /* 2–6 横: Bouquet → Untitled 2026（全幅）→ Map ほか */
  {
    kind: "solo",
    slug: "bouquet",
    align: "left",
    soloWidth: "bouquet-under-pair",
  },
  {
    kind: "solo",
    slug: "untitled-2026",
    align: "left",
    soloWidth: "wide-full-band",
  },
  { kind: "solo", slug: "map-of-a-week-2024", align: "left" },
  { kind: "solo", slug: "playground-2018", align: "right" },
  { kind: "solo", slug: "behavioral-change-2021", align: "left" },
  /* 6–7 縦2列×2 */
  { kind: "pair", slugs: ["playground-2019", "visualized-consciousness-2022"] },
  { kind: "pair", slugs: ["on-the-couch-2020", "untitled-2020"] },
  /* 8–9 横: 左・右 */
  { kind: "solo", slug: "jikan-no-danmen-2025", align: "left" },
  { kind: "solo", slug: "two-eyes-things-2020", align: "right" },
  /* 11 縦2列 */
  { kind: "pair", slugs: ["hidden-feeling-2020", "self-portrait-2020"] },
  /* 12–15 横: 左・右・左・右 */
  { kind: "solo", slug: "untitled-2022", align: "left" },
  { kind: "solo", slug: "playground-2018-2", align: "right" },
  { kind: "solo", slug: "form-of-boredom", align: "left" },
  { kind: "solo", slug: "seed-2021", align: "right" },
];

/** 上からの読み順（左→右でペアを平坦化） */
export function paintingsGallerySlugOrder(): readonly string[] {
  const out: string[] = [];
  for (const row of PAINTINGS_GALLERY_ROWS) {
    if (row.kind === "pair") {
      out.push(row.slugs[0], row.slugs[1]);
    } else {
      out.push(row.slug);
    }
  }
  return out;
}
