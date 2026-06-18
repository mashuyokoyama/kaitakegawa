import Link from "next/link";

import { ARTWORK_INDEX_NAV_ITEMS } from "@/components/artwork-index/site-nav";

export default function Home() {
  return (
    <main className="top-page">
      <header className="top-page__header header" aria-label="Site">
        <Link href="/" className="top-page__logo header-logo" aria-label="Home">
          kaitakegawa.com
        </Link>
        <nav className="top-page__nav header-nav" aria-label="Primary">
          {ARTWORK_INDEX_NAV_ITEMS.map((item, i) => (
            <span
              key={item.label}
              className="paintings-studio__nav-item"
              data-nav-id={item.id}
            >
              {i > 0 ? (
                <span className="paintings-studio__nav-sep">|</span>
              ) : null}
              <Link href={item.href} className="paintings-studio__nav-link">
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </header>

      <div className="top-page__stage">
        <div className="top-page__hero-zone">
          <div className="top-hero-wrap">
            <img
              src="/landing-hero.png"
              alt=""
              className="top-hero"
            />
          </div>
        </div>
        <p className="top-page__contact">
          contact :{" "}
          <a
            href="mailto:kaitakegawa@gmail.com"
            className="top-page__contact-mail"
          >
            kaitakegawa@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
