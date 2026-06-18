import { notFound } from "next/navigation";

import DigitalDetailStudio from "@/components/artwork-index/DigitalDetailStudio";

import { DIGITAL_ITEMS } from "../data";

export function generateStaticParams() {
  return DIGITAL_ITEMS.map((d) => ({ slug: d.slug }));
}

export default async function DigitalSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = DIGITAL_ITEMS.findIndex((d) => d.slug === slug);
  if (currentIndex < 0) notFound();
  const work = DIGITAL_ITEMS[currentIndex];
  const backHref =
    currentIndex > 0
      ? `/digital-compositions/${DIGITAL_ITEMS[currentIndex - 1].slug}`
      : undefined;
  const nextHref =
    currentIndex < DIGITAL_ITEMS.length - 1
      ? `/digital-compositions/${DIGITAL_ITEMS[currentIndex + 1].slug}`
      : undefined;

  return <DigitalDetailStudio work={work} backHref={backHref} nextHref={nextHref} />;
}
