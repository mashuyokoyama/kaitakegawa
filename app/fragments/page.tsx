"use client";

import ArtworkImage from "@/components/ArtworkImage";
import ArtworkStudioLayout from "@/components/artwork-index/ArtworkStudioLayout";

const FRAGMENT_COUNT = 33;

const FRAGMENT_IMAGES: readonly string[] = Array.from(
  { length: FRAGMENT_COUNT },
  (_, i) => `/fragments/fragment-${String(i + 1).padStart(2, "0")}.jpg`
);

export default function FragmentsPage() {
  const sidebar = (
    <div className="paintings-studio__filters">
      <button
        type="button"
        className="paintings-studio__filter-btn paintings-studio__filter-btn--active"
        disabled
      >
        All
      </button>
    </div>
  );

  return (
    <ArtworkStudioLayout
      activeNav="fragments"
      sidebar={sidebar}
      hideSidebar
      galleryShellClassName="paintings-studio__gallery-shell--plain paintings-studio__gallery-shell--fragments"
    >
      <div className="fragments-stack">
        {FRAGMENT_IMAGES.map((src) => (
          <figure key={src} className="fragments-stack__slide fragment-item">
            <ArtworkImage
              src={src}
              alt=""
              width={1600}
              height={2000}
              sizes="100vw"
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </ArtworkStudioLayout>
  );
}
