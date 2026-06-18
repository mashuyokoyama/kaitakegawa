# 作品個別ページ（Artwork Detail）— デザインルール

モック／フォーマットに合わせ、**一覧（index）とは別ルール**のセクションです。新規カテゴリや作品を増やすときはここと `globals.css` / `artwork-index-layout.css` の **`--detail-*` / `--painting-detail-*`** を参照してください。

**PC 版の一覧・ studio 全体の FIX 範囲**は [`PC_LAYOUT_BASELINE.md`](PC_LAYOUT_BASELINE.md) を参照（本書は個別ページ本文にフォーカス）。

## 確定 baseline（いったん固定）

**現状の見た目・数値を基準として固定**する。変更する場合は**意図と差分**をコミットメッセージまたは下表の更新で残すこと。

**メイン正方形ガイドと詳細サムネ列の寸法・配置はセットで確定**（片方だけ勝手にレイアウト変更しない）。**背景色は実装では非表示（`transparent`）**。モックの薄グレー／水色は下表「モック参照」列を参照して `--painting-detail-*-bg` で復元可能。CSS は `app/globals.css` の **`.painting-detail`** トークンに集約。

### A. メイン正方形ガイド — 固定

| 項目 | 既定 | トークン / クラス |
|------|------|-------------------|
| 正方形の一辺（PC） | **640px** | `--painting-detail-hero-slot-width` |
| SP（≤640px） | 列幅 **100%** の正方形 | 同上変数を `100%` に上書き |
| 枠の背景（実装） | **`transparent`（非表示）** | `--painting-detail-hero-slot-bg`（レイアウトは維持） |
| 枠の背景（モック参照） | `#e6e6e6` | デザイン確認時に上記変数へ設定可 |
| 画像の収め方 | **`object-fit: contain`**・**`top center`** | `.painting-detail__hero-img` |
| テキストまでの距離 | **40px** | `--painting-detail-text-gap` |
| 水平位置 | **白パネル内で列単体中央** | `.painting-detail__row` `justify-content: center`（詳細列の幅は中央計算に含めない） |
| 大画像はみ出し防止 | **必須** | `.painting-detail__column` / `__hero` / `img` の **`min-width: 0`** 等 |

### B. 詳細サムネ列 — 固定

| 項目 | 既定 | トークン / クラス |
|------|------|-------------------|
| 背景色（実装） | **`transparent`（非表示）** | `--painting-detail-detail-strip-bg` |
| 背景色（モック参照） | `#c8e8f5` | デザイン確認時に上記変数へ設定可 |
| 列幅（PC 通常） | **160px** | `--painting-detail-detail-strip-width` |
| 列幅（768–1023px） | **120px** | メディアクエリで上記変数を上書き |
| メイン列との隙間（PC 通常） | **32px**（狭い PC は **24px**） | `--painting-detail-detail-strip-gap` |
| 配置（PC） | **列（`.painting-detail__column`）の右外**・**`top:0` `bottom:0`**（高さ＝**ヒーロー＋テキスト**・上辺＝列上端＝ヒーロー上辺） | `.painting-detail__detail-strip` `position: absolute` |
| 内側のサムネ間・余白（PC） | **gap 8px**・**左右下 8px**・**上 0** | `--painting-detail-detail-strip-inner-gap` / `--painting-detail-detail-strip-inner-padding`（上は常に 0） |
| 縦／横スクロール | **なし**（`overflow: hidden`・はみ出しは切り捨て） | `.painting-detail__detail-strip-inner` |
| サムネ形 | **正方形**・`object-fit: cover` | `.painting-detail__detail-thumb` |
| 表示条件 | **`detailImages` があり、サムネが 2 枚以上**（メイン＋詳細） | `ArtworkDetailBody` |
| SP（≤767px） | **ヒーロー→テキスト→帯**（列を grid・`:has(strip)` で 3 段）・横スクロールなし・サムネ **96px** | `--painting-detail-detail-thumb-size-sp` 等 |

### C. パネル・TOP（一覧との関係）— 固定

| 項目 | 既定 | 実装メモ |
|------|------|----------|
| TOP bar 高さ（PC） | **96px** | 一覧と同じ。個別は `.paintings-studio--detail .header` で明示 |
| 白パネル上端（PC） | **`calc(96px + 40px)`** | `gallery-shell` の `top`・`main-content` の `padding-top`＝一覧同期 |
| 白パネル上端（SP） | **`calc(96px + 24px)`** | 個別の `main-content` のみ一覧同期 |
| 白パネル内先頭 | **余白なし** | `--detail-root-pad-top: 0`（グレー正方形がパネル先頭） |
| コンテンツ最大幅（PC） | **1040px** | `--detail-content-max-pc`（グレー中央＋右列収容） |

