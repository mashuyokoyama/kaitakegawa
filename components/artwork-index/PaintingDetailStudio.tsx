"use client";

import type { PaintingItem } from "@/app/paintings/data";

import ArtworkDetailBody from "./ArtworkDetailBody";
import ArtworkDetailTextBlock from "./ArtworkDetailTextBlock";
import ArtworkStudioLayout from "./ArtworkStudioLayout";
import PaintingsFilterSidebar from "./PaintingsFilterSidebar";

type Props = {
  work: PaintingItem;
  backHref?: string;
  nextHref?: string;
};

export default function PaintingDetailStudio({ work, backHref, nextHref }: Props) {
  return (
    <ArtworkStudioLayout
      pageMode="detail"
      activeNav="paintings"
      sidebar={
        <PaintingsFilterSidebar
          mode="nav"
          highlightLabel={String(work.year)}
        />
      }
    >
      <ArtworkDetailBody
        image={work.image}
        title={work.title}
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
