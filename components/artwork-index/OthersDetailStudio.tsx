"use client";

import Link from "next/link";

import type { OtherItem } from "@/app/others/data";

import ArtworkDetailBody from "./ArtworkDetailBody";
import ArtworkStudioLayout from "./ArtworkStudioLayout";

type Props = {
  work: OtherItem;
  backHref?: string;
  nextHref?: string;
};

function OthersSidebarNav() {
  return (
    <div className="paintings-studio__filters">
      <Link
        href="/others"
        className="paintings-studio__filter-btn paintings-studio__filter-btn--active"
      >
        All
      </Link>
    </div>
  );
}

export default function OthersDetailStudio({ work, backHref, nextHref }: Props) {
  return (
    <ArtworkStudioLayout
      pageMode="detail"
      activeNav="others"
      sidebar={<OthersSidebarNav />}
    >
      <ArtworkDetailBody
        image={work.image}
        title={work.title}
        backHref={backHref}
        nextHref={nextHref}
      />
    </ArtworkStudioLayout>
  );
}
