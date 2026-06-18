/**
 * 作品データ — 元: ~/Desktop/paintings（ファイル名・フォルダからタイトル・年・媒体を反映）
 * 画像は public/paintings に配置。.heic は Web 用に JPG へ変換済み。
 */
export type PaintingItem = {
  slug: string;
  title: string;
  year: number;
  image: string;
  /** タイトル直下の媒体行（年の後に続く文言） */
  medium: string;
  description?: string;
  priceNote?: string;
  detailImages?: readonly string[];
};

/**
 * 配列順は一覧（PC・All）の表示順と一致（行・ペア・寄せは `gallery-layout.ts`）。
 */
export const PAINTINGS: readonly PaintingItem[] = [
  {
    slug: "rat-1",
    title: "Rat 1",
    year: 2021,
    image: "/paintings/rat-1.png",
    medium: "mixed media",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "rat-2",
    title: "Rat 2",
    year: 2021,
    image: "/paintings/rat-2.png",
    medium: "mixed media",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "bouquet",
    title: "Bouquet",
    year: 2026,
    image: "/paintings/bouquet.jpg",
    medium: "acrylic, oil, charcoal, 1165mm × 905mm",
    priceNote: "Price : Ask (contact)",
    detailImages: [
      "/paintings/bouquet_detail1.jpg",
      "/paintings/bouquet_detail2.jpg",
      "/paintings/bouquet_detail3.jpg",
    ],
  },
  {
    slug: "untitled-2026",
    title: "Untitled",
    year: 2026,
    image: "/paintings/untitled-2026.jpg",
    medium: "acrylic, oil, charcoal, 3495mm × 2715mm",
    priceNote: "Price : Ask (contact)",
    detailImages: [
      "/paintings/untitled-2026_detail1.jpg",
      "/paintings/untitled-2026_detail2.jpg",
      "/paintings/untitled-2026_detail3.jpg",
      "/paintings/untitled-2026_detail4.jpg",
    ],
  },
  {
    slug: "map-of-a-week-2024",
    title: "Map of a week",
    year: 2024,
    image: "/paintings/map-of-a-week-2024.jpg",
    medium: "water, ink, 210mm × 150mm",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "playground-2018",
    title: "Playground",
    year: 2018,
    image: "/paintings/playground-2018.jpg",
    medium: "mixed media",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "behavioral-change-2021",
    title: "Behavioral Change",
    year: 2021,
    image: "/paintings/behavioral-change-2021.jpg",
    medium: "acrylic, oil, charcoal, 910mm × 727mm",
    priceNote: "Price : SOLD",
  },
  {
    slug: "playground-2019",
    title: "Playground",
    year: 2019,
    image: "/paintings/playground-2019.jpg",
    medium: "mixed media",
    priceNote: "Price : SOLD",
  },
  {
    slug: "visualized-consciousness-2022",
    title: "Visualized consciousness",
    year: 2022,
    image: "/paintings/visualized-consciousness-2022.jpg",
    medium: "acrylic, charcoal, ink, 910mm × 720mm",
    priceNote: "Price : SOLD",
  },
  {
    slug: "on-the-couch-2020",
    title: "On the couch",
    year: 2020,
    image: "/paintings/on-the-couch-2020.jpg",
    medium: "acrylic, charcoal, pen, 910mm × 727mm",
    priceNote: "Price : SOLD",
  },
  {
    slug: "untitled-2020",
    title: "Untitled",
    year: 2020,
    image: "/paintings/untitled-2020.jpg",
    medium: "acrylic, charcoal, pen, 720mm × 530mm",
    priceNote: "Price : SOLD",
  },
  {
    slug: "jikan-no-danmen-2025",
    title: "A Slice of Time",
    year: 2025,
    image: "/paintings/jikan-no-danmen-2025.jpg",
    medium: "acrylic, oil and ink, 1167 × 803mm",
    priceNote: "Price : SOLD",
  },
  {
    slug: "two-eyes-things-2020",
    title: "Two eyes things",
    year: 2020,
    image: "/paintings/two-eyes-things-2020.jpg",
    medium: "acrylic",
    priceNote: "Price : SOLD",
  },
  {
    slug: "hidden-feeling-2020",
    title: "Hidden feeling",
    year: 2020,
    image: "/paintings/hidden-feeling-2020.jpg",
    medium: "acrylic, pen, 600mm × 400mm",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "self-portrait-2020",
    title: "Self portrait",
    year: 2020,
    image: "/paintings/self-portrait-2020.jpg",
    medium: "acrylic, oil, 1030 × 728mm",
    priceNote: "Price : SOLD",
  },
  {
    slug: "untitled-2022",
    title: "Untitled",
    year: 2022,
    image: "/paintings/untitled-2022.jpg",
    medium: "acrylic, oil, charcoal, 803mm × 65mm",
    priceNote: "Price : SOLD",
  },
  {
    slug: "playground-2018-2",
    title: "Playground II",
    year: 2018,
    image: "/paintings/playground-2018-2.jpg",
    medium: "mixed media",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "form-of-boredom",
    title: "Form of boredom",
    year: 2023,
    image: "/paintings/form-of-boredom.jpg",
    medium: "acrylic, oil, pen, charcoal, 1030mm × 730mm",
    priceNote: "Price : Ask (contact)",
    detailImages: [
      "/paintings/form-of-boredom_detail1.jpg",
      "/paintings/form-of-boredom_detail2.jpg",
      "/paintings/form-of-boredom_detail3.jpg",
      "/paintings/form-of-boredom_detail4.jpg",
      "/paintings/form-of-boredom_detail5.jpg",
      "/paintings/form-of-boredom_detail6.jpg",
      "/paintings/form-of-boredom_detail7.jpg",
    ],
  },
  {
    slug: "seed-2021",
    title: "Seed",
    year: 2021,
    image: "/paintings/seed-2021.jpg",
    medium: "pen, ink (size unknown)",
    priceNote: "Price : Ask (contact)",
  },
];
