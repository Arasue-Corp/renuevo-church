'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });
  
  const navLinks = [
    { name: locale === 'es' ? 'Inicio' : 'Home', path: `/${locale}` },
    { name: locale === 'es' ? 'Nosotros' : 'About', path: `/${locale}/nosotros` },
    { name: locale === 'es' ? 'El Mensaje' : 'The Message', path: `/${locale}/mensaje` },
    { name: locale === 'es' ? 'Ministerios' : 'Ministries', path: `/${locale}/ministerios` },
    { name: locale === 'es' ? 'Recursos' : 'Resources', path: `/${locale}/mensajes` },
    { name: locale === 'es' ? 'Directorio' : 'Directory', path: `/${locale}/directorio` },
  ];

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pb-2 pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className={`pointer-events-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
            isScrolled 
              ? 'w-full max-w-5xl glass-cinematic rounded-full px-6 py-3'
              : 'w-full max-w-7xl bg-transparent px-2 py-4 rounded-none border-transparent'
          }`}
        >
          {/* Logo */}
          <Link href={`/${locale}`} className="relative z-20 flex items-center gap-1 transition-colors duration-300 text-white hover:text-stone-200">
            <span className="font-serif font-bold text-2xl tracking-tighter">RENUEVO</span>
            <span className="font-sans font-bold tracking-widest text-[10px] mt-1 text-accent-gold">CHURCH</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center relative z-20 text-stone-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || pathname === `${link.path}/`;
              const isHovered = hoveredPath === link.path;
              
              return (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative px-5 py-2 text-sm font-bold tracking-wide transition-colors duration-300 ${
                    isActive || isHovered ? 'text-white' : 'text-stone-300'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Hover Pill */}
                  {isHovered && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  
                  {/* Active Indicator (Dot) */}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-gold"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <div className="ml-4 pl-4 border-l border-stone-400/30 flex items-center gap-4">
              <LanguageSwitcher />
              <Link 
                href={`/${locale}/donaciones`} 
                className={`text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full transition-all ${
                  isScrolled 
                    ? 'bg-accent-gold text-primary-navy hover:bg-white shadow-md hover:shadow-lg' 
                    : 'bg-white text-primary-navy hover:bg-stone-100 shadow-lg'
                }`}
              >
                {locale === 'es' ? 'Donar' : 'Give'}
              </Link>
            </div>
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center gap-4 relative z-20 text-white">
            <LanguageSwitcher />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 focus:outline-none transition-transform hover:scale-110 active:scale-95"
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/90 md:hidden"
          >
            <div className="flex flex-col h-full pt-32 px-8 pb-12">
              <nav className="flex flex-col gap-6 flex-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.path || pathname === `${link.path}/`;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link 
                        href={link.path} 
                        onClick={() => setIsOpen(false)}
                        className={`block text-4xl font-serif tracking-tight transition-colors ${
                          isActive ? 'text-accent-gold font-bold' : 'text-white hover:text-stone-300'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto"
              >
                <Link 
                  href={`/${locale}/donaciones`} 
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center w-full py-5 bg-primary-navy text-accent-gold rounded-2xl font-bold text-sm tracking-widest uppercase shadow-xl"
                >
                  {locale === 'es' ? 'Donar Ahora' : 'Give Now'}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
