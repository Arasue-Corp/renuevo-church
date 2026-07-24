'use client';
import { motion, Variants } from 'motion/react';
import { Clock } from 'lucide-react';

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
              : 'Equipping men of integrity and loving fathers to lead and impact their communities through the Holy Spirit.'}
          </p>
          <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-3 text-stone-500 font-medium">
            <Clock className="w-5 h-5 text-accent-gold shrink-0" />
            <span>{isEs ? 'Lunes, 7:00 PM' : 'Mondays, 7:00 PM'}</span>
          </div>
        </motion.div>

        {/* Mujeres */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Mujer Sabia</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Ministerio de Mujeres' : 'Women\'s Ministry'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Un espacio para fortalecer el corazón de la mujer, crecer en sabiduría bíblica y apoyarse mutuamente en cada etapa de la vida.'
              : 'A community empowering women to grow in biblical wisdom and support one another through every season of life.'}
          </p>
          <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-3 text-stone-500 font-medium">
            <Clock className="w-5 h-5 text-accent-gold shrink-0" />
            <span>{isEs ? 'Lunes, 7:00 PM' : 'Mondays, 7:00 PM'}</span>
          </div>
        </motion.div>

        {/* Jóvenes */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Renuevo Youth</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Ministerio de Jóvenes' : 'Youth Ministry'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Una generación apasionada por Jesús. Descubre tu propósito, construye amistades sanas y sé luz en tu escuela y universidad.'
              : 'A generation passionate about Jesus. Discover your purpose, build healthy friendships, and be a light in your school and community.'}
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
              : 'Worshipping with our whole being. The dance ministry expresses freedom, joy, and reverence to God through movement.'}
          </p>
        </motion.div>

        {/* Niños */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Renuevo Kids</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Ministerio Infantil' : 'Kids Ministry'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Enseñando a los más pequeños a amar a Jesús en un ambiente seguro, divertido y adaptado a su edad.'
              : 'Teaching our little ones to love Jesus in a safe, engaging environment tailored to their age.'}
          </p>
        </motion.div>

        {/* Matrimonios */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Matrimonios</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Ministerio de Matrimonios' : 'Marriage Ministry'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Fortaleciendo la unión matrimonial a través de principios bíblicos para construir familias sólidas y hogares llenos de amor.'
              : 'Strengthening the marriage bond through biblical principles to build solid families and homes full of love.'}
          </p>
          <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-3 text-stone-500 font-medium">
            <Clock className="w-5 h-5 text-accent-gold shrink-0" />
            <span>{isEs ? 'Último lunes del mes, 6:00 PM' : 'Last Monday of the month, 6:00 PM'}</span>
          </div>
        </motion.div>

        {/* Vigilia */}
        <motion.div variants={item} className="group bg-white p-10 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent-gold/20 hover:border-accent-gold border border-stone-200">
          <h3 className="text-3xl font-bold mb-2 font-serif text-primary-navy group-hover:text-accent-gold transition-colors">Vigilia</h3>
          <p className="text-accent-gold text-xs font-bold mb-6 uppercase tracking-widest">{isEs ? 'Oración y Búsqueda' : 'Prayer & Seeking'}</p>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs 
              ? 'Noches dedicadas a buscar el rostro de Dios, interceder por necesidades y experimentar Su presencia de manera sobrenatural.'
              : 'Nights dedicated to seeking God\'s face, interceding for needs, and experiencing His presence in a supernatural way.'}
          </p>
          <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-3 text-stone-500 font-medium">
            <Clock className="w-5 h-5 text-accent-gold shrink-0" />
            <span>{isEs ? 'Último viernes del mes, 7:00 PM' : 'Last Friday of the month, 7:00 PM'}</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
