'use client';
import { Play, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export function ResourceLists({ 
  locale, 
  sermons, 
  devotionals,
  announcements
}: { 
  locale: string; 
  sermons: any[]; 
  devotionals: any[]; 
  announcements?: any[];
}) {
  const isEs = locale === 'es';

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <>
      {/* Sermons */}
      <section className="py-24 px-6 container mx-auto max-w-7xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-primary-navy border-b-2 pb-6 border-accent-gold inline-block font-serif">
          {isEs ? 'Últimos Servicios' : 'Latest Services'}
        </h2>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sermons.map((sermon: any, idx) => (
            <motion.div key={sermon.videoId || idx} variants={item} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:border-accent-gold/50 transition-all duration-300 flex flex-col group h-full">
              
              <div className="w-full aspect-video bg-stone-100 relative overflow-hidden">
                {sermon.thumbnailUrl ? (
                  <Image 
                    src={sermon.thumbnailUrl} 
                    alt={sermon.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                ) : (
                  <div className="absolute inset-0 bg-primary-navy opacity-10" />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {sermon.publishedAt && (
                  <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
                      {new Date(sermon.publishedAt).toLocaleDateString(isEs ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-primary-navy mb-3 font-serif leading-tight group-hover:text-accent-gold transition-colors line-clamp-2">
                  {sermon.title}
                </h3>
                
                <p className="text-stone-600 font-medium text-xs mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {sermon.description || (isEs ? 'Devocional semanal de Renuevo Church.' : 'Weekly devotional from Renuevo Church.')}
                </p>
                
                <a 
                  href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto relative inline-flex justify-center items-center gap-2 px-6 py-3 bg-primary-navy text-accent-gold rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-stone-800 transition-colors shadow-md w-full"
                >
                  <Play className="w-4 h-4" />
                  <span className="relative z-10">{isEs ? 'Ver Mensaje' : 'Watch'}</span>
                </a>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Announcements */}
      <section id="anuncios" className="py-24 px-6 container mx-auto max-w-7xl border-t border-stone-200 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-primary-navy border-b-2 pb-6 border-accent-gold inline-block font-serif">
          {isEs ? 'Anuncios' : 'Announcements'}
        </h2>
        
        {announcements && announcements.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {announcements.map((ann: any) => (
              <motion.div key={ann._id} variants={item} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:border-accent-gold/50 transition-all duration-300 group flex flex-col">
                <div className="h-60 bg-stone-100 relative overflow-hidden border-b border-stone-200">
                  {ann.imageUrl ? (
                    <img src={ann.imageUrl} alt={ann.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary-navy/20 bg-primary-sand">
                      <span className="text-sm font-bold tracking-widest uppercase">{isEs ? 'Anuncio' : 'Announcement'}</span>
                    </div>
                  )}
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-accent-gold uppercase tracking-widest mb-3">
                      {new Date(ann.publishedAt).toLocaleDateString(locale)}
                    </p>
                    <h3 className="text-2xl font-bold text-primary-navy mb-4 font-serif leading-tight group-hover:text-accent-gold transition-colors">
                      {isEs ? ann.title : (ann.titleEn || ann.title)}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center p-20 bg-white border border-stone-200 shadow-xl shadow-stone-200/50 rounded-3xl">
            <BookOpen className="w-16 h-16 text-primary-navy/20 mx-auto mb-6 stroke-[1.5]" />
            <p className="text-stone-500 font-medium text-xl max-w-md mx-auto leading-relaxed">
              {isEs 
                ? 'Próximamente publicaremos anuncios y noticias importantes.' 
                : 'Important announcements and news are coming soon.'}
            </p>
          </div>
        )}
      </section>

      {/* Devotionals */}
      <section className="py-24 px-6 container mx-auto max-w-7xl border-t border-stone-200 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-primary-navy border-b-2 pb-6 border-accent-gold inline-block font-serif">
          {isEs ? 'Devocionales' : 'Devotionals'}
        </h2>
        
        {devotionals.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {devotionals.map((dev: any) => (
              <motion.div key={dev._id} variants={item} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:border-accent-gold/50 transition-all duration-300 group flex flex-col">
                <div className="h-60 bg-stone-100 relative overflow-hidden border-b border-stone-200">
                  {dev.imageUrl ? (
                    <img src={dev.imageUrl} alt={dev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary-navy/20">
                      <BookOpen className="w-12 h-12 opacity-30 stroke-[1.5]" />
                    </div>
                  )}
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-accent-gold uppercase tracking-widest mb-3">
                      {new Date(dev.publishedAt).toLocaleDateString(locale)}
                    </p>
                    <h3 className="text-2xl font-bold text-primary-navy mb-4 font-serif leading-tight group-hover:text-accent-gold transition-colors">
                      {isEs ? dev.title : (dev.titleEn || dev.title)}
                    </h3>
                  </div>
                  {dev.author && (
                    <p className="text-xs text-stone-500 font-bold tracking-widest uppercase mt-4">POR {dev.author}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center p-20 bg-white border border-stone-200 shadow-xl shadow-stone-200/50 rounded-3xl">
            <BookOpen className="w-16 h-16 text-primary-navy/20 mx-auto mb-6 stroke-[1.5]" />
            <p className="text-stone-500 font-medium text-xl max-w-md mx-auto leading-relaxed">
              {isEs 
                ? 'Próximamente publicaremos reflexiones diarias para fortalecer tu espíritu.' 
                : 'Daily reflections to strengthen your spirit are coming soon.'}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
