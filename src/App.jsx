import { useCallback, useState } from "react";
import SlideToUnlock from "./components/SlideToUnlock";
import Typewriter from "./components/Typewriter";
import ZoomParallax from "./components/ZoomParallax";
import StorySection from "./components/StorySection";
import BirthdayStickers from "./components/BirthdayStickers";
import "./App.css";

const lines = [
  "Today's your special day...",
  "Happy Birthday my love!",
  "My beaver"
];

const images = [
  { src: "../src/assets/42EE20B2-6EF3-47B8-AC82-B35989C9BE63.jpg", alt: "bellis" },
  { src: "../src/assets/IMG_8894.jpg", alt: "img2" },
  { src: "../src/assets/IMG_9625.jpg", alt: "img3" },
  { src: "../src/assets/IMG_1051.jpg", alt: "img4" },
  { src: "../src/assets/IMG_1356.jpg", alt: "img5" },
  { src: "../src/assets/09503132-0100-49B3-9475-6DB3982A8776.jpg", alt: "img6" },
  { src: "../src/assets/IMG_4486.jpg", alt: "img7" },
];

function App() {
  const [unlockDone, setUnlockDone] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [stickersVisible, setStickersVisible] = useState(false);

  const handleTypingComplete = useCallback(() => setTypingDone(true), []);
  const handleLineComplete = useCallback((index) => {
    if (index === 1) setStickersVisible(true);
  }, []);

  return (
    <div className="app">
      <section className="hero">
        <SlideToUnlock onRemoved={() => setUnlockDone(true)} />
        {unlockDone && (
          <Typewriter
            lines={lines}
            onComplete={handleTypingComplete}
            onLineComplete={handleLineComplete}
          />
        )}
        {stickersVisible && <BirthdayStickers />}
        {typingDone && (
          <a href="#parallax" className="scroll-hint" aria-label="Scroll down">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        )}
      </section>

      {typingDone && (
        <>
          <section id="parallax">
            <ZoomParallax images={images} />
          </section>
          <StorySection />
        </>
      )}
    </div>
  );
}

export default App;
