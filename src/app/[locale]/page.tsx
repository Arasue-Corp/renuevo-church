import { getRecentYouTubeVideos } from '@/lib/youtube';
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
  
  const sermons = await getRecentYouTubeVideos(2);

  // Fetch businesses for directory preview
  let businesses = [];
  try {
    businesses = await client.fetch(
      `*[_type == "business" && isApproved == true] { categories, categoriesEn }`, 
      {}, 
      { next: { revalidate: 30 } }
    );
  } catch (error) {
    console.error("Error fetching businesses:", error);
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
      <DirectoryPreview locale={locale} businesses={businesses} />

      {/* Ministries Preview */}
      <MinistriesPreview locale={locale} />
      
      <RecentSermons locale={locale} sermons={sermons} />
      
      <Announcements locale={locale} />
    </div>
  );
}
