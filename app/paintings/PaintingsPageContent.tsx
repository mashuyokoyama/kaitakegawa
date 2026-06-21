"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import ArtworkIndexLayout, {
  type ArtworkGalleryResolvedRow,
  type ArtworkIndexItem,
} from "@/components/artwork-index/ArtworkIndexLayout";
import PaintingsFilterSidebar from "@/components/artwork-index/PaintingsFilterSidebar";
import { PAINTINGS } from "./data";
import {
  filterPaintings,
  isValidPaintingsFilterLabel,
} from "./filters";
import {
  PAINTINGS_GALLERY_ROWS,
  paintingsGallerySlugOrder,
} from "./gallery-layout";

export default function PaintingsPageContent() {
  const searchParams = useSearchParams();
  const filterFromUrl = searchParams.get("filter");

  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (filterFromUrl && isValidPaintingsFilterLabel(filterFromUrl)) {
      setActiveFilter(filterFromUrl);
    } else if (!filterFromUrl) {
      setActiveFilter("All");
    }
  }, [filterFromUrl]);

  const filtered = useMemo(
    () => filterPaintings(PAINTINGS, activeFilter),
    [activeFilter]
  );

  const slugOrderIndex = useMemo(() => {
    const m = new Map<string, number>();
    paintingsGallerySlugOrder().forEach((slug, i) => m.set(slug, i));
    return m;
  }, []);

  const toItem = (work: (typeof PAINTINGS)[number]): ArtworkIndexItem => ({
    image: work.image,
    title: work.title,
    href: `/paintings/${work.slug}`,
  });

  const filteredSorted = useMemo(() => {
    if (activeFilter === "All") return filtered;
    return [...filtered].sort(
      (a, b) =>
        (slugOrderIndex.get(a.slug) ?? 999) - (slugOrderIndex.get(b.slug) ?? 999)
    );
  }, [activeFilter, filtered, slugOrderIndex]);

  const items = useMemo(
    () => filteredSorted.map(toItem),
    [filteredSorted]
  );

  const desktopCollections = useMemo(() => {
    const years = [...new Set(PAINTINGS.map((work) => work.year))]
      .sort((a, b) => a - b)
      .map((year) => ({
        label: String(year),
        href: `/paintings?filter=${encodeURIComponent(String(year))}`,
      }));
    return {
      years,
      names: [],
      activeHref:
        activeFilter !== "All" && /^\d{4}$/.test(activeFilter)
          ? `/paintings?filter=${encodeURIComponent(activeFilter)}`
          : undefined,
      allHref: "/paintings",
      isAllActive: activeFilter === "All",
    };
  }, [activeFilter]);

  const desktopTitles = useMemo(
    () =>
      filteredSorted.map((work) => ({
        label: work.title,
        href: `/paintings/${work.slug}`,
      })),
    [filteredSorted]
  );

  const galleryRows = useMemo((): readonly ArtworkGalleryResolvedRow[] | undefined => {
    if (activeFilter !== "All") return undefined;
    const bySlug = new Map(PAINTINGS.map((p) => [p.slug, p]));
    return PAINTINGS_GALLERY_ROWS.map((row) => {
      if (row.kind === "pair") {
        const a = bySlug.get(row.slugs[0]);
        const b = bySlug.get(row.slugs[1]);
        if (!a || !b) {
          throw new Error(`gallery-layout: missing slug in PAINTINGS`);
        }
        return { kind: "pair" as const, items: [toItem(a), toItem(b)] };
      }
      const p = bySlug.get(row.slug);
      if (!p) throw new Error(`gallery-layout: missing slug in PAINTINGS`);
      return {
        kind: "solo" as const,
        align: row.align,
        item: toItem(p),
        ...(row.soloWidth ? { soloWidth: row.soloWidth } : {}),
      };
    });
  }, [activeFilter]);

  return (
    <ArtworkIndexLayout
      items={items}
      galleryRows={galleryRows}
      sidebar={
        <PaintingsFilterSidebar
          mode="interactive"
          activeFilter={activeFilter}
          onSelect={setActiveFilter}
        />
      }
      activeNav="paintings"
      desktopTextList={{
        collections: desktopCollections,
        titles: desktopTitles,
      }}
    />
  );
}