## 対象ルート

- `/paintings/[slug]`
- `/sketches/[slug]`
- `/digital-compositions/[slug]`

実装は **`ArtworkStudioLayout` + `pageMode="detail"`** と、共通 **`ArtworkDetailBody`**（`components/artwork-index/ArtworkDetailBody.tsx`）を使う。

## レイアウト（モック対応）

| ルール | 実装の要点 |
|--------|------------|
| **ヘッダー・左フィルター** | 背景は白（`paintings-studio--detail`）。一覧のような「サイドバー用 180px カラム」**なし**。フィルター文字列は **左下に常駐**（`z-index: 160`、専用ボックスなし）。 |
| **メイン白パネル** | 左右 **`--studio-gutter`（28px）** のみ。一覧の `180px + 96px` オフセットは**使わない**。 |
| **TOP bar・白パネル位置（一覧と一致）** | **TOP bar の高さは一覧と同じ 96px**（PC で `.paintings-studio--detail .header` に明示）。**白パネル・メイン上余白**も一覧と同じ: PC は **`top` / `padding-top: calc(96px + 40px)`**、SP は **`main-content` `padding-top: calc(96px + 24px)`**。`.paintings-studio__detail-root` の **`--detail-root-pad-top: 0`** で、白パネル内の先頭からグレー正方形が始まる（一覧グリッドと同じ bar 下リズム）。 |
| **メイン写真ガイド（正方形スロット）** | 作品掲載・詳細テキスト位置の**共通ガイド**。**640×640px 相当**（PC 既定）の正方形を DOM/CSS で確保。背景は実装 **`transparent`**（`--painting-detail-hero-slot-bg`）。モックの薄グレーは **`#e6e6e6`**。**一辺の上限**は **`--painting-detail-hero-slot-width`**（PC 既定 **640px**）。実効一辺＝`min(100%, その値)`。SP（≤640px）は列幅 `100%` の正方形。画像は枠内で **`object-fit: contain`**・`object-position: top center`。`.painting-detail__column` で **スロットとテキスト幅を一致**。**大きな画像でも一辺上限を超えない**よう、列・ヒーロー・`img` に **`min-width: 0`**。 |
| **右列・詳細写真** | `data` の **`detailImages`**（任意）があるときだけ表示。`.painting-detail__detail-strip` 内に **正方形サムネを縦積み**（PC・**帯の高さ＝左列ヒーロー＋テキスト**・**帯内スクロールなし**・`overflow: hidden`）。列の背景は実装 **`transparent`**（モック水色は `#c8e8f5`）。**メイン `image` は先頭サムネに自動追加**（一覧に戻る用）。**クリックで hero 差し替え**（`ArtworkDetailBody` は client）。SP は **テキスト下・横スクロールなし**。トークン: `--painting-detail-detail-strip-*`。白パネル最大幅 PC は **`--detail-content-max-pc` 1040px**。 |
| **マゼンタ帯** | **40px**（`--painting-detail-text-gap`）＝スロット下辺から **薄ピンク（テキスト）エリアの上端**までの固定距離。 |
| **テキストエリア** | `.painting-detail__text`（**ガイド正方形と同じ列幅**で **幅 100%**）。**上・左パディングなし**（`padding: 0`）。先頭の `h1` も **上マージン 0**。左端は **ガイドスロットの左端と揃える**。 |
| **中央カラム幅** | PC: **`--detail-content-max-pc`（1040px）** 上限（グレー中央＋右列収容）。SP: **`--detail-content-max-sp`（560px）**。 |
| **スクロール** | **縦のみ**。`overflow-x: hidden` + `touch-action: pan-y` + `overscroll-behavior-x: none`。ビューポート張り出し（100vw + 負マージン）は**使わない**（横ずれ・横スクロールの原因になるため）。 |
| **境界線** | 個別ページのヘッダー下・サイドバー横の**区切り線は付けない**（過去要件）。 |

## データ・コンポーネント追加手順

