'use client';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const [optimisticLocale, setOptimisticLocale] = useState(locale);

  // Sync optimistic locale if server sends a new one
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
    
    // Instantly move the pill and change text color for smooth UI feedback
    setOptimisticLocale(targetLocale);
    
    // Use hard navigation to guarantee server returns the fresh translated payload
    // without running into Next.js App Router client-side cache bugs.
    // The delay ensures the user sees the pill slide before the page reloads.
    const newPath = getPath(targetLocale);
    setTimeout(() => {
      window.location.href = newPath;
    }, 150);
  };

  const isEsActive = optimisticLocale === 'es';

  return (
    <div className={`relative flex items-center rounded-full p-1 border transition-colors ${
      isScrolled ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20'
    }`} title="Cambiar idioma / Change language">
      
      {/* Physical Sliding Pill - Guaranteed to render and animate */}
      <div 
        className="absolute top-1 bottom-1 w-[38px] rounded-full bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ 
          left: isEsActive ? '4px' : '42px',
        }} 
      />

      {/* Buttons */}
      <button 
        onClick={() => switchLocale('es')}
        className={`relative z-10 w-[38px] text-center py-1 rounded-full text-xs font-bold transition-colors duration-300 ${
          isEsActive 
            ? 'text-primary-navy'
            : (isScrolled ? 'text-stone-500 hover:text-stone-800' : 'text-stone-300 hover:text-white')
        }`}
      >
        ES
      </button>

      <button 
        onClick={() => switchLocale('en')}
        className={`relative z-10 w-[38px] text-center py-1 rounded-full text-xs font-bold transition-colors duration-300 ${
          !isEsActive 
            ? 'text-primary-navy'
            : (isScrolled ? 'text-stone-500 hover:text-stone-800' : 'text-stone-300 hover:text-white')
        }`}
      >
        EN
      </button>
    </div>
  );
}
