import { motion } from "framer-motion";
import "./BirthdayStickers.css";

const STICKERS = [
  { emoji: "🎂", left: "10%",  top: "35%", rotate: -18, from: { x: -520, y: -380, rotate: -110 }, delay: 0    },
  { emoji: "🎉", left: "84%",  top: "30%", rotate:  14, from: { x:  520, y: -420, rotate:  105 }, delay: 0.10 },
  { emoji: "🎈", left: "7%",   top: "60%", rotate:   7, from: { x: -560, y: -180, rotate:   85 }, delay: 0.20 },
  { emoji: "🦫", left: "87%",  top: "56%", rotate: -13, from: { x:  490, y: -280, rotate:  -95 }, delay: 0.07 },
  { emoji: "✨", left: "23%",  top: "27%", rotate:  -7, from: { x: -310, y: -520, rotate:   65 }, delay: 0.16 },
  { emoji: "🎊", left: "74%",  top: "63%", rotate:  21, from: { x:  410, y: -240, rotate:  -85 }, delay: 0.26 },
  { emoji: "🎁", left: "17%",  top: "70%", rotate: -21, from: { x: -430, y: -140, rotate:   75 }, delay: 0.33 },
];

export default function BirthdayStickers() {
  return (
    <div className="birthday-stickers" aria-hidden="true">
      {STICKERS.map(({ emoji, left, top, rotate, from, delay }, i) => (
        <motion.span
          key={i}
          className="birthday-sticker"
          style={{ left, top }}
          initial={{ x: from.x, y: from.y, rotate: from.rotate, scale: 0.55, opacity: 0 }}
          animate={{
            x: 0,
            y: 0,
            rotate,
            scale: [0.55, 1.18, 0.88, 1.07, 0.98, 1],
            opacity: 1,
          }}
          transition={{
            x:       { type: "spring", stiffness: 290, damping: 22, delay },
            y:       { type: "spring", stiffness: 290, damping: 22, delay },
            rotate:  { type: "spring", stiffness: 200, damping: 15, delay: delay + 0.04 },
            opacity: { duration: 0.1, delay },
            scale:   { duration: 0.55, times: [0, 0.38, 0.55, 0.72, 0.88, 1], ease: "easeOut", delay: delay + 0.06 },
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}
