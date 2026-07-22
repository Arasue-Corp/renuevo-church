'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
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
    <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-full p-1 border border-black/10 dark:border-white/10" title="Cambiar idioma / Change language">
      <button 
        onClick={() => locale !== 'es' && toggleLocale()}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          locale === 'es' 
            ? 'bg-white dark:bg-primary-navy text-primary-navy dark:text-white shadow-sm' 
            : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200'
        }`}
      >
        ES
      </button>
      <button 
        onClick={() => locale !== 'en' && toggleLocale()}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          locale === 'en' 
            ? 'bg-white dark:bg-primary-navy text-primary-navy dark:text-white shadow-sm' 
            : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200'
        }`}
      >
        EN
      </button>
    </div>
  );
}
