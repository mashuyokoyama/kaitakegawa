"use client";

import Link from "next/link";
import { useMemo, type ReactNode } from "react";

import ArtworkImage from "@/components/ArtworkImage";
import { artworkThumbSrc } from "@/lib/images";
import type { ArtworkStudioNavId } from "./site-nav";
import ArtworkStudioLayout from "./ArtworkStudioLayout";

export type ArtworkIndexItem = {
  image: string;
  title: string;
  href: string;
};

export type ArtworkGallerySoloAlign = "left" | "right" | "center";

export type ArtworkGallerySoloWidth = "bouquet-under-pair" | "wide-full-band";

export type ArtworkGalleryResolvedRow =
  | { kind: "pair"; items: [ArtworkIndexItem, ArtworkIndexItem] }
  | {
      kind: "solo";
      align: ArtworkGallerySoloAlign;
      item: ArtworkIndexItem;
      soloWidth?: ArtworkGallerySoloWidth;
    };

export type ArtworkIndexLayoutProps = {
  items: readonly ArtworkIndexItem[];
  sidebar: ReactNode;
  activeNav: ArtworkStudioNavId;
  /** PC 一覧を明示行（ペア列／単体の左・右・中央寄せ）で描画。未指定時は従来の 2 列グリッド */
  galleryRows?: readonly ArtworkGalleryResolvedRow[];
  /** PC 一覧を画像なしのコレクション／タイトル表示に切り替える */
  desktopTextList?: {
    collections: {
      years: readonly {
        label: string;
        href: string;
      }[];
      names: readonly {
        label: string;
        href: string;
      }[];
      activeHref?: string;
      allHref?: string;
      isAllActive?: boolean;
    };
    titles: readonly {
      label: string;
      href: string;
    }[];
  };
};

function renderGalleryCard(work: ArtworkIndexItem, extraClass?: string) {
  return (
    <Link
      key={work.href}
      href={work.href}
      className={["paintings-studio__card", "gallery-item", extraClass]
        .filter(Boolean)
        .join(" ")}
    >
      <ArtworkImage
        src={artworkThumbSrc(work.image)}
        alt=""
        width={480}
        height={600}
        sizes="(max-width: 767px) 50vw, 40vw"
        loading="lazy"
      />
      <div className="paintings-studio__caption caption">{work.title}</div>
    </Link>
  );
}

