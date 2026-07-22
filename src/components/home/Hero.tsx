'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero({ locale }: { locale: string }) {
  const isEs = locale === 'es';
  
  // Cinematic text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary-sand text-primary-navy">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Usamos un iframe de YouTube para garantizar que siempre reproduzca sin problemas de CORS.
            Para cambiar el video, simplemente cambia el ID de YouTube en el src y en el parámetro playlist.
            Actualmente usando un video placeholder 4K.
        */}
        <iframe
          src="https://www.youtube.com/embed/vlwHFitriQ4?autoplay=1&mute=1&loop=1&playlist=vlwHFitriQ4&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&start=374"
          className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-60"
          allow="autoplay; encrypted-media"
          frameBorder="0"
          tabIndex={-1}
        />
        
        {/* Warm Overlays (Vignette + Bottom Gradient) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(248,246,240,0.2)_0%,_rgba(248,246,240,0.6)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-sand via-primary-sand/40 to-transparent opacity-100" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center mt-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-accent-gold/40 bg-white/60 backdrop-blur-md text-accent-gold text-xs font-bold tracking-[0.3em] uppercase shadow-sm">
              {isEs ? 'Una Iglesia para la Ciudad' : 'A Church for the City'}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter mb-6 font-serif leading-[0.95] text-primary-navy"
          >
            {isEs ? 'Bienvenido a' : 'Welcome'} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-yellow-600 to-accent-gold">
              {isEs ? 'Casa.' : 'Home.'}
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-3xl text-stone-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {isEs 
              ? <>Un lugar para encontrar gracia, esperanza y propósito en <span className="italic font-serif text-primary-navy font-medium">Jesús</span>.</>
              : <>A place to find grace, hope, and purpose in <span className="italic font-serif text-primary-navy font-medium">Jesus</span>.</>}
          </motion.p>
          
          {/* Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-gold to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <Link 
                href={`/${locale}/directorio`} 
                className="relative inline-flex justify-center items-center px-10 py-5 bg-primary-navy text-white font-bold text-sm tracking-widest uppercase rounded-xl hover:bg-stone-800 transition-all transform group-hover:-translate-y-1 shadow-xl"
              >
                {isEs ? 'Conoce nuestra comunidad' : 'Meet our community'}
              </Link>
            </div>
            
            <Link 
              href={`/${locale}/donaciones`} 
              className="group relative inline-flex justify-center items-center px-10 py-5 bg-white border border-stone-200 text-primary-navy font-bold text-sm tracking-widest uppercase rounded-xl hover:border-accent-gold transition-all shadow-md overflow-hidden hover:shadow-lg"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-stone-100 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]" />
              <span className="relative z-10">{isEs ? 'Apoya nuestra misión' : 'Support our mission'}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-navy">
          {isEs ? 'Descubre Más' : 'Discover More'}
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-accent-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
