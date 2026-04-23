import { useCallback, useState } from "react";
import SlideToUnlock from "./components/SlideToUnlock";
import Typewriter from "./components/Typewriter";
import ZoomParallax from "./components/ZoomParallax";
import StorySection from "./components/StorySection";
import BirthdayStickers from "./components/BirthdayStickers";
import "./App.css";

import imgParallax1 from "./assets/42EE20B2-6EF3-47B8-AC82-B35989C9BE63.jpg";
import imgParallax2 from "./assets/IMG_8894.jpg";
import imgParallax3 from "./assets/IMG_9625.JPG";
import imgParallax4 from "./assets/IMG_1051.jpg";
import imgParallax5 from "./assets/IMG_1356.JPG";
import imgParallax6 from "./assets/09503132-0100-49B3-9475-6DB3982A8776.jpg";
import imgParallax7 from "./assets/IMG_4486.jpg";

const lines = [
  "Today's your special day...",
  "Happy Birthday my love!",
  "My beaver"
];

const images = [
  { src: imgParallax1, alt: "bellis" },
  { src: imgParallax2, alt: "img2" },
  { src: imgParallax3, alt: "img3" },
  { src: imgParallax4, alt: "img4" },
  { src: imgParallax5, alt: "img5" },
  { src: imgParallax6, alt: "img6" },
  { src: imgParallax7, alt: "img7" },
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
