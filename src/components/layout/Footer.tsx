import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale();

  return (
    <footer className="bg-primary-navy text-stone-400 py-16 px-4 relative overflow-hidden border-t border-stone-800">
      {/* Warm glow in footer */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-gold/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-4 gap-12 border-b border-stone-800 pb-12 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter flex items-baseline">
              <span className="font-serif">RENUEVO</span>
              <span className="font-sans font-bold tracking-widest text-accent-gold text-sm ml-2">CHURCH</span>
            </h2>
            <p className="max-w-xs leading-relaxed text-sm text-stone-400 font-medium">
              {locale === 'es' 
                ? 'Conectando corazones, restaurando vidas y compartiendo el amor de Jesús con el mundo.'
                : 'Connecting hearts, restoring lives, and sharing the love of Jesus with the world.'}
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">
              {locale === 'es' ? 'Encuéntranos' : 'Find Us'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://maps.app.goo.gl/JdcbwqtThSHkqzVB9" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition flex items-start gap-2">
                  <span>📍</span> 
                  <span className="leading-snug">6331 W Lamar Rd,<br/>Glendale, AZ 85301</span>
                </a>
              </li>
              <li>
                <a href="tel:4804400396" className="hover:text-accent-gold transition flex items-center gap-2">
                  <span>📞</span> 
                  <span className="leading-snug">(480) 440-0396</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">
              {locale === 'es' ? 'Síguenos' : 'Follow Us'}
            </h3>
            <ul className="space-y-3 text-sm flex gap-4">
              <li><a href="https://www.facebook.com/RenuevoChurch.org/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition">Facebook</a></li>
              <li><a href="https://www.instagram.com/explore/locations/327161734132911/renuevo-church/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition">Instagram</a></li>
              <li><a href="https://www.youtube.com/@RenuevoChurchorg/featured" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Arasue Horizon. {locale === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href={`/${locale}/politicas`} className="hover:text-white transition">
              {locale === 'es' ? 'Privacidad' : 'Privacy'}
            </Link>
            <Link href={`/${locale}/terminos`} className="hover:text-white transition">
              {locale === 'es' ? 'Términos' : 'Terms'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
