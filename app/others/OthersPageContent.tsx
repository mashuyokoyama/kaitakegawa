"use client";

import { useMemo } from "react";

import ArtworkIndexLayout from "@/components/artwork-index/ArtworkIndexLayout";

import { OTHERS } from "./data";

export default function OthersPageContent() {
  const items = useMemo(
    () =>
      OTHERS.map((item) => ({
        image: item.image,
        title: item.title,
        href: `/others/${item.slug}`,
      })),
    []
  );

  const desktopCollections = useMemo(
    () => ({
      years: [] as readonly { label: string; href: string }[],
      names: [] as readonly { label: string; href: string }[],
      allHref: "/others",
      isAllActive: true,
    }),
    []
  );

  const desktopTitles = useMemo(
    () =>
      OTHERS.map((item) => ({
        label: item.title,
        href: `/others/${item.slug}`,
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
      activeNav="others"
      desktopTextList={{
        collections: desktopCollections,
        titles: desktopTitles,
      }}
    />
  );
}
