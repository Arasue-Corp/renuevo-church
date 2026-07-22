'use client';
import { Play, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export function ResourceLists({ 
  locale, 
  sermons, 
  devotionals 
}: { 
  locale: string; 
  sermons: any[]; 
  devotionals: any[]; 
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
          {isEs ? 'Últimos Sermones' : 'Latest Sermons'}
        </h2>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sermons.map((sermon: any) => (
            <motion.div key={sermon._id} variants={item} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:border-accent-gold/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <p className="text-xs font-bold text-accent-gold mb-4 tracking-widest uppercase">
                  {new Date(sermon.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-primary-navy mb-6 font-serif leading-tight group-hover:text-accent-gold transition-colors">
                  {isEs ? sermon.title : (sermon.titleEn || sermon.title)}
                </h3>
                {(sermon.mainVerse || sermon.mainVerseEn) && (
                  <blockquote className="border-l-4 border-accent-gold pl-6 text-stone-600 italic font-serif mb-10 text-lg md:text-xl leading-relaxed">
                    {isEs ? sermon.mainVerse : (sermon.mainVerseEn || sermon.mainVerse)}
                  </blockquote>
                )}
              </div>
              <div className="mt-auto">
                {sermon.videoUrl ? (
                  <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer" className="relative inline-flex justify-center items-center gap-3 px-8 py-4 bg-primary-navy text-accent-gold rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors w-full sm:w-auto shadow-md">
                    <Play className="w-5 h-5" />
                    <span className="relative z-10">{isEs ? 'Ver Mensaje' : 'Watch Message'}</span>
                  </a>
                ) : (
                  <button className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-stone-100 text-stone-400 rounded-xl font-bold text-sm tracking-widest uppercase cursor-not-allowed w-full sm:w-auto border border-stone-200">
                    <Play className="w-5 h-5" />
                    {isEs ? 'Video no disponible' : 'Video unavailable'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
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
