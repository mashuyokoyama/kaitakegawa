"use client";

import Link from "next/link";

import type { SketchItem } from "@/app/sketches/data";
import { sketchTitleForDisplay } from "@/app/sketches/sketch-title-display";

import ArtworkDetailBody from "./ArtworkDetailBody";
import ArtworkDetailTextBlock from "./ArtworkDetailTextBlock";
import ArtworkStudioLayout from "./ArtworkStudioLayout";

type Props = {
  work: SketchItem;
  backHref?: string;
  nextHref?: string;
};

function SketchesSidebarNav() {
  return (
    <div className="paintings-studio__filters">
      <Link
        href="/sketches"
        className="paintings-studio__filter-btn paintings-studio__filter-btn--active"
      >
        All
      </Link>
    </div>
  );
}

export default function SketchDetailStudio({ work, backHref, nextHref }: Props) {
  return (
    <ArtworkStudioLayout
      pageMode="detail"
      activeNav="sketches"
      sidebar={<SketchesSidebarNav />}
    >
      <ArtworkDetailBody
        image={work.image}
        title={sketchTitleForDisplay(work.title)}
        detailImages={work.detailImages}
        backHref={backHref}
        nextHref={nextHref}
      >
        <ArtworkDetailTextBlock
          year={work.year}
          medium={work.medium}
          description={work.description}
          priceNote={work.priceNote}
        />
      </ArtworkDetailBody>
    </ArtworkStudioLayout>
  );
}
