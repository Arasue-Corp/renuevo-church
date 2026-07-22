import { client } from '@/sanity/lib/client';
import Link from 'next/link';

export default async function Announcements({ locale }: { locale: string }) {
  const isEs = locale === 'es';
  
  // Fetch from Sanity
  const query = `*[_type == "announcement"] | order(publishedAt desc)[0...3] {
    _id, title, titleEn, slug, "imageUrl": featuredImage.asset->url, publishedAt
  }`;
  
  let announcements = [];
  try {
    announcements = await client.fetch(query);
  } catch (error) {
    console.error("Error fetching announcements:", error);
  }
  
  // If no announcements, show a placeholder for the preview
  if (!announcements || announcements.length === 0) {
    announcements = [
      { _id: '1', title: 'Servicio de Domingo', titleEn: 'Sunday Service', publishedAt: new Date().toISOString() },
      { _id: '2', title: 'Reunión de Jóvenes', titleEn: 'Youth Group Meeting', publishedAt: new Date().toISOString() },
      { _id: '3', title: 'Estudio Bíblico', titleEn: 'Bible Study', publishedAt: new Date().toISOString() },
    ];
  }

  return (
    <section className="py-32 bg-[#FAF9F6] border-t border-stone-200">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-navy tracking-tight font-serif">
            {isEs ? 'Últimos Anuncios' : 'Latest Announcements'}
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {announcements.map((ann: any) => (
            <Link href={`/${locale}/mensajes#anuncios`} key={ann._id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100 hover:shadow-2xl hover:border-accent-gold/50 transition-all duration-300">
              <div className="relative h-60 bg-primary-sand overflow-hidden">
                {ann.imageUrl ? (
                  <img src={ann.imageUrl} alt={ann.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary-navy/40 bg-primary-sand">
                    <span className="text-sm font-bold tracking-widest uppercase">{isEs ? 'Anuncio' : 'Announcement'}</span>
                  </div>
                )}
              </div>
              <div className="p-8">
                <p className="text-xs font-bold text-accent-gold mb-3 uppercase tracking-widest">
                  {new Date(ann.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h3 className="text-2xl font-serif font-bold text-primary-navy group-hover:text-accent-gold transition-colors leading-tight">
                  {isEs ? ann.title : (ann.titleEn || ann.title)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href={`/${locale}/mensajes#anuncios`} className="inline-flex justify-center items-center px-10 py-5 bg-white text-primary-navy rounded-xl font-bold text-sm tracking-widest uppercase shadow-md hover:shadow-xl hover:text-accent-gold transition-all border border-stone-200">
            {isEs ? 'Ver todos los anuncios' : 'View all announcements'}
          </Link>
        </div>
      </div>
    </section>
  );
}
