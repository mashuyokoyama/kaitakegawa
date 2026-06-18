"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

import ArtworkImage from "@/components/ArtworkImage";
import { artworkThumbSrc } from "@/lib/images";

/**
 * 作品個別ページの共通ボディ（モック準拠）。
 * ルール・確定 baseline は docs/ARTWORK_DETAIL_SPEC.md を参照。
 */
export type ArtworkDetailBodyProps = {
  image: string;
  title: string;
  /** 右列に並べる詳細画像（任意）。メイン `image` は先頭サムネとして自動で含める */
  detailImages?: readonly string[];
  backHref?: string;
  nextHref?: string;
  /** タイトル下: 媒体・年・説明・価格など */
  children?: ReactNode;
};

export default function ArtworkDetailBody({
  image,
  title,
  detailImages,
  backHref,
  nextHref,
  children,
}: ArtworkDetailBodyProps) {
  const [heroSrc, setHeroSrc] = useState(image);
  const [isLandscapeHero, setIsLandscapeHero] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);
  const heroImgRef = useRef<HTMLImageElement | null>(null);

  const syncSpHeroLayout = () => {
    const root = articleRef.current;
    const img = heroImgRef.current;
    if (!root || !img) return;
    if (window.matchMedia("(min-width: 768px)").matches) {
      root.style.removeProperty("--sp-detail-measured-hero-h");
      return;
    }
    const height = img.getBoundingClientRect().height;
    root.style.setProperty("--sp-detail-measured-hero-h", `${height}px`);
  };

  const updateLandscapeState = (img: HTMLImageElement) => {
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      setIsLandscapeHero(img.naturalWidth > img.naturalHeight);
    }
    syncSpHeroLayout();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setHeroSrc(image);
    setIsLandscapeHero(false);
  }, [image]);

  useEffect(() => {
    const img = heroImgRef.current;
    if (!img) return;
    if (img.complete) {
      updateLandscapeState(img);
    }
  }, [heroSrc]);

  useEffect(() => {
    const img = heroImgRef.current;
    if (!img) return;

    syncSpHeroLayout();

    const observer = new ResizeObserver(() => {
      syncSpHeroLayout();
    });
    observer.observe(img);

    window.addEventListener("resize", syncSpHeroLayout);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncSpHeroLayout);
    };
  }, [heroSrc, isLandscapeHero]);

  useEffect(() => {
    setIsFullscreen(false);
  }, [heroSrc, image]);

  useEffect(() => {
    if (!isFullscreen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("painting-detail--lightbox-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("painting-detail--lightbox-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isFullscreen]);

  const thumbs = useMemo(() => {
    const extra = detailImages?.length ? [...detailImages] : [];
    const withoutDupMain = extra.filter((u) => u !== image);
    return [image, ...withoutDupMain];
  }, [image, detailImages]);

  const showStrip = thumbs.length > 1;

  const pagerChevron = (direction: "prev" | "next") => (
    <svg
      className="painting-detail__pager-chevron"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={direction === "prev" ? "M8 1L2 8L8 15" : "M2 1L8 8L2 15"}
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const lightbox = isFullscreen ? (
    <div
      className="painting-detail__lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} fullscreen`}
      onClick={() => setIsFullscreen(false)}
    >
      <div
        className="painting-detail__lightbox-img-wrap"
        onClick={(event) => event.stopPropagation()}
      >
        <ArtworkImage
          src={heroSrc}
          alt={title}
          className="painting-detail__lightbox-img"
          width={2000}
          height={2500}
          sizes="100vw"
        />
      </div>
    </div>
  ) : null;

  return (
    <div className="paintings-studio__detail-root">
      <article
        ref={articleRef}
        className={[
          "painting-detail",
          "painting-detail--studio",
          isLandscapeHero ? "painting-detail--landscape" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="painting-detail__viewport-frame">
          <div className="painting-detail__content">
            <div className="painting-detail__row">
              <div className="painting-detail__column">
                <div className="painting-detail__hero">
                  <button
                    type="button"
                    className="painting-detail__hero-open"
                    onClick={() => setIsFullscreen(true)}
                    aria-label={`View ${title} fullscreen`}
                  >
                    <ArtworkImage
                      ref={heroImgRef}
                      src={heroSrc}
                      alt=""
                      className="painting-detail__hero-img"
                      width={2000}
                      height={2500}
                      sizes="(max-width: 767px) 100vw, min(848px, 100vw)"
                      priority
                      onLoad={(event) => updateLandscapeState(event.currentTarget)}
                      onError={() => setIsLandscapeHero(false)}
                    />
                  </button>
                </div>
                <div className="painting-detail__caption-block">
                  <div className="painting-detail__text">
                    <h1 className="painting-detail__title">{title}</h1>
                    {children}
                  </div>
                  {showStrip ? (
                    <aside
                      className="painting-detail__detail-strip"
                      aria-label="Detail images"
                    >
                      <div className="painting-detail__detail-strip-inner">
                        {thumbs.map((src, i) => {
                          const isCurrent = heroSrc === src;
                          return (
                            <button
                              key={`${src}-${i}`}
                              type="button"
                              className={
                                isCurrent
                                  ? "painting-detail__detail-thumb painting-detail__detail-thumb--current"
                                  : "painting-detail__detail-thumb"
                              }
                              onClick={() => setHeroSrc(src)}
                              aria-label={
                                i === 0
                                  ? "Show main artwork"
                                  : `Show detail image ${i + 1}`
                              }
                              aria-pressed={isCurrent}
                            >
                              <img
                                src={artworkThumbSrc(src)}
                                alt=""
                                draggable={false}
                                loading="lazy"
                                decoding="async"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </aside>
                  ) : null}
                </div>
              </div>
            </div>
            <nav
              className="painting-detail__pager painting-detail__pager--bottom"
              aria-label="Artwork navigation"
            >
              {backHref ? (
                <Link
                  className="painting-detail__pager-link painting-detail__pager-link--prev"
                  href={backHref}
                  aria-label="Previous artwork"
                >
                  <span className="painting-detail__pager-glyph" aria-hidden="true">
                    {pagerChevron("prev")}
                  </span>
                  <span className="painting-detail__pager-label">Back</span>
                </Link>
              ) : (
                <span
                  className="painting-detail__pager-link painting-detail__pager-link--prev painting-detail__pager-link--disabled"
                  aria-hidden="true"
                >
                  <span className="painting-detail__pager-glyph" aria-hidden="true">
                    {pagerChevron("prev")}
                  </span>
                  <span className="painting-detail__pager-label">Back</span>
                </span>
              )}
              {nextHref ? (
                <Link
                  className="painting-detail__pager-link painting-detail__pager-link--next"
                  href={nextHref}
                  aria-label="Next artwork"
                >
                  <span className="painting-detail__pager-glyph" aria-hidden="true">
                    {pagerChevron("next")}
                  </span>
                  <span className="painting-detail__pager-label">Next</span>
                </Link>
              ) : (
                <span
                  className="painting-detail__pager-link painting-detail__pager-link--next painting-detail__pager-link--disabled"
                  aria-hidden="true"
                >
                  <span className="painting-detail__pager-glyph" aria-hidden="true">
                    {pagerChevron("next")}
                  </span>
                  <span className="painting-detail__pager-label">Next</span>
                </span>
              )}
            </nav>
          </div>
        </div>
        {isMounted && lightbox ? createPortal(lightbox, document.body) : null}
      </article>
    </div>
  );
}
