// src/components/GlassCard.jsx
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  glowColor = '#2563EB',
  delay = 0
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? {
        y: -6,
        transition: { duration: 0.3 }
      } : {}}
      className={`relative backdrop-blur-2xl bg-white/[0.08] border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.37)] ${className}`}
      style={{
        boxShadow: glow
          ? `0 8px 32px rgba(0,0,0,0.37), 0 0 40px ${glowColor}33`
          : '0 8px 32px rgba(0,0,0,0.37)'
      }}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom glow line */}
      {glow && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full opacity-50 blur-sm"
          style={{ backgroundColor: glowColor }}
        />
      )}
    </motion.div>
  );
}

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  glow: PropTypes.bool,
  glowColor: PropTypes.string,
  delay: PropTypes.number,
};