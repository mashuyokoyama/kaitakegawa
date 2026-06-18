/**
 * Digital 作品 — 画像は `public/digital-compositions`。
 * 表示順: 年の新しい順、同年はタイトル（数字・記号を含むアルファベット順に近い順）。
 */
export type DigitalItem = {
  slug: string;
  title: string;
  image: string;
  year?: number;
  medium?: string;
  description?: string;
  priceNote?: string;
  detailImages?: readonly string[];
};

export const DIGITAL_ITEMS: readonly DigitalItem[] = [
  {
    slug: "september-2026",
    title: "September",
    year: 2026,
    image: "/digital-compositions/september-2026.jpg",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "wrong-door-2026",
    title: "Wrong Door",
    year: 2026,
    image: "/digital-compositions/wrong-door-2026.jpg",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "five-hours-2025",
    title: "5 hours",
    year: 2025,
    image: "/digital-compositions/five-hours-2025.png",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "bye-2025",
    title: "Bye",
    year: 2025,
    image: "/digital-compositions/bye-2025.png",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "confident-man-2025",
    title: "Confident man",
    year: 2025,
    image: "/digital-compositions/confident-man-2025.png",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "cold-light-landscape-2024",
    title: "Cold light landscape",
    year: 2024,
    image: "/digital-compositions/cold-light-landscape-2024.png",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "dig-2024",
    title: "Dig",
    year: 2024,
    image: "/digital-compositions/dig-2024.jpg",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "kapital-2024",
    title: "Kapital",
    year: 2024,
    image: "/digital-compositions/kapital-2024.jpg",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "my-fried-ufo-rooftop-2024",
    title: "My fried called a UFO on my rooftop",
    year: 2024,
    image: "/digital-compositions/my-fried-ufo-rooftop-2024.jpg",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "on-my-way-home-2024",
    title: "On my way home",
    year: 2024,
    image: "/digital-compositions/on-my-way-home-2024.jpg",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "persoality-2024",
    title: "Persoality",
    year: 2024,
    image: "/digital-compositions/persoality-2024.jpg",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "safely-back-2024",
    title: "Safely back",
    year: 2024,
    image: "/digital-compositions/safely-back-2024.png",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "cave-2021",
    title: "Cave",
    year: 2021,
    image: "/digital-compositions/cave-2021.jpg",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "deja-vu-2021",
    title: "Deja vu",
    year: 2021,
    image: "/digital-compositions/deja-vu-2021.jpg",
    medium: "digital composition",
    description: "Border series",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "fall-a-sleep-2021",
    title: "Fall a sleep",
    year: 2021,
    image: "/digital-compositions/fall-a-sleep-2021.jpg",
    medium: "digital composition",
    description: "Border series",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "log-off-2021",
    title: "log off",
    year: 2021,
    image: "/digital-compositions/log-off-2021.jpg",
    medium: "digital composition",
    description: "Border series",
    priceNote: "Price : Ask (contact)",
  },
  {
    slug: "a-girl-2020",
    title: "A girl",
    year: 2020,
    image: "/digital-compositions/a-girl-2020.png",
    medium: "digital composition",
    priceNote: "Price : Ask (contact)",
  },
];
