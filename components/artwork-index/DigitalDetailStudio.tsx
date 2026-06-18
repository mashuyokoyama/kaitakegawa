"use client";

import Link from "next/link";

import type { DigitalItem } from "@/app/digital-compositions/data";

import ArtworkDetailBody from "./ArtworkDetailBody";
import ArtworkDetailTextBlock from "./ArtworkDetailTextBlock";
import ArtworkStudioLayout from "./ArtworkStudioLayout";

type Props = {
  work: DigitalItem;
  backHref?: string;
  nextHref?: string;
};

function DigitalSidebarNav() {
  return (
    <div className="paintings-studio__filters">
      <Link
        href="/digital-compositions"
        className="paintings-studio__filter-btn paintings-studio__filter-btn--active"
      >
        All
      </Link>
    </div>
  );
}

export default function DigitalDetailStudio({ work, backHref, nextHref }: Props) {
  return (
    <ArtworkStudioLayout
      pageMode="detail"
      activeNav="digital"
      sidebar={<DigitalSidebarNav />}
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
