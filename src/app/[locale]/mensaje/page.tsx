export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return { title: locale === 'es' ? 'El Mensaje | Renuevo Church' : 'The Message | Renuevo Church' };
}

import JoinChurchModal from '@/components/mensaje/JoinChurchModal';

export default async function MessagePage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-navy text-white py-32 text-center px-6 relative overflow-hidden border-b-4 border-accent-gold">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-serif">
            {isEs ? 'El Regalo Más Grande' : 'The Greatest Gift'}
          </h1>
          <div className="w-24 h-1 bg-accent-gold mb-8" />
          <p className="text-2xl md:text-3xl font-bold italic text-stone-300 font-serif leading-relaxed">
            {isEs 
              ? '"Pues Dios amó tanto al mundo que dio a su único Hijo, para que todo el que crea en él no se pierda, sino que tenga vida eterna." — Juan 3:16 (NTV)'
              : '"For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life." — John 3:16 (NLT)'}
          </p>
        </div>
      </section>

      {/* The Gospel Steps */}
      <section className="py-32 px-6 container mx-auto max-w-5xl space-y-32">
        {/* Step 1: God's Love & Our Problem */}
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-navy font-serif leading-tight">{isEs ? '1. El Diseño Original y Nuestro Problema' : '1. God\'s Design & Our Brokenness'}</h2>
            <p className="text-lg text-stone-600 mb-8 font-medium leading-relaxed">
              {isEs
                ? 'Dios nos creó para tener una relación perfecta con Él. Sin embargo, todos hemos elegido nuestro propio camino y nos hemos separado de Él a causa del pecado.'
                : 'God created us to have a perfect relationship with Him. However, we have all chosen our own path and separated ourselves from Him because of sin.'}
            </p>
            <blockquote className="border-l-4 border-accent-gold pl-6 text-primary-navy italic font-serif text-xl font-bold">
              {isEs 
                ? '"Pues todos hemos pecado; nadie puede alcanzar la meta gloriosa establecida por Dios." — Romanos 3:23 (NTV)'
                : '"For everyone has sinned; we all fall short of God’s glorious standard." — Romans 3:23 (NLT)'}
            </blockquote>
          </div>
          <div className="md:w-1/2 bg-stone-200 h-80 rounded-2xl w-full flex items-center justify-center text-stone-500 overflow-hidden shadow-2xl border border-stone-200">
             <img src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2078&auto=format&fit=crop" alt="Creation" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Step 2: Jesus */}
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-navy font-serif leading-tight">{isEs ? '2. La Solución de Dios: Jesús' : '2. God\'s Solution: Jesus'}</h2>
            <p className="text-lg text-stone-600 mb-8 font-medium leading-relaxed">
              {isEs
                ? 'No podíamos ganar nuestro camino de regreso a Dios por nuestras buenas obras. Por eso, Dios vino a nosotros en la persona de Jesús, quien vivió una vida perfecta y pagó el precio de nuestros errores en la cruz.'
                : 'We could not earn our way back to God through good deeds. That is why God came to us in the person of Jesus, who lived a perfect life and paid the price for our mistakes on the cross.'}
            </p>
            <blockquote className="border-l-4 border-accent-gold pl-6 text-primary-navy italic font-serif text-xl font-bold">
              {isEs 
                ? '"Pero Dios mostró el gran amor que nos tiene al enviar a Cristo a morir por nosotros cuando todavía éramos pecadores." — Romanos 5:8 (NTV)'
                : '"But God showed his great love for us by sending Christ to die for us while we were still sinners." — Romans 5:8 (NLT)'}
            </blockquote>
          </div>
          <div className="md:w-1/2 bg-stone-200 h-80 rounded-2xl w-full flex items-center justify-center text-stone-500 overflow-hidden shadow-2xl border border-stone-200">
             <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop" alt="Cross" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Step 3: Our Response */}
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-navy font-serif leading-tight">{isEs ? '3. Tu Respuesta' : '3. Your Response'}</h2>
            <p className="text-lg text-stone-600 mb-8 font-medium leading-relaxed">
              {isEs
                ? 'La salvación es un regalo gratuito, pero debes elegir recibirlo. Esto significa creer que Jesús murió y resucitó por ti, y decidir seguirlo.'
                : 'Salvation is a free gift, but you must choose to receive it. This means believing Jesus died and rose again for you, and deciding to follow Him.'}
            </p>
            <blockquote className="border-l-4 border-accent-gold pl-6 text-primary-navy italic font-serif text-xl font-bold">
              {isEs 
                ? '"Dios los salvó por su gracia cuando creyeron. Ustedes no tienen ningún mérito en eso; es un regalo de Dios." — Efesios 2:8 (NTV)'
                : '"God saved you by his grace when you believed. And you can’t take credit for this; it is a gift from God." — Ephesians 2:8 (NLT)'}
            </blockquote>
          </div>
          <div className="md:w-1/2 bg-stone-200 h-80 rounded-2xl w-full flex items-center justify-center text-stone-500 overflow-hidden shadow-2xl border border-stone-200">
             <img src="https://images.unsplash.com/photo-1501862700950-18382cd41497?q=80&w=2019&auto=format&fit=crop" alt="Prayer" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* CTA / Prayer */}
      <section className="bg-primary-navy py-32 text-center px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-serif tracking-tight">{isEs ? '¿Quieres dar este paso hoy?' : 'Are you ready to take this step today?'}</h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mb-8" />
          <p className="text-xl text-stone-300 mb-12 font-medium leading-relaxed">
            {isEs 
              ? 'Puedes hablar con Dios ahora mismo usando tus propias palabras. Él te está escuchando. Si necesitas ayuda, aquí hay una oración sencilla:'
              : 'You can talk to God right now using your own words. He is listening. If you need help, here is a simple prayer:'}
          </p>
          <div className="bg-white p-10 md:p-14 rounded-2xl shadow-2xl text-center md:text-left max-w-2xl mx-auto mb-12 border border-stone-200 relative">
            <div className="absolute -top-6 -left-6 text-8xl text-accent-gold/20 font-serif leading-none">"</div>
            <p className="text-primary-navy italic text-2xl md:text-3xl font-bold leading-tight font-serif relative z-10">
              {isEs
                ? '"Amado Dios, reconozco que he pecado y me he separado de ti. Gracias por amarme tanto que enviaste a Jesús a morir en la cruz por mí y a resucitar para darme vida eterna. Te pido perdón por mis pecados y decido confiar en ti y seguirte desde hoy en adelante. En el nombre de Jesús, amén."'
                : '"Dear God, I recognize that I have sinned and separated myself from You. Thank You for loving me so much that You sent Jesus to die on the cross for me and to rise again to give me eternal life. I ask for Your forgiveness for my sins, and I choose to trust You and follow You from this day forward. In Jesus\' name, amen."'}
            </p>
          </div>
          <JoinChurchModal isEs={isEs} />
        </div>
      </section>
    </div>
  );
}
