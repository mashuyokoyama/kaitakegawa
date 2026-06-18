"use client";

import Link from "next/link";

import {
  PAINTINGS_FILTER_GROUPS,
  paintingsFilterHref,
} from "@/app/paintings/filters";

type InteractiveProps = {
  mode: "interactive";
  activeFilter: string;
  onSelect: (label: string) => void;
};

type NavProps = {
  mode: "nav";
  highlightLabel: string;
};

export type PaintingsFilterSidebarProps = InteractiveProps | NavProps;

export default function PaintingsFilterSidebar(props: PaintingsFilterSidebarProps) {
  return (
    <div className="paintings-studio__filters">
      {PAINTINGS_FILTER_GROUPS.map((group, gi) => (
        <div key={gi}>
          {gi > 0 ? (
            <div className="paintings-studio__filter-gap" aria-hidden />
          ) : null}
          {group.map((label) => {
            if (props.mode === "interactive") {
              const active = props.activeFilter === label;
              return (
                <button
                  key={label}
                  type="button"
                  className={
                    active
                      ? "paintings-studio__filter-btn paintings-studio__filter-btn--active"
                      : "paintings-studio__filter-btn"
                  }
                  onClick={() => props.onSelect(label)}
                >
                  {label}
                </button>
              );
            }
            const active = props.highlightLabel === label;
            return (
              <Link
                key={label}
                href={paintingsFilterHref(label)}
                className={
                  active
                    ? "paintings-studio__filter-btn paintings-studio__filter-btn--active"
                    : "paintings-studio__filter-btn"
                }
              >
                {label}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
