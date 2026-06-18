import { Suspense } from "react";

import PaintingsPageContent from "./PaintingsPageContent";

export default function PaintingsPage() {
  return (
    <Suspense
      fallback={
        <div
          className="paintings-studio"
          style={{ minHeight: "100vh", background: "#c4bfb8" }}
        />
      }
    >
      <PaintingsPageContent />
    </Suspense>
  );
}
