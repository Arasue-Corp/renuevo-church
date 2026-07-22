import { Video } from 'lucide-react';

export default function LiveStreamSection({ locale }: { locale: string }) {
  const isEs = locale === 'es';
  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-6 bg-primary-sand text-primary-navy rounded-full mb-10 border border-stone-200">
            <Video className="w-12 h-12 stroke-[1.5]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-navy tracking-tight font-serif">
            {isEs ? 'Únete a nuestra transmisión' : 'Join our Live Stream'}
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mb-8" />
          <p className="text-xl text-stone-600 mb-12 leading-relaxed font-medium">
            {isEs 
              ? 'Compartimos el mensaje de Jesús todas las semanas. Si no puedes acompañarnos en persona, conéctate con nosotros a través de Facebook Live.'
              : 'We share the message of Jesus every week. If you cannot join us in person, connect with us via Facebook Live.'}
          </p>
          <a 
            href="https://facebook.com/RenuevoChurch.org/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#1877F2] text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-[#166FE5] transition-all shadow-xl hover:shadow-2xl"
          >
            <Video className="w-5 h-5" />
            {isEs ? 'Ver en Facebook' : 'Watch on Facebook'}
          </a>
        </div>
      </div>
    </section>
  );
}
