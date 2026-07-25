import { client } from '@/sanity/lib/client';
import CinematicHeader from '@/components/layout/CinematicHeader';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return { title: locale === 'es' ? 'Anuncios | Renuevo Church' : 'Announcements | Renuevo Church' };
}

export default async function AnnouncementsPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  // Fetch Announcements
  const annQuery = `*[_type == "announcement"] | order(publishedAt desc) {
    _id, title, titleEn, slug, "imageUrl": featuredImage.asset->url, publishedAt
  }`;
  let announcements = [];
  try {
    announcements = await client.fetch(annQuery);
  } catch (error) {
    console.error("Error fetching announcements:", error);
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-32 text-primary-navy">
      <CinematicHeader 
        title={isEs ? 'Anuncios y Eventos' : 'Announcements & Events'}
        subtitle={isEs 
          ? 'Entérate de lo que está sucediendo en nuestra iglesia y cómo puedes ser parte.'
          : 'Find out what is happening in our church and how you can be part of it.'}
        backgroundImageUrl="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="container mx-auto px-6 max-w-7xl pt-20">
        {announcements.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-stone-100">
            <h3 className="text-2xl font-serif font-bold text-stone-400 mb-2">
              {isEs ? 'No hay anuncios recientes' : 'No recent announcements'}
            </h3>
            <p className="text-stone-500 font-medium">
              {isEs ? 'Vuelve pronto para enterarte de nuestras novedades.' : 'Check back soon for updates.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {announcements.map((ann: any) => (
              <Link 
                href={`/${locale}/anuncios/${ann.slug.current}`} 
                key={ann._id} 
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100 hover:shadow-2xl hover:border-accent-gold/50 transition-all duration-500"
              >
                <div className="relative h-64 bg-primary-sand overflow-hidden">
                  {ann.imageUrl ? (
                    <Image 
                      src={ann.imageUrl} 
                      alt={ann.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary-navy/40 bg-stone-100">
                      <span className="text-sm font-bold tracking-widest uppercase">{isEs ? 'Anuncio' : 'Announcement'}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-bold text-accent-gold mb-4 uppercase tracking-widest">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(ann.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-primary-navy group-hover:text-accent-gold transition-colors leading-tight mb-6">
                    {isEs ? ann.title : (ann.titleEn || ann.title)}
                  </h3>
                  
                  <div className="mt-auto inline-flex items-center gap-2 text-primary-navy font-bold tracking-widest uppercase text-sm group-hover:text-accent-gold transition-colors">
                    {isEs ? 'Leer más' : 'Read more'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
