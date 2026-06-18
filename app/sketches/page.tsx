import { Suspense } from "react";

import SketchesPageContent from "./SketchesPageContent";

export default function SketchesPage() {
  return (
    <Suspense
      fallback={
        <div
          className="paintings-studio"
          style={{ minHeight: "100vh", background: "#c4bfb8" }}
        />
      }
    >
      <SketchesPageContent />
    </Suspense>
  );
}
