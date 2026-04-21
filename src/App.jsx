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

const placeholderImages = Array.from({ length: 7 }, (_, i) => ({
  src: `https://placehold.co/1280x720?text=Photo+${i + 1}`,
  alt: `Placeholder ${i + 1}`,
}));

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
          <ZoomParallax images={placeholderImages} />
        </section>
      )}
    </div>
  );
}

export default App;
