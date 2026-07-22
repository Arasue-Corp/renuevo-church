'use client';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function JesusSection({ locale }: { locale: string }) {
  const isEs = locale === 'es';
  
  return (
    <section className="bg-primary-sand text-primary-navy py-32 px-6 relative overflow-hidden border-t border-stone-200">
      {/* Background Cinematic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-accent-gold/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center">
        <div className="mb-12 text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4 tracking-tight font-serif text-primary-navy"
          >
            {isEs ? 'Conoce a Jesús' : 'Know Jesus'}
          </motion.h2>
          <div className="w-16 h-1 bg-accent-gold" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-gradient-to-br from-[#F3F0E6] to-[#E3E0D6] p-10 md:p-16 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-stone-300 mb-12 w-full text-center md:text-left overflow-hidden"
        >
          {/* Inner card glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 blur-[50px] rounded-full pointer-events-none" />
          <blockquote className="text-2xl md:text-3xl font-bold italic text-primary-navy border-l-4 border-accent-gold pl-8 font-serif leading-tight">
            {isEs 
              ? '"Pues Dios amó tanto al mundo que dio a su único Hijo, para que todo el que crea en él no se pierda, sino que tenga vida eterna." — Juan 3:16 (NTV)'
              : '"For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life." — John 3:16 (NLT)'}
          </blockquote>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-stone-700 mb-12 text-center max-w-2xl leading-relaxed font-light"
        >
          {isEs 
            ? 'No importa tu pasado o tus errores, el amor de Dios es incondicional. Descubre el regalo de salvación y cómo una relación con Él puede restaurar tu vida.'
            : 'No matter your past or mistakes, God\'s love is unconditional. Discover the gift of salvation and how a relationship with Him can restore your life.'}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative group"
        >
          {/* Button glow aura */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-gold to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200" />
          <Link href={`/${locale}/mensaje`} className="relative flex justify-center items-center px-10 py-5 bg-primary-navy text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-stone-800 transition-all transform group-hover:-translate-y-1 shadow-xl">
            {isEs ? 'Descubre el Mensaje' : 'Discover the Message'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
