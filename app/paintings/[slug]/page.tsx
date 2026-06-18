import { notFound } from "next/navigation";

import PaintingDetailStudio from "@/components/artwork-index/PaintingDetailStudio";

import { PAINTINGS } from "../data";

export function generateStaticParams() {
  return PAINTINGS.map((p) => ({ slug: p.slug }));
}

export default async function PaintingSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = PAINTINGS.findIndex((p) => p.slug === slug);
  if (currentIndex < 0) notFound();
  const work = PAINTINGS[currentIndex];
  const backHref =
    currentIndex > 0 ? `/paintings/${PAINTINGS[currentIndex - 1].slug}` : undefined;
  const nextHref =
    currentIndex < PAINTINGS.length - 1
      ? `/paintings/${PAINTINGS[currentIndex + 1].slug}`
      : undefined;

  return <PaintingDetailStudio work={work} backHref={backHref} nextHref={nextHref} />;
}
