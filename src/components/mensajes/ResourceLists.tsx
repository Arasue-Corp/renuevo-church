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
      <section className="py-24 px-6 container mx-auto max-w-6xl relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-white border-b-2 pb-6 border-accent-gold inline-block font-serif tracking-tight">
          {isEs ? 'Últimos Sermones' : 'Latest Sermons'}
        </h2>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-12"
        >
          {sermons.map((sermon: any) => (
            <motion.div key={sermon._id} variants={item} className="glass-cinematic p-10 md:p-12 rounded-2xl hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:border-accent-gold transition-all duration-300 flex flex-col justify-between group">
              <div>
                <p className="text-xs font-bold text-accent-gold mb-4 tracking-widest uppercase">
                  {new Date(sermon.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif leading-tight group-hover:text-accent-gold transition-colors">
                  {isEs ? sermon.title : (sermon.titleEn || sermon.title)}
                </h3>
                {(sermon.mainVerse || sermon.mainVerseEn) && (
                  <blockquote className="border-l-4 border-accent-gold pl-6 text-stone-300 italic font-serif mb-10 text-xl leading-relaxed">
                    {isEs ? sermon.mainVerse : (sermon.mainVerseEn || sermon.mainVerse)}
                  </blockquote>
                )}
              </div>
              <div>
                {sermon.videoUrl ? (
                  <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer" className="relative inline-flex justify-center items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-primary-navy transition-all overflow-hidden w-full sm:w-auto">
                    <Play className="w-5 h-5" />
                    <span className="relative z-10">{isEs ? 'Ver Mensaje' : 'Watch Message'}</span>
                  </a>
                ) : (
                  <button className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-white/5 text-stone-500 rounded-xl font-bold text-sm tracking-widest uppercase cursor-not-allowed w-full sm:w-auto border border-white/10">
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
      <section className="py-24 px-6 container mx-auto max-w-6xl border-t border-stone-800 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-white border-b-2 pb-6 border-accent-gold inline-block font-serif tracking-tight">
          {isEs ? 'Devocionales' : 'Devotionals'}
        </h2>
        
        {devotionals.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {devotionals.map((dev: any) => (
              <motion.div key={dev._id} variants={item} className="glass-cinematic rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-accent-gold transition-all duration-300 group">
                <div className="h-60 bg-white/5 relative overflow-hidden border-b border-white/10">
                  {dev.imageUrl ? (
                    <img src={dev.imageUrl} alt={dev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <BookOpen className="w-12 h-12 opacity-30 stroke-[1.5]" />
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <p className="text-xs font-bold text-accent-gold uppercase tracking-widest mb-3">
                    {new Date(dev.publishedAt).toLocaleDateString(locale)}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-4 font-serif leading-tight group-hover:text-accent-gold transition-colors">
                    {isEs ? dev.title : (dev.titleEn || dev.title)}
                  </h3>
                  {dev.author && (
                    <p className="text-xs text-stone-500 font-bold tracking-widest uppercase">POR {dev.author}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center p-20 glass-cinematic rounded-2xl">
            <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-6 stroke-[1.5]" />
            <p className="text-stone-400 font-medium text-xl max-w-md mx-auto leading-relaxed">
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
