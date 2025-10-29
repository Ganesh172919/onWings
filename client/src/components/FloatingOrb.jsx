// src/components/FloatingOrb.jsx
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function FloatingOrb({ size = 200, color = '#2563EB', delay = 0, top, left, right, bottom }) {
  return (
    <motion.div
      animate={{
        y: [0, -30, 0],
        x: [0, 20, -10, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute pointer-events-none -z-10"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
      }}
    >
      <div
        className="w-full h-full rounded-full opacity-20 blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

FloatingOrb.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  delay: PropTypes.number,
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};