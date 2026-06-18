import { notFound } from "next/navigation";

import SketchDetailStudio from "@/components/artwork-index/SketchDetailStudio";

import { SKETCHES } from "../data";

export function generateStaticParams() {
  return SKETCHES.map((s) => ({ slug: s.slug }));
}

export default async function SketchSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = SKETCHES.findIndex((s) => s.slug === slug);
  if (currentIndex < 0) notFound();
  const work = SKETCHES[currentIndex];
  const backHref =
    currentIndex > 0 ? `/sketches/${SKETCHES[currentIndex - 1].slug}` : undefined;
  const nextHref =
    currentIndex < SKETCHES.length - 1
      ? `/sketches/${SKETCHES[currentIndex + 1].slug}`
      : undefined;

  return <SketchDetailStudio work={work} backHref={backHref} nextHref={nextHref} />;
}
