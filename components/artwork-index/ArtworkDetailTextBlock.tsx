/**
 * 仕様: タイトル（h1）の直下 — 年・媒体 → 説明 → 価格／問い合わせ（docs/ARTWORK_DETAIL_SPEC.md）
 */
export type ArtworkDetailTextFields = {
  year?: number;
  medium?: string;
  description?: string;
  priceNote?: string;
};

export default function ArtworkDetailTextBlock({
  year,
  medium,
  description,
  priceNote,
}: ArtworkDetailTextFields) {
  const showMeta = medium != null && medium.length > 0 && year != null;

  return (
    <>
      {showMeta ? (
        <p className="painting-detail__meta">
          {year}, {medium}
        </p>
      ) : medium ? (
        <p className="painting-detail__meta">{medium}</p>
      ) : null}
      {description ? (
        <p className="painting-detail__description">{description}</p>
      ) : null}
      {priceNote ? (
        <p className="painting-detail__price">{priceNote}</p>
      ) : null}
    </>
  );
}