function renderPipeSeparatedLinks(
  items: readonly {
    label: string;
    href: string;
  }[],
  options?: {
    activeHref?: string;
    linkClassName?: string;
  }
) {
  return items.map((item, index) => (
    <span
      key={`${item.href}-${index}`}
      className="paintings-studio__pc-text-unit"
    >
      {index > 0 ? (
        <span className="paintings-studio__pc-text-sep" aria-hidden="true">
          |
        </span>
      ) : null}
      <Link
        href={item.href}
        className={[
          "paintings-studio__pc-text-link",
          options?.linkClassName ?? "",
          options?.activeHref === item.href
            ? "paintings-studio__pc-text-link--collection-active"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {item.label}
      </Link>
    </span>
  ));
}

export default function ArtworkIndexLayout({
  items,
  sidebar,
  activeNav,
  galleryRows,
  desktopTextList,
}: ArtworkIndexLayoutProps) {
  const leftItems = useMemo(
    () => items.filter((_, i) => i % 2 === 0),
    [items]
  );
  const rightItems = useMemo(
    () => items.filter((_, i) => i % 2 === 1),
    [items]
  );

  return (
    <ArtworkStudioLayout
      activeNav={activeNav}
      sidebar={sidebar}
      hideSidebar
      galleryShellClassName={
        desktopTextList ? "paintings-studio__gallery-shell--plain" : undefined
      }
    >
      <div
        className={
          [
            "gallery",
            galleryRows?.length ? "gallery--paintings-rows" : "",
            desktopTextList ? "gallery--with-pc-text-list" : "",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        {desktopTextList ? (
          <div className="paintings-studio__pc-text-list" aria-label="Artwork list">
            <section className="paintings-studio__pc-text-section">
              <h2 className="paintings-studio__pc-text-heading">
                Collections
                {desktopTextList.collections.isAllActive ||
                !desktopTextList.collections.allHref ? (
                  <span className="paintings-studio__pc-text-all paintings-studio__pc-text-all--active">
                    All
                  </span>
                ) : (
                  <Link
                    href={desktopTextList.collections.allHref}
                    className="paintings-studio__pc-text-all paintings-studio__pc-text-all--button"
                  >
                    All
                  </Link>
                )}
              </h2>
              <div className="paintings-studio__pc-text-values">
                <div className="paintings-studio__pc-text-values-years">
                  {renderPipeSeparatedLinks(desktopTextList.collections.years, {
                    activeHref: desktopTextList.collections.activeHref,
                    linkClassName: "paintings-studio__pc-text-link--collection",
                  })}
                </div>
                {desktopTextList.collections.names.length > 0 ? (
                <div className="paintings-studio__pc-text-values-names">
                  {renderPipeSeparatedLinks(desktopTextList.collections.names, {
                    activeHref: desktopTextList.collections.activeHref,
                    linkClassName: "paintings-studio__pc-text-link--collection",
                  })}
                </div>
                ) : null}
              </div>
            </section>
            <section className="paintings-studio__pc-text-section">
              <h2 className="paintings-studio__pc-text-heading">Titles</h2>
              <div className="paintings-studio__pc-text-values">
                {renderPipeSeparatedLinks(desktopTextList.titles)}
              </div>
            </section>
          </div>
        ) : null}
        {!desktopTextList ? (
        <div className="paintings-studio__gallery-visual">
          {galleryRows?.length ? (
            galleryRows.map((row, rowIndex) =>
              row.kind === "pair" ? (
                <div
                  key={`pair-${rowIndex}`}
                  className="paintings-studio__gallery-row paintings-studio__gallery-row--pair"
                >
                  {renderGalleryCard(row.items[0], "gallery-item--pair-cell")}
                  {renderGalleryCard(row.items[1], "gallery-item--pair-cell")}
                </div>
              ) : (
                <div
                  key={row.item.href}
                  className={[
                    "paintings-studio__gallery-row",
                    "paintings-studio__gallery-row--solo",
                    `paintings-studio__gallery-row--solo-${row.align}`,
                    row.soloWidth === "bouquet-under-pair"
                      ? "paintings-studio__gallery-row--solo-bouquet"
                      : row.soloWidth === "wide-full-band"
                        ? "paintings-studio__gallery-row--solo-wide-full"
                        : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {renderGalleryCard(
                    row.item,
                    row.soloWidth === "bouquet-under-pair"
                      ? "gallery-item--solo gallery-item--solo-bouquet"
                      : row.soloWidth === "wide-full-band"
                        ? "gallery-item--solo gallery-item--solo-wide-full"
                        : "gallery-item--solo"
                  )}
                </div>
              )
            )
          ) : (
            items.map((work) => renderGalleryCard(work))
          )}
        </div>
        ) : null}
      </div>

      {!desktopTextList ? (
        <div className="paintings-studio__mob-scroll">
          <div className="paintings-studio__canvas">
            <div className="paintings-studio__col paintings-studio__col--left">
              {leftItems.map((work) => (
                <Link
                  key={work.href}
                  href={work.href}
                  className="paintings-studio__card--mob"
                >
                  <ArtworkImage
                    src={artworkThumbSrc(work.image)}
                    alt=""
                    width={480}
                    height={600}
                    sizes="50vw"
                    loading="lazy"
                  />
                  <div className="paintings-studio__caption--mob">{work.title}</div>
                </Link>
              ))}
            </div>
            <div className="paintings-studio__col paintings-studio__col--right">
              {rightItems.map((work) => (
                <Link
                  key={work.href}
                  href={work.href}
                  className="paintings-studio__card--mob"
                >
                  <ArtworkImage
                    src={artworkThumbSrc(work.image)}
                    alt=""
                    width={480}
                    height={600}
                    sizes="50vw"
                    loading="lazy"
                  />
                  <div className="paintings-studio__caption--mob">{work.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </ArtworkStudioLayout>
  );
}
