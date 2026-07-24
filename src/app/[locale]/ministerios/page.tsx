import { BookOpen, Music, Clock } from 'lucide-react';
import MinistriesList from '@/components/ministerios/MinistriesList';
import CinematicHeader from '@/components/layout/CinematicHeader';
import JoinChurchModal from '@/components/mensaje/JoinChurchModal';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return { title: locale === 'es' ? 'Ministerios | Renuevo Church' : 'Ministries | Renuevo Church' };
}

export default async function MinistriesPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <div className="bg-primary-sand min-h-screen pb-32 text-primary-navy">
      {/* Header */}
      <CinematicHeader 
        title={isEs ? 'Nuestros Ministerios' : 'Our Ministries'}
        subtitle={isEs 
          ? 'Conéctate, crece y sirve. Tenemos un lugar especial para ti en nuestra familia.'
          : 'Connect, grow, and serve. We have a special place for you in our family.'}
        backgroundImageUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
      />

      {/* CTA Join Church */}
      <section className="pt-12 pb-4 px-6 text-center max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-primary-navy font-serif">
          {isEs ? '¿Quieres ser parte de nuestra familia?' : 'Would you like to join our church family?'}
        </h2>
        <p className="text-stone-600 mb-8 text-lg">
          {isEs 
            ? 'Nos encantaría conocerte y ayudarte a encontrar tu lugar.' 
            : 'We would love to meet you and help you find your place.'}
        </p>
        <JoinChurchModal isEs={isEs} />
      </section>

      {/* General Sections: Estudio Bíblico y Alabanza */}
      <section className="pt-8 pb-32 px-6 container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white border border-stone-200 p-12 rounded-2xl hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:border-accent-gold transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-primary-sand text-accent-gold flex items-center justify-center rounded-full mb-8 shadow-md border border-stone-200 group-hover:scale-110 transition-transform duration-500">
              <BookOpen className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-3xl font-bold mb-6 font-serif text-primary-navy tracking-tight group-hover:text-accent-gold transition-colors">{isEs ? 'Estudio Bíblico' : 'Bible Study'}</h2>
            <p className="text-stone-600 mb-10 leading-relaxed font-medium text-lg">
              {isEs 
                ? 'Creemos que la Palabra de Dios transforma. Únete a nuestros grupos de estudio para profundizar en las Escrituras, hacer preguntas y aplicar la Biblia a tu vida diaria.'
                : 'We believe God\'s Word transforms. Join our study groups to dive deep into Scripture, ask questions, and apply the Bible to your daily life.'}
            </p>
            <div className="mb-10 flex items-center justify-center gap-2 text-stone-500 font-medium bg-stone-50 py-3 px-6 rounded-full w-full">
              <Clock className="w-5 h-5 text-accent-gold" />
              <span>{isEs ? 'Miércoles, 6:00 PM' : 'Wednesdays, 6:00 PM'}</span>
            </div>
            <blockquote className="border-l-4 border-accent-gold pl-6 text-primary-navy italic font-serif text-xl font-bold leading-tight">
              {isEs 
                ? '"Toda la Escritura es inspirada por Dios y es útil para enseñarnos lo que es verdad y para hacernos ver lo que está mal en nuestra vida." — 2 Timoteo 3:16 (NTV)'
                : '"All Scripture is inspired by God and is useful to teach us what is true and to make us realize what is wrong in our lives." — 2 Timothy 3:16 (NLT)'}
            </blockquote>
          </div>
          
          <div className="bg-white border border-stone-200 p-12 rounded-2xl hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:border-accent-gold transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-primary-sand text-accent-gold flex items-center justify-center rounded-full mb-8 shadow-md border border-stone-200 group-hover:scale-110 transition-transform duration-500">
              <Music className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-3xl font-bold mb-6 font-serif text-primary-navy tracking-tight group-hover:text-accent-gold transition-colors">{isEs ? '¿Cómo Alabar a Dios?' : 'How to Praise God?'}</h2>
            <p className="text-stone-600 mb-10 leading-relaxed font-medium text-lg">
              {isEs 
                ? 'Alabar a Dios es un estilo de vida, no solo música. A través del canto, la gratitud y la obediencia diaria, expresamos nuestro asombro por todo lo que Él ha hecho por nosotros.'
                : 'Praising God is a lifestyle, not just music. Through song, gratitude, and daily obedience, we express our awe for everything He has done for us.'}
            </p>
            <blockquote className="border-l-4 border-accent-gold pl-6 text-primary-navy italic font-serif text-xl font-bold leading-tight">
              {isEs 
                ? '"Que todo lo que respira alabe al Señor. ¡Aleluya! ¡Alabado sea el Señor!" — Salmo 150:6 (NTV)'
                : '"Let everything that breathes sing praises to the Lord! Praise the Lord!" — Psalm 150:6 (NLT)'}
            </blockquote>
          </div>
        </div>
      </section>

      {/* Specific Ministries List (Client Component) */}
      <MinistriesList locale={locale} />
    </div>
  );
}
