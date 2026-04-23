import { motion } from "framer-motion";
import "./Polaroid.css";

export default function Polaroid({ src, alt, rotation = 0, slideFrom = "left", tapeColor }) {
  return (
    <motion.div
      className="polaroid-motion"
      initial={{ x: slideFrom === "left" ? -80 : 80, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 18 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div
        className="polaroid-frame"
        style={{ transform: `rotate(${rotation}deg)`, "--tape-color": tapeColor }}
      >
        <img src={src} alt={alt} className="polaroid-img" />
      </div>
    </motion.div>
  );
}
