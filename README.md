This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Design docs

- **TOP ページ SP（≤767px）**: [`docs/TOP_PAGE_SP.md`](docs/TOP_PAGE_SP.md) — モック準拠の余白・画像幅・文字サイズ。実装は `app/globals.css` の `.top-page` メディアクエリ。
- **PC 版（一覧＋ studio 周り）— FIX**: [`docs/PC_LAYOUT_BASELINE.md`](docs/PC_LAYOUT_BASELINE.md) — ビューポート **≥768px** のレイアウト・主要トークンを確定。変更は文書／コミットに意図を残す。
- **作品個別ページ**（レイアウト・モック準拠・CSS トークン）: [`docs/ARTWORK_DETAIL_SPEC.md`](docs/ARTWORK_DETAIL_SPEC.md) — **確定 baseline**でメイン正方形と詳細列の**寸法・配置**を固定。**背景は `transparent`（非表示）**、モック色は仕様書参照。`app/globals.css` の `.painting-detail`。

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
