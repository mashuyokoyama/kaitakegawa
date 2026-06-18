"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import ArtworkIndexLayout from "@/components/artwork-index/ArtworkIndexLayout";

import { SKETCHES } from "./data";
import { sketchTitleForDisplay } from "./sketch-title-display";

/** Collections 行に表示するコレクション（`description` と一致） */
export const SKETCH_COLLECTIONS = ["Gatton", "New York", "Beppu"] as const;

export function isValidSketchCollection(
  s: string | null
): s is (typeof SKETCH_COLLECTIONS)[number] {
  return s != null && (SKETCH_COLLECTIONS as readonly string[]).includes(s);
}

function filterSketchesForIndex(
  filterYear: string | null,
  collection: string | null
): readonly (typeof SKETCHES)[number][] {
  if (isValidSketchCollection(collection)) {
    return SKETCHES.filter((item) => item.description === collection);
  }
  if (filterYear && /^\d{4}$/.test(filterYear)) {
    const y = Number(filterYear);
    return SKETCHES.filter((item) => item.year === y);
  }
  return SKETCHES;
}

export default function SketchesPageContent() {
  const searchParams = useSearchParams();
  const filterYear = searchParams.get("filter");
  const collectionParam = searchParams.get("collection");

  const filtered = useMemo(
    () => filterSketchesForIndex(filterYear, collectionParam),
    [filterYear, collectionParam]
  );

  const items = useMemo(
    () =>
      filtered.map((s) => ({
        image: s.image,
        title: sketchTitleForDisplay(s.title),
        href: `/sketches/${s.slug}`,
      })),
    [filtered]
  );

  const desktopCollections = useMemo(() => {
    const years = [...new Set(SKETCHES.map((item) => item.year).filter(Boolean))]
      .sort((a, b) => (a ?? 0) - (b ?? 0))
      .map((year) => String(year));

    const yearActive =
      Boolean(filterYear && /^\d{4}$/.test(filterYear)) &&
      !isValidSketchCollection(collectionParam);
    const collectionActive = isValidSketchCollection(collectionParam);

    return {
      years: years.map((year) => ({
        label: year,
        href: `/sketches?filter=${encodeURIComponent(year)}`,
      })),
      names: SKETCH_COLLECTIONS.map((name) => ({
        label: name,
        href: `/sketches?collection=${encodeURIComponent(name)}`,
      })),
      activeHref: collectionActive
        ? `/sketches?collection=${encodeURIComponent(collectionParam)}`
        : yearActive
          ? `/sketches?filter=${encodeURIComponent(filterYear!)}`
          : undefined,
      allHref: "/sketches",
      isAllActive: !yearActive && !collectionActive,
    };
  }, [filterYear, collectionParam]);

  const desktopTitles = useMemo(
    () =>
      filtered.map((item) => ({
        label: sketchTitleForDisplay(item.title),
        href: `/sketches/${item.slug}`,
      })),
    [filtered]
  );

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
    <ArtworkIndexLayout
      items={items}
      sidebar={sidebar}
      activeNav="sketches"
      desktopTextList={{
        collections: desktopCollections,
        titles: desktopTitles,
      }}
    />
  );
}
