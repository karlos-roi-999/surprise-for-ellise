import { useEffect, useRef } from "react";
import "./Typewriter.css";

const TYPING_SPEED = 60;   // ms per character
const PAUSE_BETWEEN = 2000; // ms pause between lines

export default function Typewriter({ lines = [], onComplete, onLineComplete }) {
  const containerRef = useRef(null);
  // Keep a ref so the async loop always calls the latest callback without
  // it appearing in the effect's dependency array (which would cancel the
  // in-flight sequence on every re-render triggered by the callback itself).
  const onLineCompleteRef = useRef(onLineComplete);
  onLineCompleteRef.current = onLineComplete;

  useEffect(() => {
    if (!lines.length) return;
    let cancelled = false;

    async function typeEffect() {
      const divs = containerRef.current.querySelectorAll(".tw-line");

      // Reset all lines (fixes StrictMode double-mount duplicating characters)
      divs.forEach((div) => { div.textContent = ""; div.classList.remove("typing"); });

      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;

        const div = divs[i];
        div.classList.add("typing");

        for (let j = 0; j < lines[i].length; j++) {
          if (cancelled) return;
          div.textContent += lines[i].charAt(j);
          await new Promise((resolve) => setTimeout(resolve, TYPING_SPEED));
        }

        // Pause between lines (including after the last one before removing cursor)
        await new Promise((resolve) => setTimeout(resolve, PAUSE_BETWEEN));
        if (cancelled) return;

        div.classList.remove("typing");
        onLineCompleteRef.current?.(i);
      }

      if (!cancelled) onComplete?.();
    }

    typeEffect();
    return () => { cancelled = true; };
  }, [lines, onComplete]);

  return (
    <div ref={containerRef} className="typewriter-container">
      {lines.map((_, i) => (
        <div key={i} className="tw-line"></div>
      ))}
    </div>
  );
}
