'use client';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();

  const getPath = (targetLocale: string) => {
    if (locale === targetLocale) return pathname;
    
    const segments = pathname.split('/');
    if (segments[1] === 'es' || segments[1] === 'en') {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }
    
    return segments.join('/') || '/';
  };

  return (
    <div className={`relative flex items-center rounded-full p-1 border transition-colors ${
      isScrolled ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20'
    }`} title="Cambiar idioma / Change language">
      
      {['es', 'en'].map((lang) => {
        const isActive = locale === lang;
        
        return (
          <Link 
            key={lang}
            href={getPath(lang)}
            prefetch={false}
            replace
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
          </Link>
        );
      })}
    </div>
  );
}
