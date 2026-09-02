'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function HombresDeAltarPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    // Delay popup to not overwhelm user immediately
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[70] w-[calc(100%-2rem)] md:w-96 overflow-hidden rounded-3xl bg-white text-primary-navy shadow-2xl border border-stone-200"
        >
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-700"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Decorative Background Header */}
            <div className="absolute inset-0 h-32 bg-primary-sand pointer-events-none border-b border-stone-100" />

            <div className="relative flex flex-col p-8 pt-10">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-gold"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-gold opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-gold"></span>
                </span>
                {locale === 'es' ? 'Próximo Evento' : 'Upcoming Event'}
              </motion.div>

              <h3 className="mb-2 font-serif text-3xl md:text-4xl font-bold leading-tight tracking-tight text-primary-navy">
                {locale === 'es' ? 'Congreso' : "Men's"}<br/>
                <span className="text-accent-gold">{locale === 'es' ? 'de varones' : "Congress"}</span>
              </h3>
              
              <p className="mb-6 text-sm text-stone-500">
                {locale === 'es' 
                  ? 'Un tiempo de transformación, propósito y hermandad.'
                  : "A time of transformation, purpose, and brotherhood."}
              </p>

              <div className="mb-8 flex items-center gap-3 rounded-2xl bg-stone-50 p-4 border border-stone-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {locale === 'es' ? 'Fecha' : 'Date'}
                  </p>
                  <p className="font-bold text-primary-navy">
                    {locale === 'es' ? '27 y 28 de Nov, 2026' : 'Nov 27 & 28, 2026'}
                  </p>
                </div>
              </div>

              <Link
                href={`/${locale}/hombres-de-altar`}
                onClick={closePopup}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary-navy py-4 text-sm font-bold tracking-widest text-accent-gold transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">
                  {locale === 'es' ? 'REGÍSTRATE AHORA' : 'REGISTER NOW'}
                </span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
