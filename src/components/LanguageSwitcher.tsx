'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useState, useTransition, useEffect } from 'react';

export default function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [optimisticLocale, setOptimisticLocale] = useState(locale);

  // Sync optimistic locale if server sends a new one (e.g., initial load or completed nav)
  useEffect(() => {
    setOptimisticLocale(locale);
  }, [locale]);

  const getPath = (targetLocale: string) => {
    const segments = pathname.split('/');
    if (segments[1] === 'es' || segments[1] === 'en') {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }
    return segments.join('/') || '/';
  };

  const switchLocale = (targetLocale: string) => {
    if (optimisticLocale === targetLocale) return;
    
    // Instantly move the pill and change text color
    setOptimisticLocale(targetLocale);
    
    const newPath = getPath(targetLocale);
    
    // Smooth navigation avoiding white flashes, but forcing data refetch
    startTransition(() => {
      router.replace(newPath);
      router.refresh();
    });
  };

  return (
    <div className={`relative flex items-center rounded-full p-1 border transition-colors ${
      isScrolled ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20'
    }`} title="Cambiar idioma / Change language">
      
      {['es', 'en'].map((lang) => {
        const isActive = optimisticLocale === lang;
        
        return (
          <button 
            key={lang}
            onClick={() => switchLocale(lang)}
            disabled={isPending}
            className={`relative z-10 w-10 text-center py-1 rounded-full text-xs font-bold transition-colors duration-300 ${
              isActive 
                ? 'text-primary-navy'
                : (isScrolled ? 'text-stone-500 hover:text-stone-800' : 'text-stone-300 hover:text-white')
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-locale-pill"
                className="absolute inset-0 rounded-full bg-white shadow-sm -z-10"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            {lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
