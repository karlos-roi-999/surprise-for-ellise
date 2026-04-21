import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./ZoomParallax.css";

const SCALE_FACTORS = [4, 5, 6, 5, 6, 8, 9];

export default function ZoomParallax({ images }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale0 = useTransform(scrollYProgress, [0, 1], [1, SCALE_FACTORS[0]]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, SCALE_FACTORS[1]]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, SCALE_FACTORS[2]]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, SCALE_FACTORS[3]]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, SCALE_FACTORS[4]]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, SCALE_FACTORS[5]]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, SCALE_FACTORS[6]]);
  const scales = [scale0, scale1, scale2, scale3, scale4, scale5, scale6];

  return (
    <div ref={container} className="zp-container">
      <div className="zp-sticky">
        {images.map(({ src, alt }, index) => (
          <motion.div
            key={index}
            style={{ scale: scales[index % scales.length] }}
            className={`zp-item zp-item-${index}`}
          >
            <div className="zp-frame">
              <img
                src={src}
                alt={alt || `Parallax image ${index + 1}`}
                className="zp-image"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
