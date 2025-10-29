// src/components/GradientButton.jsx
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function GradientButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false
}) {
  const variants = {
    primary: {
      bg: 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF]',
      glow: 'rgba(37, 99, 235, 0.6)',
      hoverGlow: 'rgba(37, 99, 235, 0.8)',
    },
    secondary: {
      bg: 'bg-gradient-to-r from-[#FACC15] to-[#F59E0B]',
      glow: 'rgba(250, 204, 21, 0.6)',
      hoverGlow: 'rgba(250, 204, 21, 0.8)',
    },
    ghost: {
      bg: 'bg-white/5 border border-white/10',
      glow: 'rgba(255, 255, 255, 0.1)',
      hoverGlow: 'rgba(255, 255, 255, 0.2)',
    }
  };

  const style = variants[variant] || variants.primary;

  return (
    <div className="relative group">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 -m-1 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: style.glow }}
      />
      
      {/* Button */}
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={`relative z-10 px-8 py-4 ${style.bg} text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        style={{
          boxShadow: `0 4px 20px ${style.glow}`,
        }}
      >
        <motion.span
          className="relative z-10"
          animate={{
            textShadow: [
              '0 0 8px rgba(255,255,255,0.3)',
              '0 0 12px rgba(255,255,255,0.5)',
              '0 0 8px rgba(255,255,255,0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.span>
      </motion.button>
    </div>
  );
}

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};