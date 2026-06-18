# PC 版レイアウト — 確定 baseline（FIX）

**PC（ビューポート幅 ≥768px）の見た目・主要数値はいったん固定**とする。変更する場合は**意図と差分**をコミットメッセージまたは本書の更新で残すこと。

## 対象

| 範囲 | 実装の中心 |
|------|------------|
| 作品**一覧**（paintings / sketches / digital） | `components/artwork-index/artwork-index-layout.css` 内 **`@media (min-width: 768px)`** |
| 作品**個別** | [`ARTWORK_DETAIL_SPEC.md`](ARTWORK_DETAIL_SPEC.md) ＋ `app/globals.css` の `.painting-detail` |
| サイト共通トークン | `app/globals.css` の `:root`（`--surface-panel`・`--background` ライト時 等） |

## PC 一覧（`.paintings-studio`）の要点

- **外周背景**: `#c4bfb8`（taupe）
- **メイン白パネル**（ギャラリーシェル）: `var(--surface-panel)`（オフホワイト `#faf8f3`）。OS ダークモードでも同値（`--background` とは分離）
- **TOP bar 高さ**: 96px、白パネル上端: `calc(96px + 40px)`
- **左フィルター**: 固定 180px 相当オフセット、`--studio-gutter` 28px
- **グリッド**: 2 列・中央寄せ・パディング／ギャップは CSS 内 `clamp` 定義どおり

### 一覧ギャラリーの「並べ方」

掲載作品がすべて揃ったタイミングでレイアウト・順序を相談する**予定**。現状の grid ルールは上記ファイルを参照。

## 個別ページの PC

詳細は **[`ARTWORK_DETAIL_SPEC.md`](ARTWORK_DETAIL_SPEC.md)**（確定 baseline・トークン表）。

## スコープ外（この FIX に含めない）

- **SP（≤767px）**: 別ルール。必要になったら文書化する。
- **TOP ページ（`/`）**: 現状モック準拠。本書は主に **studio 系** を指す。
