'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Store, ArrowRight, Building2, Briefcase } from 'lucide-react';

export default function DirectoryPreview({ locale }: { locale: string }) {
  const isEs = locale === 'es';

  const previewCategories = [
    {
      title: isEs ? 'Gastronomía' : 'Food & Dining',
      icon: Store,
      count: 12
    },
    {
      title: isEs ? 'Servicios' : 'Services',
      icon: Briefcase,
      count: 24
    },
    {
      title: isEs ? 'Inmobiliaria' : 'Real Estate',
      icon: Building2,
      count: 8
    }
  ];

  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden border-t border-stone-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent-gold font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              {isEs ? 'Comunidad Emprendedora' : 'Entrepreneurial Community'}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy font-serif"
            >
              {isEs ? 'Apoya a nuestra familia' : 'Support our family'}
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href={`/${locale}/directorio`}
              className="group inline-flex items-center justify-center px-8 py-4 bg-primary-navy text-white hover:bg-stone-800 transition-colors rounded-xl font-bold tracking-widest uppercase text-sm shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]" />
              <span className="relative z-10">{isEs ? 'Ver Catálogo Completo' : 'View Full Directory'}</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {previewCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
            >
              <Link 
                href={`/${locale}/directorio`} 
                className="group flex items-center justify-between p-8 rounded-3xl border border-stone-200 bg-primary-sand shadow-lg hover:shadow-xl hover:border-accent-gold/50 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-stone-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:border-accent-gold/30">
                    <category.icon className="w-8 h-8 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-navy font-serif mb-1">
                      {category.title}
                    </h3>
                    <p className="text-stone-500 font-medium">
                      {category.count} {isEs ? 'negocios' : 'businesses'}
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-accent-gold transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
