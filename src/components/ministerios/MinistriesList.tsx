'use client';
import { motion, Variants } from 'motion/react';

export default function MinistriesList({ locale }: { locale: string }) {
  const isEs = locale === 'es';

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="container mx-auto px-6 max-w-6xl">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-4xl md:text-5xl font-bold mb-6 text-primary-navy tracking-tight font-serif"
        >
          {isEs ? 'Encuentra tu lugar' : 'Find your place'}
        </motion.h2>
        <div className="w-16 h-1 bg-accent-gold mx-auto" />
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {/* Hombres */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Valientes</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Ministerio de Hombres' : 'Men\'s Ministry'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Formando hombres íntegros, padres amorosos y líderes que impacten su hogar y sociedad guiados por el Espíritu Santo.'
              : 'Forming men of integrity, loving fathers, and leaders who impact their home and society guided by the Holy Spirit.'}
          </p>
        </motion.div>

        {/* Mujeres */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Mujer Sabia</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Ministerio de Mujeres' : 'Women\'s Ministry'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Un espacio para fortalecer el corazón de la mujer, crecer en sabiduría bíblica y apoyarse mutuamente en cada etapa de la vida.'
              : 'A space to strengthen the heart of a woman, grow in biblical wisdom, and support each other in every stage of life.'}
          </p>
        </motion.div>

        {/* Jóvenes */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Renuevo Youth</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Ministerio de Jóvenes' : 'Youth Ministry'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Una generación apasionada por Jesús. Descubre tu propósito, construye amistades sanas y sé luz en tu escuela y universidad.'
              : 'A generation passionate about Jesus. Discover your purpose, build healthy friendships, and be a light in your school and college.'}
          </p>
        </motion.div>

        {/* Alabanza */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Alabanza</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Ministerio Musical' : 'Worship Ministry'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Un equipo dedicado a guiar a la iglesia en adoración profunda cada fin de semana. Si tocas un instrumento o cantas, ¡únete!'
              : 'A team dedicated to leading the church in deep worship every weekend. If you play an instrument or sing, join us!'}
          </p>
        </motion.div>

        {/* Danzores */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Danzores</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Artes Creativas' : 'Creative Arts'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Adoramos con todo nuestro ser. El ministerio de danza expresa libertad, gozo y reverencia a través del movimiento.'
              : 'We worship with our whole being. The dance ministry expresses freedom, joy, and reverence through movement.'}
          </p>
        </motion.div>

        {/* Niños */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Renuevo Kids</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Ministerio Infantil' : 'Kids Ministry'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Enseñando a los más pequeños a amar a Jesús en un ambiente seguro, divertido y adaptado a su edad.'
              : 'Teaching the little ones to love Jesus in a safe, fun environment tailored to their age.'}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
