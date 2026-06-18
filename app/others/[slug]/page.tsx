import { notFound } from "next/navigation";

import OthersDetailStudio from "@/components/artwork-index/OthersDetailStudio";

import { OTHERS } from "../data";

export function generateStaticParams() {
  return OTHERS.map((item) => ({ slug: item.slug }));
}

export default async function OtherSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = OTHERS.findIndex((item) => item.slug === slug);
  if (currentIndex < 0) notFound();
  const work = OTHERS[currentIndex];
  const backHref =
    currentIndex > 0 ? `/others/${OTHERS[currentIndex - 1].slug}` : undefined;
  const nextHref =
    currentIndex < OTHERS.length - 1
      ? `/others/${OTHERS[currentIndex + 1].slug}`
      : undefined;

  return (
    <OthersDetailStudio work={work} backHref={backHref} nextHref={nextHref} />
  );
}
