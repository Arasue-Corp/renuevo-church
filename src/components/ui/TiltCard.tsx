'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for rotation
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform mouse position into rotation angles
  // Rotate up to 15 degrees in any direction
  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);

  // Dynamic glare effect based on mouse position
  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);
  const glareOpacity = useTransform(smoothY, [0, 1], [0.1, 0.4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the card (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div 
      style={{ perspective: 1200 }} 
      className={`relative w-full ${className}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: isHovered ? undefined : 0,
          rotateY: isHovered ? undefined : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className="relative w-full rounded-[2.5rem] bg-stone-900/50 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Dynamic Glare Overlay */}
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none rounded-[2.5rem]"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
            opacity: isHovered ? glareOpacity : 0,
            mixBlendMode: "overlay"
          }}
          animate={{ opacity: isHovered ? undefined : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Actual Content (pushed forward in Z-space) */}
        <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
