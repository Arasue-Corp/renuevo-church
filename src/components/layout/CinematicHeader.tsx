'use client';
import { motion } from 'motion/react';

interface CinematicHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImageUrl?: string;
}

export default function CinematicHeader({ title, subtitle, backgroundImageUrl }: CinematicHeaderProps) {
  return (
    <header className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-primary-sand mt-0 pt-20">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {backgroundImageUrl ? (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 animate-[slowPan_20s_ease-in-out_infinite_alternate]"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-primary-navy" />
        )}
        {/* Warm Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(248,246,240,0.4)_0%,_rgba(248,246,240,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-sand via-primary-sand/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-sand/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-navy tracking-tight drop-shadow-sm mb-6"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-stone-600 font-medium tracking-wide max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
        
        {/* Decorative divider */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="w-24 h-[2px] bg-accent-gold mt-12 shadow-[0_0_15px_rgba(212,175,55,0.6)]"
        />
      </div>

      {/* Bottom fade out to connect to next section cleanly */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-sand to-transparent z-10 pointer-events-none" />
    </header>
  );
}
