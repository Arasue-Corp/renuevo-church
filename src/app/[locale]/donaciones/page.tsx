import { Smartphone, Mail, Heart } from 'lucide-react';
import TaxForm from '@/components/donaciones/TaxForm';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return { title: locale === 'es' ? 'Donaciones | Renuevo Church' : 'Give | Renuevo Church' };
}

export default async function DonationsPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-primary-navy selection:bg-accent-gold selection:text-white">
      
      {/* Hero Section - High Contrast (Navy & Gold) */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-primary-navy">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-gold via-primary-navy to-primary-navy" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent-gold mb-6 block">
              {isEs ? 'Generosidad' : 'Generosity'}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-serif text-white leading-[1.1]">
              {isEs ? 'Donde esté tu tesoro,' : 'Where your treasure is,'} <br />
              <span className="italic text-primary-sand font-medium">{isEs ? 'allí estará también tu corazón.' : 'there your heart will be also.'}</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 font-medium max-w-2xl mx-auto leading-relaxed">
              {isEs 
                ? 'Tu aporte nos permite seguir conectando corazones, restaurando vidas y compartiendo el mensaje de Jesús con nuestra ciudad.'
                : 'Your giving allows us to keep connecting hearts, restoring lives, and sharing the message of Jesus with our city.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout - Warm & High Contrast */}
      <section className="container mx-auto px-6 max-w-6xl py-24 relative z-20 -mt-10">
        
        {/* Cheerful Giver Verse */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white p-10 md:p-14 rounded-3xl shadow-2xl shadow-stone-200/50 border border-stone-100 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Heart className="w-12 h-12 text-accent-gold mb-8 stroke-[1.5] relative z-10" />
            <blockquote className="text-primary-navy font-serif text-2xl md:text-3xl font-bold leading-relaxed italic mb-8 relative z-10">
              {isEs 
                ? '"Cada uno debe dar según lo que haya decidido en su corazón, no de mala gana ni por obligación, porque Dios ama al que da con alegría."'
                : '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."'}
            </blockquote>
            <cite className="text-accent-gold font-bold uppercase tracking-widest text-sm relative z-10">— {isEs ? '2 Corintios 9:7' : '2 Corinthians 9:7'}</cite>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Payment Methods Column */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="mb-10">
              <h2 className="text-4xl font-serif text-primary-navy font-bold mb-4">
                {isEs ? 'Formas de Dar' : 'Ways to Give'}
              </h2>
              <div className="w-16 h-1 bg-accent-gold" />
            </div>

            {/* Zelle */}
            <div className="group bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 transition-all hover:border-accent-gold/50 hover:shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-primary-sand border-2 border-transparent flex items-center justify-center shrink-0 text-primary-navy group-hover:bg-accent-gold group-hover:text-white transition-colors">
                  <Smartphone className="w-8 h-8 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary-navy mb-3 tracking-tight">Zelle</h3>
                  <p className="text-stone-700 mb-6 font-medium text-base leading-relaxed">
                    {isEs ? 'Envía tu donación de forma segura directamente desde la app de tu banco usando nuestro número institucional.' : 'Securely send your contribution directly through your banking app using our institutional number.'}
                  </p>
                  <div className="inline-flex items-center gap-4 bg-primary-sand py-4 px-6 rounded-xl border border-stone-200">
                    <span className="text-stone-600 text-xs font-bold uppercase tracking-widest">{isEs ? 'Teléfono' : 'Phone'}</span>
                    <span className="text-primary-navy font-mono font-bold text-xl tracking-wide">480-440-0396</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Check */}
            <div className="group bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 transition-all hover:border-accent-gold/50 hover:shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-primary-sand border-2 border-transparent flex items-center justify-center shrink-0 text-primary-navy group-hover:bg-accent-gold group-hover:text-white transition-colors">
                  <Mail className="w-8 h-8 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary-navy mb-3 tracking-tight">
                    {isEs ? 'Cheque por Correo' : 'Check by Mail'}
                  </h3>
                  <p className="text-stone-700 mb-6 font-medium text-base leading-relaxed">
                    {isEs ? 'Haz tu cheque pagadero a "Renuevo Church" y envíalo a nuestra dirección postal en Arizona.' : 'Make your check payable to "Renuevo Church" and mail it to our Arizona address.'}
                  </p>
                  <div className="bg-primary-sand p-6 rounded-xl border border-stone-200">
                    <p className="text-stone-700 font-mono font-medium leading-relaxed text-base">
                      Renuevo Church<br/>
                      <span className="text-primary-navy font-bold text-lg block mt-1">6331 W Lamar Rd</span>
                      Glendale, AZ 85301
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Tax Form Column */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
            <div className="sticky top-32">
              <TaxForm locale={locale} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
