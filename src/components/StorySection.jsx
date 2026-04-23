import { motion } from "framer-motion";
import Polaroid from "./Polaroid";
import "./StorySection.css";

import imgRow1 from "../assets/IMG_2569.jpg";
import imgRow2 from "../assets/IMG_5179.jpg";
import imgRow3 from "../assets/IMG_4345.jpg";
import imgRow4 from "../assets/IMG_9625.JPG";
import imgRow5 from "../assets/IMG_2479.jpg";
import imgRow6 from "../assets/IMG_5153.jpg";
import imgRow7 from "../assets/IMG_4861.jpg";
import imgRow8 from "../assets/IMG_4684.jpg";

const ROWS = [
  {
    side: "left",
    src: imgRow1,
    alt: "placeholder",
    rotation: -3,
    tapeColor: "rgba(255, 182, 193, 0.65)",
    text: "Happy birthday beaver. I hope you like this cute little website that I made.",
  },
  {
    side: "right",
    src: imgRow2,
    alt: "placeholder",
    rotation: 2.5,
    tapeColor: "rgba(170, 210, 185, 0.65)",
    text: "Here's to making more fun memories together...",
  },
  {
    side: "left",
    src: imgRow3,
    alt: "placeholder",
    rotation: -1.5,
    tapeColor: "rgba(255, 218, 140, 0.65)",
    text: "... and having all the goofy moments with you",
  },
  {
    side: "right",
    rowAlign: "right",
    src: imgRow4,
    alt: "placeholder",
    rotation: 3,
    tapeColor: "rgba(180, 195, 235, 0.65)",
    text: "May you always be the sweet & caring girl I came to know",
  },
  {
    side: "left",
    rowAlign: "right",
    src: imgRow5,
    alt: "placeholder",
    rotation: -2,
    tapeColor: "rgba(210, 185, 230, 0.65)",
    text: "From the first moment that I saw you...",
  },
  {
    side: "right",
    rowAlign: "right",
    src: imgRow6,
    alt: "placeholder",
    rotation: 1.5,
    tapeColor: "rgba(255, 195, 165, 0.65)",
    text: "... up 'til now...",
  },
  {
    side: "left",
    rowAlign: "left",
    src: imgRow7,
    alt: "placeholder",
    rotation: 1.5,
    tapeColor: "rgba(255, 195, 165, 0.65)",
    text: "I love you b...",
  },
  {
    side: "right",
    rowAlign: "right",
    src: imgRow8,
    alt: "placeholder",
    rotation: 1.5,
    tapeColor: "rgba(255, 195, 165, 0.65)",
    text: "...and have a most wondrous birthday",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.18 },
  },
};

export default function StorySection() {
  return (
    <section className="story-section">
      {ROWS.map(({ side, rowAlign, src, alt, rotation, tapeColor, text }, i) => {
        const polaroid = (
          <Polaroid key="p" src={src} alt={alt} rotation={rotation} slideFrom={side} tapeColor={tapeColor} />
        );
        const textBlock = (
          <motion.p
            key="t"
            className="story-text"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true, margin: "-80px" }}
          >
            {text}
          </motion.p>
        );

        return (
          <div className={`story-row${rowAlign === "right" ? " story-row--right" : ""}`} key={i}>
            {side === "left" ? [polaroid, textBlock] : [textBlock, polaroid]}
          </div>
        );
      })}
    </section>
  );
}