1. 各カテゴリの `data.ts` に `slug` / `title` / `image` 等を追加。右列が必要なら **`detailImages?: string[]`**（メインと同じ URL は省略可）。
2. `[slug]/page.tsx` で `notFound` 処理のまま、レイアウトは **`PaintingDetailStudio` 等**または **`ArtworkDetailBody` をラップした同型コンポーネント**を利用。
3. 年・媒体・説明・価格は **`ArtworkDetailTextBlock`**（または `ArtworkDetailBody` の `children`）で配置。推奨: `data.ts` に `medium` / `description?` / `priceNote?` を持たせ、`*DetailStudio` で `<ArtworkDetailTextBlock {...} />` を渡す（タイトルは `h1`、その直下が本文）。
4. 数値トークンを変えたい場合は **CSS 変数**を編集し、本書の表と差分をメモする。**ガイド正方形の一辺**は **`--painting-detail-hero-slot-width`**。右列ありのときは **`--detail-content-max-pc`** でパネル幅を足す（メイン列は**常に列単体で中央**）。背景を出すときは **`--painting-detail-hero-slot-bg`** / **`--painting-detail-detail-strip-bg`** にモック参照色を設定。

## 未実装（モックの拡張）

- メインとサムネの **入れ替え**（クリック後に元サムネ位置へ「フルサイズを移す」等の高度な挙動）。現状は **hero の `src` 差し替えのみ**。

## CSS 変数（変更はここを一本化）

### `app/globals.css` — `.painting-detail`

| 変数 | 既定 | 意味 |
|------|------|------|
| `--painting-detail-hero-slot-width` | `640px`（SP ≤640px は `100%`） | **掲載ガイド**：正方形スロットの**一辺**＝列の**幅**。列はパネル内**中央**。`--detail-content-max-pc`（1040）内に収める |
| `--painting-detail-hero-slot-bg` | `transparent`（実装） | 既定は**非表示**。モックの薄グレーは `#e6e6e6` |
| `--painting-detail-text-gap` | `40px` | スロット下辺 → テキストエリア上端（マゼンタ帯相当） |
| `--painting-detail-detail-strip-width` | `160px`（768–1023px は `120px` に上書き） | 右列の**幅**（列の右外・absolute） |
| `--painting-detail-detail-strip-gap` | `32px`（768–1023px は `24px`） | 列右端〜右列の**間隔** |
| `--painting-detail-detail-strip-bg` | `transparent`（実装） | 既定は**非表示**。モックの水色は `#c8e8f5` |
| `--painting-detail-detail-strip-inner-gap` | `8px` | サムネ同士の間隔（PC 縦積み） |
| `--painting-detail-detail-strip-inner-padding` | `8px` | 詳細帯内の左右下（**上は常に 0**）。PC の帯の高さは**列全体**（ヒーロー＋テキスト） |
| `--painting-detail-detail-thumb-size-sp` | `96px` | SP サムネの一辺 |
| `--painting-detail-detail-strip-inner-gap-sp` | `10px` | SP サムネ横並びの gap |
| `--painting-detail-detail-strip-inner-padding-sp` | `10px 8px` | SP 詳細帯内 padding |
| `--painting-detail-detail-strip-margin-top-sp` | `1.5rem` | SP でテキストと詳細帯の間 |

### `components/artwork-index/artwork-index-layout.css` — `.paintings-studio--detail`

| 変数 | 既定 | 意味 |
|------|------|------|
| `--detail-content-max-pc` | `1040px` | 個別ページの**コンテンツ最大幅**（グレー中央＋右列用） |
| `--detail-content-max-sp` | `560px` | 中央カラム最大幅（≤767px） |
| `--detail-root-pad-top` | `0` | 白パネル内の本文先頭余白なし（パネル位置は一覧同様 `96px + 40px` / SP `+24px` の外側で確保） |
| `--detail-root-pad-bottom` | `clamp(120px, 18vh, 220px)` | 下余白（左下フィルターと被り防止） |
| `--detail-filter-max-width` | `min(42vw, 280px)` | 左下フィルター列の最大幅 |

一覧ページの左右ガターは `.paintings-studio` の **`--studio-gutter`**（28px）。

## 関連ファイル

| ファイル | 内容 |
|----------|------|
| `components/artwork-index/ArtworkDetailBody.tsx` | client。`detailImages`・クリック差し替え。DOM は **ヒーロー→テキスト→詳細帯**。PC は帯を**列**右外 `absolute`（`top/bottom:0` でヒーロー＋テキストの高さまで）。SP は列を grid |
| `components/artwork-index/ArtworkDetailTextBlock.tsx` | タイトル下のメタ・説明・価格行の標準構造 |
| `components/artwork-index/ArtworkStudioLayout.tsx` | `pageMode="detail"` で chrome |
| `app/globals.css` | `.painting-detail` 系（**メイン＋詳細列の確定トークン**は `.painting-detail` 直下） |
| `components/artwork-index/artwork-index-layout.css` | `.paintings-studio--detail`（白 UI・フィルター・パネル・max-width） |
