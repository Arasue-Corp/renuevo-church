'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function MinistriesPreview({ locale }: { locale: string }) {
  const isEs = locale === 'es';

  const ministries = [
    {
      title: 'Renuevo Kids',
      desc: isEs ? 'Un ambiente seguro y divertido donde tus hijos aprenderán de Jesús.' : 'A safe and fun environment where your kids will learn about Jesus.',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2038&auto=format&fit=crop', // Kids placeholder
      link: `/${locale}/ministerios`,
    },
    {
      title: 'Renuevo Youth',
      desc: isEs ? 'Adolescentes y jóvenes encontrando su identidad en Cristo.' : 'Teens and youth finding their identity in Christ.',
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop', // Youth placeholder
      link: `/${locale}/ministerios`,
    },
    {
      title: isEs ? 'Grupos de Conexión' : 'Connection Groups',
      desc: isEs ? 'Comunidad auténtica para adultos, matrimonios y solteros.' : 'Authentic community for adults, couples, and singles.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop', // Adults placeholder
      link: `/${locale}/ministerios`,
    }
  ];

  return (
    <section className="bg-primary-sand py-24 md:py-32 relative overflow-hidden border-t border-stone-200">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent-gold font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              {isEs ? 'Para Toda la Familia' : 'For The Whole Family'}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy font-serif"
            >
              {isEs ? 'Hay un lugar para ti' : 'There is a place for you'}
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href={`/${locale}/ministerios`}
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-primary-navy hover:bg-stone-50 hover:text-accent-gold transition-colors rounded-xl font-bold tracking-widest uppercase text-sm border border-stone-200 shadow-md relative overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-stone-100 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]" />
              <span className="relative z-10">{isEs ? 'Ver todos los ministerios' : 'View all ministries'}</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {ministries.map((min, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
            >
              <Link href={min.link} className="group block relative h-[450px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-stone-900">
                <Image 
                  src={min.image} 
                  alt={min.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-3xl font-bold text-white font-serif mb-3">
                      {min.title}
                    </h3>
                    <p className="text-stone-300 font-medium leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {min.desc}
                    </p>
                    <div className="w-12 h-12 rounded-full bg-accent-gold flex items-center justify-center shadow-lg transform opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 delay-200">
                      <ArrowRight className="w-5 h-5 text-primary-navy stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
