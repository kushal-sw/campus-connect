import { useEffect, useRef } from "react";

export default function SplineBG() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById("spline-viewer-script")) return;

    const script = document.createElement("script");
    script.id = "spline-viewer-script";
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.12.16/build/spline-viewer.js";

    document.body.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none", // CRITICAL - allows clicks to pass through
        overflow: "hidden",
      }}
    >
      <spline-viewer
        url="https://prod.spline.design/SYGSVTxr8OldDfOm/scene.splinecode"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}