// src/components/Globe3D.jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Globe3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let rotation = 0;
    const dpr = window.devicePixelRatio || 1; // Store DPR once

    const resize = () => {
      // Use parent bounds for sizing to avoid layout shifts if canvas has padding/margins
      const rect = canvas.parentElement.getBoundingClientRect(); 
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr); // Only scale once on resize
    };

    resize(); // Initial size calculation
    window.addEventListener('resize', resize);

    const draw = () => {
      // Use scaled dimensions directly
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const centerX = w / 2;
      const centerY = h / 2;
      const radius = Math.min(w, h) * 0.35;

      ctx.save(); // Save context state
      ctx.clearRect(0, 0, w, h); // Clear using scaled dimensions

      // Draw globe sphere
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, 'rgba(37, 99, 235, 0.3)');
      gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.15)');
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0.05)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw latitude lines
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.3)';
      ctx.lineWidth = 1 / dpr; // Adjust line width for DPR

      for (let i = -2; i <= 2; i++) {
        const y = centerY + (i * radius * 0.4);
        const latRadius = Math.sqrt(Math.max(0, radius * radius - Math.pow(i * radius * 0.4, 2))); // Ensure non-negative under sqrt
        
        ctx.beginPath();
        // Use ellipse for perspective effect
        ctx.ellipse(centerX, y, latRadius, latRadius * 0.2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw longitude lines
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI + rotation; // Draw only half for efficiency (front-facing)
        
        ctx.beginPath();
        // Use ellipse for perspective effect
        ctx.ellipse(centerX, centerY, radius * Math.abs(Math.cos(angle)), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw light trails (flight paths)
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
      ctx.lineWidth = 2 / dpr; // Adjust line width for DPR
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(250, 204, 21, 0.5)';
      
      for (let i = 0; i < 3; i++) {
        const offset = (rotation * 2 + i * Math.PI * 0.6) % (Math.PI * 2);
        const startAngle = offset;
        const endAngle = offset + Math.PI * 0.3;
        const trailRadius = radius * (0.8 + i * 0.05); // Vary radius slightly

        ctx.beginPath();
        ctx.arc(centerX, centerY, trailRadius, startAngle, endAngle);
        ctx.stroke();

        // Glow point at the end of the trail
        const glowX = centerX + Math.cos(endAngle) * trailRadius;
        const glowY = centerY + Math.sin(endAngle) * trailRadius;
        
        const glowGradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 8 / dpr);
        glowGradient.addColorStop(0, 'rgba(250, 204, 21, 0.8)');
        glowGradient.addColorStop(1, 'rgba(250, 204, 21, 0)');
        
        ctx.beginPath();
        ctx.arc(glowX, glowY, 8 / dpr, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }

      ctx.restore(); // Restore context state (clears shadow)

      rotation += 0.003;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw(); // Start animation

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-full h-full" // Ensure parent has dimensions
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }} // Style for layout
      />
    </motion.div>
  );
}