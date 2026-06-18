"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import {
  ARTWORK_INDEX_NAV_ITEMS,
  type ArtworkStudioNavId,
} from "./site-nav";
import "./artwork-index-layout.css";

export type ArtworkStudioLayoutProps = {
  activeNav: ArtworkStudioNavId;
  sidebar: ReactNode;
  children: ReactNode;
  /** 個別ページ: トップバー・サイドを白背景、メインを中央カラム（一覧は taupe） */
  pageMode?: "index" | "detail";
  galleryShellClassName?: string;
  hideSidebar?: boolean;
};

/**
 * Shared chrome: fixed TOP bar + sidebar geometry (same as index).
 * Main white panel is `children` inside `.paintings-studio__gallery-shell`.
 */
export default function ArtworkStudioLayout({
  activeNav,
  sidebar,
  children,
  pageMode = "index",
  galleryShellClassName,
  hideSidebar = false,
}: ArtworkStudioLayoutProps) {
  const rootClass = [
    "paintings-studio",
    pageMode === "detail" ? "paintings-studio--detail" : "",
    hideSidebar ? "paintings-studio--no-sidebar" : "",
    activeNav === "fragments" ? "paintings-studio--fragments" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <header className="header paintings-studio__top">
        <Link
          href="/"
          className="header-logo paintings-studio__site"
          aria-label="Home"
        >
          kaitakegawa.com
        </Link>
        <nav className="header-nav paintings-studio__nav" aria-label="Site">
          {ARTWORK_INDEX_NAV_ITEMS.map((item, i) => {
            const isCurrent = item.id === activeNav;
            return (
              <span
                key={item.label}
                className="paintings-studio__nav-item"
                data-nav-id={item.id}
              >
                {i > 0 ? (
                  <span className="paintings-studio__nav-sep">|</span>
                ) : null}
                <Link
                  href={item.href}
                  className={
                    isCurrent
                      ? "paintings-studio__nav-link paintings-studio__nav-link--current"
                      : "paintings-studio__nav-link"
                  }
                >
                  {item.label}
                </Link>
              </span>
            );
          })}
        </nav>
      </header>

      <main className="main-content paintings-studio__main">
        <div className="paintings-studio__layout">
          {!hideSidebar ? (
            <aside className="paintings-studio__sidebar" aria-label="Filters">
              {sidebar}
            </aside>
          ) : null}

          <div
            className={["paintings-studio__gallery-shell", galleryShellClassName]
              .filter(Boolean)
              .join(" ")}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
