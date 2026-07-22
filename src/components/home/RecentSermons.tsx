'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { PlayCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function RecentSermons({ locale, sermons }: { locale: string, sermons: any[] }) {
  const isEs = locale === 'es';

  if (!sermons || sermons.length === 0) return null;

  return (
    <section className="bg-[#FAF9F6] py-24 md:py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent-gold font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              {isEs ? 'Últimos Mensajes' : 'Recent Messages'}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-primary-navy font-serif"
            >
              {isEs ? 'Alimenta tu fe' : 'Grow in your faith'}
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href={`/${locale}/mensajes`}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-navy text-accent-gold hover:bg-stone-800 transition-colors rounded-xl font-bold tracking-widest uppercase text-sm shadow-xl"
            >
              {isEs ? 'Ver todos los mensajes' : 'View all messages'}
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {sermons.slice(0, 2).map((sermon, idx) => (
            <motion.div
              key={sermon.videoId || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2, duration: 0.6, ease: "easeOut" }}
              className="h-full"
            >
              <div className="group bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:border-accent-gold/50 transition-all duration-500 h-full flex flex-col">
                
                {/* YouTube Thumbnail */}
                <div className="w-full aspect-video rounded-2xl bg-stone-100 relative overflow-hidden mb-6 group-hover:scale-[1.02] transition-transform duration-500">
                  {sermon.thumbnailUrl ? (
                    <Image 
                      src={sermon.thumbnailUrl} 
                      alt={sermon.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="absolute inset-0 bg-primary-navy opacity-10" />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  <a href={`https://www.youtube.com/watch?v=${sermon.videoId}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-[#FF0000] group-hover:border-[#FF0000] transition-colors duration-500 transform group-hover:scale-110">
                      <PlayCircle className="w-8 h-8 text-white group-hover:text-white transition-colors" />
                    </div>
                  </a>
                  
                  {sermon.publishedAt && (
                    <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest uppercase">
                        {new Date(sermon.publishedAt).toLocaleDateString(isEs ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-primary-navy font-serif mb-3 leading-tight group-hover:text-accent-gold transition-colors line-clamp-2">
                    {sermon.title}
                  </h3>
                  
                  <p className="text-stone-600 font-medium text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {sermon.description || (isEs ? 'Devocional semanal de Renuevo Church.' : 'Weekly devotional from Renuevo Church.')}
                  </p>
                  
                  <a 
                    href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-navy font-bold tracking-widest uppercase text-sm group/link mt-auto"
                  >
                    {isEs ? 'Escuchar Mensaje' : 'Listen to Message'}
                    <ArrowRight className="w-5 h-5 text-accent-gold group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
