import { Suspense } from "react";

import OthersPageContent from "./OthersPageContent";

export default function OthersPage() {
  return (
    <Suspense
      fallback={
        <div
          className="paintings-studio"
          style={{ minHeight: "100vh", background: "#c4bfb8" }}
        />
      }
    >
      <OthersPageContent />
    </Suspense>
  );
}
