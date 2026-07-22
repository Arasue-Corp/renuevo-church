'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    
    // We check if the pathname starts with the current locale, if so, we replace it
    let newPath = pathname;
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    } else {
      // If no locale in url (e.g. root '/'), prepend the new one
      newPath = `/${nextLocale}${pathname === '/' ? '' : pathname}`;
    }
    
    router.push(newPath);
  };

  return (
    <div className={`flex items-center rounded-full p-1 border transition-colors ${
      isScrolled ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20'
    }`} title="Cambiar idioma / Change language">
      <button 
        onClick={() => locale !== 'es' && toggleLocale()}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          locale === 'es' 
            ? (isScrolled ? 'bg-white text-primary-navy shadow-sm' : 'bg-white text-primary-navy shadow-sm')
            : (isScrolled ? 'text-stone-500 hover:text-stone-800' : 'text-stone-300 hover:text-white')
        }`}
      >
        ES
      </button>
      <button 
        onClick={() => locale !== 'en' && toggleLocale()}
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
