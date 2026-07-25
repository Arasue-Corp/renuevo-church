import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { PortableText } from '@portabletext/react';

export async function generateMetadata({params}: {params: Promise<{locale: string, slug: string}>}) {
  const { locale, slug } = await params;
  
  const query = `*[_type == "announcement" && slug.current == $slug][0] { title, titleEn }`;
  const announcement = await client.fetch(query, { slug });
  
  if (!announcement) return { title: 'Not Found | Renuevo Church' };
  
  const isEs = locale === 'es';
  const displayTitle = isEs ? announcement.title : (announcement.titleEn || announcement.title);
  
  return { title: `${displayTitle} | Renuevo Church` };
}

export default async function AnnouncementArticlePage({params}: {params: Promise<{locale: string, slug: string}>}) {
  const { locale, slug } = await params;
  const isEs = locale === 'es';

  const query = `*[_type == "announcement" && slug.current == $slug][0] {
    _id, title, titleEn, "imageUrl": featuredImage.asset->url, publishedAt, content, contentEn
  }`;
  
  let announcement;
  try {
    announcement = await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching announcement:", error);
  }

  if (!announcement) {
    notFound();
  }

  const displayTitle = isEs ? announcement.title : (announcement.titleEn || announcement.title);
  const displayContent = isEs ? announcement.content : (announcement.contentEn || announcement.content);

  // Custom Portable Text components to match the site's design aesthetic
  const portableTextComponents = {
    block: {
      normal: ({children}: any) => <p className="text-stone-700 text-lg leading-relaxed mb-6">{children}</p>,
      h2: ({children}: any) => <h2 className="text-3xl font-serif font-bold text-primary-navy mt-12 mb-6">{children}</h2>,
      h3: ({children}: any) => <h3 className="text-2xl font-serif font-bold text-primary-navy mt-10 mb-4">{children}</h3>,
      blockquote: ({children}: any) => (
        <blockquote className="border-l-4 border-accent-gold pl-6 py-2 my-8 bg-primary-sand/30 italic text-xl font-serif text-primary-navy rounded-r-xl">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({children}: any) => <strong className="font-bold text-primary-navy">{children}</strong>,
      link: ({children, value}: any) => (
        <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:text-primary-navy font-bold underline underline-offset-4 transition-colors">
          {children}
        </a>
      ),
    },
    list: {
      bullet: ({children}: any) => <ul className="list-disc pl-6 mb-6 text-stone-700 space-y-2 text-lg">{children}</ul>,
      number: ({children}: any) => <ol className="list-decimal pl-6 mb-6 text-stone-700 space-y-2 text-lg">{children}</ol>,
    },
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-primary-navy pt-32 pb-24 selection:bg-accent-gold selection:text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <Link 
          href={`/${locale}/anuncios`}
          className="inline-flex items-center gap-2 text-stone-500 hover:text-accent-gold font-bold tracking-widest uppercase text-xs mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isEs ? 'Volver a todos los anuncios' : 'Back to all announcements'}
        </Link>
        
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-accent-gold font-bold uppercase tracking-widest text-sm mb-6">
            <Calendar className="w-5 h-5" />
            <span>{new Date(announcement.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-navy leading-tight mb-8">
            {displayTitle}
          </h1>
        </header>
        
        {/* Featured Image */}
        {announcement.imageUrl && (
          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl shadow-stone-200/50 mb-16 border border-stone-100">
            <Image 
              src={announcement.imageUrl} 
              alt={displayTitle} 
              fill 
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        )}
        
        {/* Article Content */}
        <div className="bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100">
          <div className="max-w-2xl mx-auto">
            {displayContent && displayContent.length > 0 ? (
              <PortableText 
                value={displayContent} 
                components={portableTextComponents} 
              />
            ) : (
              <p className="text-stone-500 italic text-lg text-center py-10">
                {isEs ? 'No hay detalles adicionales para este anuncio.' : 'No additional details available for this announcement.'}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
