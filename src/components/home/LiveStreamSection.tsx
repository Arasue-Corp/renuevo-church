import { Video, Youtube } from 'lucide-react';
import { getLatestYouTubeVideo } from '@/lib/youtube';

export default async function LiveStreamSection({ locale }: { locale: string }) {
  const isEs = locale === 'es';
  const video = await getLatestYouTubeVideo();

  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-6 bg-primary-sand text-primary-navy rounded-full mb-10 border border-stone-200">
            <Video className="w-12 h-12 stroke-[1.5]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-navy tracking-tight font-serif flex flex-col sm:flex-row items-center justify-center gap-4">
            {isEs ? 'Únete a nuestra transmisión' : 'Join our Live Stream'}
            {video?.isLive && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-bold tracking-widest uppercase animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                {isEs ? 'En Vivo' : 'Live'}
              </span>
            )}
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mb-8" />
          
          <p className="text-xl text-stone-600 mb-12 leading-relaxed font-medium">
            {isEs 
              ? 'Compartimos el mensaje de Jesús todas las semanas. Si no puedes acompañarnos en persona, conéctate con nosotros en línea.'
              : 'We share the message of Jesus every week. If you cannot join us in person, connect with us online.'}
          </p>

          {video ? (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12 border border-stone-200">
              <iframe 
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=${video.isLive ? 1 : 0}&mute=${video.isLive ? 1 : 0}`} 
                title={video.title} 
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full aspect-video rounded-3xl bg-stone-100 flex items-center justify-center mb-12 border-2 border-dashed border-stone-300">
              <p className="text-stone-500 font-medium px-4">
                {isEs 
                  ? 'Agrega YOUTUBE_API_KEY y YOUTUBE_CHANNEL_ID en .env.local para ver la transmisión aquí.'
                  : 'Configure YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID in .env.local to see the broadcast here.'}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://www.youtube.com/@RenuevoChurchorg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF0000] text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-[#CC0000] transition-all shadow-xl hover:shadow-2xl w-full sm:w-auto justify-center"
            >
              <Youtube className="w-5 h-5" />
              {isEs ? 'Canal de YouTube' : 'YouTube Channel'}
            </a>
            <a 
              href="https://facebook.com/RenuevoChurch.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1877F2] text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-[#166FE5] transition-all shadow-xl hover:shadow-2xl w-full sm:w-auto justify-center"
            >
              <Video className="w-5 h-5" />
              {isEs ? 'Ver en Facebook' : 'Watch on Facebook'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
