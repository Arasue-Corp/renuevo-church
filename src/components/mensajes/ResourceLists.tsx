'use client';
import { Play, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

// Helper to get the Monday of a given date's week
function getMondayTime(dateString: string) {
  const d = new Date(dateString);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).setHours(0, 0, 0, 0);
}

export function ResourceLists({ 
  locale, 
  sermons, 
  verses,
  announcements
}: { 
  locale: string; 
  sermons: any[]; 
  verses: any[]; 
  announcements?: any[];
}) {
  const isEs = locale === 'es';
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

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

  // Group verses by week
  const groupedVerses = verses.reduce((acc, verse) => {
    const mondayTime = getMondayTime(verse.publishedAt);
    if (!acc[mondayTime]) acc[mondayTime] = [];
    acc[mondayTime].push(verse);
    return acc;
  }, {} as Record<number, any[]>);

  const weeks = Object.keys(groupedVerses).map(Number).sort((a, b) => b - a);
  const currentWeekVerses = weeks.length > 0 ? groupedVerses[weeks[currentWeekIndex]] : [];

  // Helper to get date string with capitalized day of week
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    // Capitalize the first letter (e.g. "Lunes, 3 de agosto" instead of "lunes...")
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const getWeekRangeLabel = (mondayTime: number) => {
    const start = new Date(mondayTime);
    const end = new Date(mondayTime);
    end.setDate(end.getDate() + 6);
    return `${start.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}`;
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
                <Link href={`/${locale}/anuncios/${ann.slug?.current || ann._id}`} className="flex flex-col h-full">
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
                </Link>
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

      {/* Verse of the Day History */}
      <section className="py-24 px-6 container mx-auto max-w-7xl border-t border-stone-200 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy border-b-2 pb-6 border-accent-gold font-serif">
            {isEs ? 'Versículos Anteriores' : 'Past Verses'}
          </h2>
          
          {weeks.length > 0 && (
            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-stone-200 shadow-sm">
              <button 
                onClick={() => setCurrentWeekIndex(Math.min(weeks.length - 1, currentWeekIndex + 1))}
                disabled={currentWeekIndex === weeks.length - 1}
                className="p-2 rounded-full hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title={isEs ? 'Semana anterior' : 'Previous week'}
              >
                <ChevronLeft className="w-5 h-5 text-primary-navy" />
              </button>
              
              <span className="text-sm font-bold text-primary-navy tracking-wide w-48 text-center uppercase">
                {getWeekRangeLabel(weeks[currentWeekIndex])}
              </span>
              
              <button 
                onClick={() => setCurrentWeekIndex(Math.max(0, currentWeekIndex - 1))}
                disabled={currentWeekIndex === 0}
                className="p-2 rounded-full hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title={isEs ? 'Semana siguiente' : 'Next week'}
              >
                <ChevronRight className="w-5 h-5 text-primary-navy" />
              </button>
            </div>
          )}
        </div>
        
        {weeks.length > 0 ? (
          <motion.div 
            key={currentWeekIndex} // Force re-animation on page change
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentWeekVerses.map((verse: any) => (
              <motion.div key={verse._id} variants={item} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:border-accent-gold/50 transition-all duration-300 group flex flex-col p-8">
                <div className="flex-grow flex flex-col justify-between relative z-10">
                  <div>
                    <p className="text-xs font-bold text-accent-gold uppercase tracking-widest mb-4">
                      {getFormattedDate(verse.publishedAt)}
                    </p>
                    <blockquote className="text-xl md:text-2xl font-serif italic text-primary-navy mb-4 leading-snug group-hover:text-stone-700 transition-colors">
                      &quot;{isEs ? verse.text : (verse.textEn || verse.text)}&quot;
                    </blockquote>
                  </div>
                  <p className="text-sm text-stone-500 font-bold tracking-widest uppercase mt-4">
                    — {isEs ? (verse.reference.includes('(RVR') ? verse.reference : `${verse.reference} (RVR1960)`) : ((verse.referenceEn || verse.reference).includes('(NIV') ? (verse.referenceEn || verse.reference) : `${(verse.referenceEn || verse.reference)} (NIV)`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center p-20 bg-white border border-stone-200 shadow-xl shadow-stone-200/50 rounded-3xl">
            <BookOpen className="w-16 h-16 text-primary-navy/20 mx-auto mb-6 stroke-[1.5]" />
            <p className="text-stone-500 font-medium text-xl max-w-md mx-auto leading-relaxed">
              {isEs 
                ? 'Próximamente publicaremos versículos diarios para fortalecer tu espíritu.' 
                : 'Daily verses to strengthen your spirit are coming soon.'}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
