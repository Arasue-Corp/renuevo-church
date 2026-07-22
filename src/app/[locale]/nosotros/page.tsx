import { BookOpen, Users, Heart } from 'lucide-react';
import CinematicHeader from '@/components/layout/CinematicHeader';
import StaffSection from '@/components/nosotros/StaffSection';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return { title: locale === 'es' ? 'Acerca de Nosotros | Renuevo Church' : 'About Us | Renuevo Church' };
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <div className="bg-primary-sand min-h-screen pb-32 text-primary-navy">
      <CinematicHeader 
        title={isEs ? 'Nuestra Historia' : 'Our Story'}
        subtitle={isEs 
          ? 'Somos una comunidad que ama a Dios, ama a las personas y sirve al mundo.'
          : 'We are a community that loves God, loves people, and serves the world.'}
        backgroundImageUrl="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
      />

      <section className="py-32 px-6 container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-3 gap-16 text-center">
          <div className="flex flex-col items-center group">
            <div className="w-24 h-24 glass-cinematic rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.15)] group-hover:border-accent-gold transition-colors duration-500">
              <BookOpen className="w-10 h-10 stroke-[1.5] text-accent-gold" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-primary-navy font-serif">{isEs ? 'Nuestra Misión' : 'Our Mission'}</h2>
            <p className="text-stone-700 leading-relaxed font-medium text-lg">
              {isEs 
                ? 'Amar a Dios, hacer discípulos y plantar iglesias saludables que transformen comunidades con el evangelio.'
                : 'To love God, make disciples, and plant healthy churches that transform communities with the gospel.'}
            </p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-24 h-24 glass-cinematic rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.15)] group-hover:border-accent-gold transition-colors duration-500">
              <Users className="w-10 h-10 stroke-[1.5] text-accent-gold" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-primary-navy font-serif">{isEs ? 'Nuestra Visión' : 'Our Vision'}</h2>
            <p className="text-stone-700 leading-relaxed font-medium text-lg">
              {isEs 
                ? 'Ver vidas restauradas y transformadas por el mensaje de Jesús a través de relaciones genuinas.'
                : 'To see lives restored and transformed by the message of Jesus through genuine relationships.'}
            </p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-24 h-24 glass-cinematic rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.15)] group-hover:border-accent-gold transition-colors duration-500">
              <Heart className="w-10 h-10 stroke-[1.5] text-accent-gold" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-primary-navy font-serif">{isEs ? 'Nuestros Valores' : 'Our Values'}</h2>
            <p className="text-stone-700 leading-relaxed font-medium text-lg">
              {isEs 
                ? 'La autoridad de la Biblia, la vida guiada por el Espíritu, y una profunda compasión por los necesitados.'
                : 'The authority of the Bible, Spirit-led living, and deep compassion for those in need.'}
            </p>
          </div>
        </div>
      </section>

      <StaffSection isEs={isEs} />

      <section className="py-32 border-t border-stone-200 relative">
        <div className="absolute inset-0 bg-primary-navy/5 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-navy tracking-tight font-serif">
              {isEs ? 'Lo Que Creemos' : 'What We Believe'}
            </h2>
            <div className="w-16 h-1 bg-accent-gold mx-auto" />
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-10 md:p-12 rounded-2xl shadow-xl shadow-stone-200/50 hover:shadow-2xl border border-stone-200 hover:border-accent-gold/50 transition-all duration-300">
              <h3 className="text-3xl font-bold text-primary-navy mb-4 font-serif">{isEs ? 'Dios' : 'God'}</h3>
              <p className="text-stone-600 text-lg leading-relaxed font-medium">
                {isEs 
                  ? 'Creemos en un solo Dios, creador de todo, santo, infinitamente perfecto y eternamente existente en una unidad de amor de tres personas: Padre, Hijo y Espíritu Santo.'
                  : 'We believe in one God, creator of all things, holy, infinitely perfect, and eternally existing in a loving unity of three equally divine Persons: the Father, the Son and the Holy Spirit.'}
              </p>
            </div>
            <div className="bg-white p-10 md:p-12 rounded-2xl shadow-xl shadow-stone-200/50 hover:shadow-2xl border border-stone-200 hover:border-accent-gold/50 transition-all duration-300">
              <h3 className="text-3xl font-bold text-primary-navy mb-4 font-serif">{isEs ? 'La Biblia' : 'The Bible'}</h3>
              <p className="text-stone-600 text-lg leading-relaxed font-medium">
                {isEs 
                  ? 'Creemos que Dios ha hablado en las Escrituras, tanto en el Antiguo como en el Nuevo Testamento, a través de autores humanos. Es la máxima autoridad para nuestra fe y vida diaria.'
                  : 'We believe that God has spoken in the Scriptures, both Old and New Testaments, through human authors. It is the ultimate authority for our faith and daily living.'}
              </p>
            </div>
            <div className="bg-white p-10 md:p-12 rounded-2xl shadow-xl shadow-stone-200/50 hover:shadow-2xl border border-stone-200 hover:border-accent-gold/50 transition-all duration-300">
              <h3 className="text-3xl font-bold text-primary-navy mb-4 font-serif">{isEs ? 'La Iglesia Metodista Libre' : 'The Free Methodist Church'}</h3>
              <p className="text-stone-600 text-lg leading-relaxed font-medium">
                {isEs 
                  ? 'Somos parte de la Iglesia Metodista Libre, un movimiento global comprometido a proclamar el mensaje de salvación por fe y a vivir la vida de gracia y santidad que Cristo nos enseñó.'
                  : 'We are part of the Free Methodist Church, a global movement committed to proclaiming the message of salvation by faith and living the life of grace and holiness Christ taught us.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
