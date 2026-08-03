'use client';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

interface VerseOfTheDayProps {
  locale: string;
  verse: {
    reference: string;
    referenceEn?: string;
    text: string;
    textEn?: string;
    imageUrl?: string;
    publishedAt: string;
  } | null;
}

export default function VerseOfTheDaySection({ locale, verse }: VerseOfTheDayProps) {
  const isEs = locale === 'es';

  if (!verse) return null; // Do not render if no verse is provided

  const title = isEs ? 'Versículo del Día' : 'Verse of the Day';
  const text = isEs ? verse.text : (verse.textEn || verse.text);
  const reference = isEs ? verse.reference : (verse.referenceEn || verse.reference);
  const dateStr = new Date(verse.publishedAt).toLocaleDateString(locale, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden border-b border-stone-200">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-accent-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-primary-navy/5 blur-3xl pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative bg-stone-50 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 overflow-hidden border border-stone-100"
        >
          {/* Optional Background Image */}
          {verse.imageUrl && (
            <div className="absolute inset-0 z-0">
              <Image 
                src={verse.imageUrl} 
                alt={reference} 
                fill 
                className="object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/90 to-transparent" />
            </div>
          )}

          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary-navy/10 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary-navy" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-widest uppercase text-accent-gold">
                    {title}
                  </h2>
                  <p className="text-xs text-stone-500 font-medium capitalize mt-1">
                    {dateStr}
                  </p>
                </div>
              </div>

              <blockquote className="text-2xl md:text-3xl font-serif text-primary-navy leading-snug font-medium mb-6 relative">
                &quot;{text}&quot;
              </blockquote>
              
              <p className="text-lg md:text-xl text-stone-600 font-bold tracking-wide">
                — {reference}
              </p>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
