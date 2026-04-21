import React, { useRef, useState, useEffect } from "react";
import "./SlideToUnlock.css";

/**
 * SlideToUnlock
 * ------------------------------------------------------------------
 * Apple-style slide-to-unlock with velocity-based flick detection.
 *
 * KEY IMPLEMENTATION NOTE:
 * All mutable drag state lives in refs, NOT in useState. This is
 * critical because pointer events fire asynchronously relative to
 * React's render cycle. If the pointerup handler closes over stale
 * useState values (especially `x`), it computes incorrect progress
 * and velocity, causing the thumb to freeze mid-track.
 *
 * The single `useState(renderTick)` is bumped inside rAF solely to
 * trigger re-renders so the DOM reflects the current ref values.
 */
export default function SlideToUnlock({
  label = "Open for your surprise 🦫",
  onUnlock = () => {},
  width = 340,
  height = 64,
  resetKey = 0,
  positionThreshold = 0.92,
  velocityThreshold = 0.9,
  velocityMinProgress = 0.35,
}) {
  const thumbSize = height - 8;
  const maxTravel = width - thumbSize - 8;

  // ---- ALL mutable state in refs (no stale closures) ----
  const xRef = useRef(0);
  const draggingRef = useRef(false);
  const unlockedRef = useRef(false);
  const startPointerX = useRef(0);
  const startX = useRef(0);
  const rafId = useRef(null);
  const samples = useRef([]);
  const SAMPLE_WINDOW_MS = 80;

  // Render trigger — the ONLY useState for the slider's visual state.
  const [, setTick] = useState(0);
  const rerender = () => setTick((t) => t + 1);

  // NEW – tracks whether the component should be removed from the DOM
  const [removed, setRemoved] = useState(false);

  // Re-arm
  useEffect(() => {
    xRef.current = 0;
    draggingRef.current = false;
    unlockedRef.current = false;
    samples.current = [];
    rerender();
  }, [resetKey]);

  const clamp = (v) => Math.max(0, Math.min(maxTravel, v));

  const pushSample = (pos) => {
    const now = performance.now();
    samples.current.push({ x: pos, t: now });
    const cutoff = now - SAMPLE_WINDOW_MS;
    while (samples.current.length > 2 && samples.current[0].t < cutoff) {
      samples.current.shift();
    }
  };

  const computeVelocity = () => {
    const s = samples.current;
    if (s.length < 2) return 0;
    const first = s[0];
    const last = s[s.length - 1];
    const dt = last.t - first.t;
    if (dt <= 0) return 0;
    return (last.x - first.x) / dt;
  };

  // ---- Pointer handlers read/write ONLY refs ----

  const handlePointerDown = (e) => {
    if (unlockedRef.current) return;
    const pointerX = e.touches ? e.touches[0].clientX : e.clientX;
    startPointerX.current = pointerX;
    startX.current = xRef.current;
    samples.current = [{ x: xRef.current, t: performance.now() }];
    draggingRef.current = true;
    rerender();
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current || unlockedRef.current) return;
    const pointerX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = pointerX - startPointerX.current;
    const next = clamp(startX.current + delta);
    xRef.current = next;
    pushSample(next);
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(rerender);
  };

  const handlePointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const velocity = computeVelocity();
    const progress = xRef.current / maxTravel;

    const crossedByPosition = progress >= positionThreshold;
    const crossedByFlick =
      velocity >= velocityThreshold && progress >= velocityMinProgress;

    if (crossedByPosition || crossedByFlick) {
      xRef.current = maxTravel;
      unlockedRef.current = true;
      onUnlock(crossedByPosition ? "position" : "flick");
    } else {
      // ALWAYS snap back — never leave thumb mid-track.
      xRef.current = 0;
    }

    samples.current = [];
    rerender();
  };

  // Global listeners: stable refs mean no dependency churn.
  useEffect(() => {
    const move = (e) => handlePointerMove(e);
    const up = () => handlePointerUp();

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
    window.addEventListener("touchcancel", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
      window.removeEventListener("touchcancel", up);
    };
  }, [maxTravel, onUnlock, positionThreshold, velocityThreshold, velocityMinProgress]);

  // ---- Derived values for render ----
  const x = xRef.current;
  const dragging = draggingRef.current;
  const unlocked = unlockedRef.current;
  const progress = maxTravel > 0 ? x / maxTravel : 0;

  const settlingForward = !dragging && unlocked;
  const thumbTransition = dragging
    ? "none"
    : settlingForward
    ? "transform 220ms cubic-bezier(0.2, 0.9, 0.3, 1)"
    : "transform 380ms cubic-bezier(0.34, 1.3, 0.64, 1)";
  const fillTransition = dragging
    ? "none"
    : settlingForward
    ? "width 220ms cubic-bezier(0.2, 0.9, 0.3, 1)"
    : "width 380ms cubic-bezier(0.34, 1.3, 0.64, 1)";

  const fillWidth = x + thumbSize / 2 + 4;

  // NEW – remove component from DOM after fade-out animation finishes
  if (removed) return null;

  return (
    <div className="stu-root" style={{ width, height, position: "relative" }}>
      <div
        className="stu-track"
        style={{ width, height }}
        onAnimationEnd={(e) => {
          if (e.animationName === "stu-fadeout") {
            setRemoved(true);
          }
        }}
      >
        <div
          className="stu-fill"
          style={{
            width: fillWidth,
            transition: fillTransition,
            opacity: unlocked ? 0.95 : 0.85,
          }}
        />
        <div
          className="stu-label"
          style={{ opacity: Math.max(0, 1 - progress * 1.6) }}
        >
          <span className="stu-label-text">{label}</span>
        </div>
        <button
          type="button"
          aria-label={label}
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          role="slider"
          disabled={unlocked}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          className={`stu-thumb ${dragging ? "is-dragging" : ""} ${
            unlocked ? "is-unlocked" : ""
          }`}
          style={{
            width: thumbSize,
            height: thumbSize,
            transform: `translate3d(${x}px, 0, 0)`,
            transition: thumbTransition,
          }}
        >
          <svg
            viewBox="0 0 24 24" width="18" height="18"
            fill="none" stroke="currentColor" strokeWidth="2.25"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}