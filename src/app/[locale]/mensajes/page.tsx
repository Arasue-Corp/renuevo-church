import { client } from '@/sanity/lib/client';
import { ResourceLists } from '@/components/mensajes/ResourceLists';
import CinematicHeader from '@/components/layout/CinematicHeader';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return { title: locale === 'es' ? 'Recursos y Mensajes | Renuevo Church' : 'Resources & Messages | Renuevo Church' };
}

export default async function ResourcesPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  // Fetch Devotionals
  const devQuery = `*[_type == "devotional" && publishedAt <= now()] | order(publishedAt desc)[0...6] {
    _id, title, titleEn, slug, "imageUrl": featuredImage.asset->url, publishedAt, author
  }`;
  
  // Fetch Sermons
  const serQuery = `*[_type == "sermon" && publishedAt <= now()] | order(publishedAt desc)[0...6] {
    _id, title, titleEn, slug, videoUrl, mainVerse, mainVerseEn, publishedAt
  }`;

  let devotionals = [];
  let sermons = [];
  try {
    devotionals = await client.fetch(devQuery);
    sermons = await client.fetch(serQuery);
  } catch (error) {
    console.error("Error fetching sanity content:", error);
  }

  // Placeholder data if none found
  if (sermons.length === 0) {
    sermons = [
      { _id: 's1', title: 'El poder de la gracia', titleEn: 'The power of grace', mainVerse: 'Efesios 2:8 (NTV)', mainVerseEn: 'Ephesians 2:8 (NLT)', publishedAt: new Date().toISOString() },
      { _id: 's2', title: 'Caminando sobre las aguas', titleEn: 'Walking on water', mainVerse: 'Mateo 14:29 (NTV)', mainVerseEn: 'Matthew 14:29 (NLT)', publishedAt: new Date().toISOString() },
    ];
  }

  return (
    <div className="bg-primary-sand min-h-screen pb-32 text-primary-navy">
      <CinematicHeader 
        title={isEs ? 'Recursos y Mensajes' : 'Resources & Messages'}
        subtitle={isEs 
          ? 'Alimenta tu fe con nuestros sermones y devocionales diarios basados en la Biblia.'
          : 'Feed your faith with our biblical sermons and daily devotionals.'}
        backgroundImageUrl="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2078&auto=format&fit=crop"
      />

      <ResourceLists locale={locale} sermons={sermons} devotionals={devotionals} />
    </div>
  );
}
