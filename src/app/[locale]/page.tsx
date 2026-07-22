import { client } from '@/sanity/lib/client';
import Hero from '@/components/home/Hero';
import VisitUsSection from '@/components/home/VisitUsSection';
import NextStepsSection from '@/components/home/NextStepsSection';
import JesusSection from '@/components/home/JesusSection';
import MinistriesPreview from '@/components/home/MinistriesPreview';
import RecentSermons from '@/components/home/RecentSermons';
import LiveStreamSection from '@/components/home/LiveStreamSection';
import Announcements from '@/components/home/Announcements';
import DirectoryPreview from '@/components/home/DirectoryPreview';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return {
    title: locale === 'es' ? 'Renuevo Church | Inicio' : 'Renuevo Church | Home'
  };
}

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  
  // Fetch latest 2 sermons for the homepage
  const serQuery = `*[_type == "sermon" && publishedAt <= now()] | order(publishedAt desc)[0...2] {
    _id, title, titleEn, slug, videoUrl, mainVerse, mainVerseEn, publishedAt
  }`;

  let sermons = [];
  try {
    sermons = await client.fetch(serQuery);
  } catch (error) {
    console.error("Error fetching sermons for home:", error);
  }

  // Fallback if none found
  if (sermons.length === 0) {
    sermons = [
      { _id: 's1', title: 'El poder de la gracia', titleEn: 'The power of grace', mainVerse: 'Efesios 2:8 (NTV)', mainVerseEn: 'Ephesians 2:8 (NLT)', publishedAt: new Date().toISOString() },
      { _id: 's2', title: 'Caminando sobre las aguas', titleEn: 'Walking on water', mainVerse: 'Mateo 14:29 (NTV)', mainVerseEn: 'Matthew 14:29 (NLT)', publishedAt: new Date().toISOString() },
    ];
  }

  return (
    <div className="bg-primary-sand text-primary-navy selection:bg-accent-gold selection:text-white">
      <Hero locale={locale} />
      
      <LiveStreamSection locale={locale} />

      {/* Narrative Flow */}
      <VisitUsSection locale={locale} />
      
      <JesusSection locale={locale} />
      
      {/* Next Steps / Connect */}
      <NextStepsSection locale={locale} />
      
      {/* Business Directory Preview */}
      <DirectoryPreview locale={locale} />

      {/* Ministries Preview */}
      <MinistriesPreview locale={locale} />
      
      <RecentSermons locale={locale} sermons={sermons} />
      
      <Announcements locale={locale} />
    </div>
  );
}
