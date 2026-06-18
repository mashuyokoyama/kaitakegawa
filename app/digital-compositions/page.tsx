"use client";

import { useMemo } from "react";

import ArtworkIndexLayout from "@/components/artwork-index/ArtworkIndexLayout";
import { DIGITAL_ITEMS } from "./data";

export default function DigitalCompositionsPage() {
  const items = useMemo(
    () =>
      DIGITAL_ITEMS.map((d) => ({
        image: d.image,
        title: d.title,
        href: `/digital-compositions/${d.slug}`,
      })),
    []
  );

  const desktopCollections = useMemo(() => {
    const years = [...new Set(DIGITAL_ITEMS.map((item) => item.year).filter(Boolean))]
      .sort((a, b) => (a ?? 0) - (b ?? 0))
      .map((year) => String(year));
    const firstItemHref =
      DIGITAL_ITEMS.length > 0
        ? `/digital-compositions/${DIGITAL_ITEMS[0].slug}`
        : "/digital-compositions";
    return {
      years: years.map((year) => ({
        label: year,
        href: "/digital-compositions",
      })),
      names: [
        {
          label: "Digital Series",
          href: firstItemHref,
        },
      ],
    };
  }, []);

  const desktopTitles = useMemo(
    () =>
      DIGITAL_ITEMS.map((item) => ({
        label: item.title,
        href: `/digital-compositions/${item.slug}`,
      })),
    []
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
      activeNav="digital"
      desktopTextList={{
        collections: desktopCollections,
        titles: desktopTitles,
      }}
    />
  );
}
