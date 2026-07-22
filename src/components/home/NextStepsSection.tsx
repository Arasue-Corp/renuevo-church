'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Users, HeartHandshake, BookOpen, ArrowRight } from 'lucide-react';

export default function NextStepsSection({ locale }: { locale: string }) {
  const isEs = locale === 'es';

  const steps = [
    {
      title: isEs ? 'Conéctate' : 'Connect',
      desc: isEs ? 'Encuentra tu lugar en nuestra familia a través de nuestros grupos de conexión.' : 'Find your place in our family through our connection groups.',
      icon: Users,
      link: `/${locale}/ministerios`,
      linkText: isEs ? 'Ver Grupos' : 'View Groups',
    },
    {
      title: isEs ? 'Crece' : 'Grow',
      desc: isEs ? 'Aprende y profundiza en tu fe con nuestras clases de discipulado y recursos.' : 'Learn and deepen your faith with our discipleship classes and resources.',
      icon: BookOpen,
      link: `/${locale}/mensajes`,
      linkText: isEs ? 'Ver Recursos' : 'View Resources',
    },
    {
      title: isEs ? 'Sirve' : 'Serve',
      desc: isEs ? 'Descubre tu propósito sirviendo a Dios y a nuestra comunidad con tus talentos.' : 'Discover your purpose by serving God and our community with your talents.',
      icon: HeartHandshake,
      link: `/${locale}/ministerios`,
      linkText: isEs ? 'Únete al Equipo' : 'Join the Team',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="bg-primary-sand py-24 md:py-32 relative border-t border-stone-200">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-accent-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-gold font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            {isEs ? 'Tu Siguiente Paso' : 'Your Next Step'}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy font-serif"
          >
            {isEs ? 'No fuiste creado para vivir solo' : 'You were not made to live alone'}
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="group bg-white p-10 rounded-3xl border border-stone-200 hover:border-accent-gold/50 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-stone-200 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Subtle background decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-gold/10 rounded-full blur-2xl group-hover:bg-accent-gold/20 transition-colors duration-500" />
              
              <div className="w-20 h-20 bg-primary-sand rounded-2xl shadow-sm border border-stone-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10 group-hover:border-accent-gold/30">
                <step.icon className="w-10 h-10 text-accent-gold" />
              </div>
              
              <h3 className="text-2xl font-bold text-primary-navy font-serif mb-4 relative z-10">
                {step.title}
              </h3>
              
              <p className="text-stone-600 font-medium leading-relaxed mb-10 flex-grow relative z-10">
                {step.desc}
              </p>
              
              <Link 
                href={step.link}
                className="inline-flex items-center gap-2 text-primary-navy font-bold tracking-widest uppercase text-xs hover:text-accent-gold transition-colors relative z-10 group/link"
              >
                {step.linkText}
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
