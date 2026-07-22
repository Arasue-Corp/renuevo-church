'use client';
import { motion } from 'motion/react';
import { MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

export default function VisitUsSection({ locale }: { locale: string }) {
  const isEs = locale === 'es';

  return (
    <section className="bg-white py-32 relative overflow-hidden text-primary-navy border-t border-stone-200">
      {/* Cinematic subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-accent-gold/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-stone-300/50"
          >
            {/* Using a placeholder high-quality image from Unsplash for community/worship */}
            <Image 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop" 
              alt="Comunidad Renuevo" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(30,41,59,0.7)_100%)]" />
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-8 left-8 right-8 glass-warm p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-primary-navy font-serif mb-1">
                {isEs ? 'Una Familia para Ti' : 'A Family for You'}
              </h3>
              <p className="text-stone-700 text-sm font-medium">
                {isEs ? 'No importa tu trasfondo, aquí eres bienvenido.' : 'No matter your background, you are welcome here.'}
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
            className="flex flex-col"
          >
            <motion.span 
              className="text-accent-gold font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              {isEs ? 'Planea tu Visita' : 'Plan Your Visit'}
            </motion.span>
            
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy font-serif leading-tight mb-8"
            >
              {isEs ? 'Estás invitado este fin de semana' : "You're invited this weekend"}
            </motion.h2>

            <div className="space-y-10">
              {/* Time */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-navy/5 border border-primary-navy/10 flex items-center justify-center shrink-0 group-hover:border-accent-gold transition-colors shadow-[0_0_15px_rgba(212,175,55,0)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <Clock className="w-7 h-7 text-accent-gold" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-primary-navy font-serif mb-2 group-hover:text-accent-gold transition-colors">
                    {isEs ? 'Horarios de Servicio' : 'Service Times'}
                  </h4>
                  <p className="text-stone-700 font-medium text-lg">
                    {isEs ? 'Domingos a las 10:00 AM y 12:30 PM' : 'Sundays at 10:00 AM and 12:30 PM'}
                  </p>
                  <p className="text-stone-500 mt-1">
                    {isEs ? 'Servicio Bilingüe (Inglés y Español)' : 'Bilingual Service (English & Spanish)'}
                  </p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-navy/5 border border-primary-navy/10 flex items-center justify-center shrink-0 group-hover:border-accent-gold transition-colors shadow-[0_0_15px_rgba(212,175,55,0)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <MapPin className="w-7 h-7 text-accent-gold" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-primary-navy font-serif mb-2 group-hover:text-accent-gold transition-colors">
                    {isEs ? 'Ubicación' : 'Location'}
                  </h4>
                  <p className="text-stone-700 font-medium text-lg leading-relaxed">
                    6331 W Lamar Rd<br/>
                    Glendale, AZ 85301
                  </p>
                  <a 
                    href="https://maps.google.com/?q=6331+W+Lamar+Rd,+Glendale,+AZ+85301" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-accent-gold font-bold uppercase tracking-widest text-sm hover:text-primary-navy transition-colors"
                  >
                    {isEs ? 'Ver en Mapa →' : 'Get Directions →'}
                  </a>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
