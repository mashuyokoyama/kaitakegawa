"use client";

import ArtworkStudioLayout from "@/components/artwork-index/ArtworkStudioLayout";

export default function ShopPage() {
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
      activeNav="shop"
      sidebar={sidebar}
      hideSidebar
      galleryShellClassName="paintings-studio__gallery-shell--plain"
    >
      <p className="shop-page__message">coming soon</p>
    </ArtworkStudioLayout>
  );
}
