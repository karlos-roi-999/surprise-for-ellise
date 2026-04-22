import { useCallback, useState } from "react";
import SlideToUnlock from "./components/SlideToUnlock";
import Typewriter from "./components/Typewriter";
import ZoomParallax from "./components/ZoomParallax";
import "./App.css";

const lines = [
  "Today's your special day...",
  "Happy Birthday my love!",
  "My beaver"
];

const images = [
  { src: "../src/assets/IMG_9625.jpg", alt: "bellisima" },
  { src: "../src/assets/IMG_5179.jpg", alt: "bellisima" },
  { src: "../src/assets/IMG_5179.jpg", alt: "bellisima" },
  { src: "../src/assets/IMG_5179.jpg", alt: "bellisima" },
  { src: "../src/assets/IMG_5179.jpg", alt: "bellisima" },
  { src: "../src/assets/IMG_5179.jpg", alt: "bellisima" },
  { src: "../src/assets/IMG_5179.jpg", alt: "bellisima" },
]

function App() {
  const [unlockDone, setUnlockDone] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  const handleTypingComplete = useCallback(() => setTypingDone(true), []);

  return (
    <div className="app">
      <section className="hero">
        <SlideToUnlock onRemoved={() => setUnlockDone(true)} />
        {unlockDone && <Typewriter lines={lines} onComplete={handleTypingComplete} />}
        {typingDone && (
          <a href="#parallax" className="scroll-hint" aria-label="Scroll down">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        )}
      </section>

      {typingDone && (
        <section id="parallax">
          <ZoomParallax images={images} />
        </section>
      )}
    </div>
  );
}

export default App;
