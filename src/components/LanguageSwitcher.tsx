'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (targetLocale: string) => {
    if (locale === targetLocale) return;
    
    const segments = pathname.split('/');
    
    // segments[0] is always '' because pathname starts with '/'
    // segments[1] is typically the locale if it exists in the url
    if (segments[1] === 'es' || segments[1] === 'en') {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }
    
    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  return (
    <div className={`flex items-center rounded-full p-1 border transition-colors ${
      isScrolled ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20'
    }`} title="Cambiar idioma / Change language">
      <button 
        onClick={() => switchLocale('es')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          locale === 'es' 
            ? (isScrolled ? 'bg-white text-primary-navy shadow-sm' : 'bg-white text-primary-navy shadow-sm')
            : (isScrolled ? 'text-stone-500 hover:text-stone-800' : 'text-stone-300 hover:text-white')
        }`}
      >
        ES
      </button>
      <button 
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          locale === 'en' 
            ? (isScrolled ? 'bg-white text-primary-navy shadow-sm' : 'bg-white text-primary-navy shadow-sm')
            : (isScrolled ? 'text-stone-500 hover:text-stone-800' : 'text-stone-300 hover:text-white')
        }`}
      >
        EN
      </button>
    </div>
  );
}
