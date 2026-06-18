# TOP ページ — SP（≤767px）レイアウト

モック準拠の**確定案**（`app/page.tsx` + `app/globals.css` の `.top-page` ブロック）。

| 項目 | 内容 |
|------|------|
| 背景 | **`#c4bfb8`**（PC 版 TOP と同一の taupe） |
| バッジ | 「Kai is Online Now!」は **非表示** |
| コンテンツエリア | 左右 **`--sp-content-inset-left` / `--sp-content-inset-right`（28px）**。ロゴ・メニュー・contact はこの幅内で左寄せ |
| ロゴ | `kaitakegawa.com` **14px**・白。上余白 **`clamp(72px, 16vh, 128px)`**（FV モックどおりヘッダー下寄せ） |
| 左寄せライン | ロゴ文字列の**左端**＝`--sp-text-align-left`（**28px**） |
| KV 位置 | ロゴ下の可変領域で**縦横センター** |
| 画像幅 | ラッパー **`min(82vw, 100vw - 左右インセット)`**（上限 `520px`）、細い枠線 |
| メニュー | **14px**、`|` 区切り。**KV の直下**・左ライン揃え |
| contact | **12px**、画面下端・左ライン揃え（`margin-top: auto`） |
| フォント | Courier New 系、`text-transform: lowercase` |

## DOM 順（SP）

1. ロゴ（`header`・固定ヘッダーなし）
2. KV（`hero-zone`・中央）
3. メニュー（`nav`）
4. contact

PC（≥768px）は従来どおり固定ヘッダー＋ナビ中央・KV 絶対配置。**SP も含め TOP 全体の地色は PC と同じ `#c4bfb8`**。
