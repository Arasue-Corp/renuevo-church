import { client } from '@/sanity/lib/client';
import { Briefcase, Mail, Phone, Globe } from 'lucide-react';
import CinematicHeader from '@/components/layout/CinematicHeader';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return { title: locale === 'es' ? 'Directorio de Servicios | Renuevo Church' : 'Business Directory | Renuevo Church' };
}

export default async function DirectoryPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  // Fetch businesses
  const query = `*[_type == "business" && isApproved == true] | order(name asc) {
    _id, name, categories, categoriesEn, description, descriptionEn, "logoUrl": logo.asset->url, "dominantColor": logo.asset->metadata.palette.dominant.background, contactEmail, contactPhone, website
  }`;
  
  let businesses = [];
  try {
    businesses = await client.fetch(query);
  } catch (error) {
    console.error("Error fetching businesses:", error);
  }

  // Fallback for UI if no data
  if (businesses.length === 0) {
    businesses = [
      { 
        _id: 'alex-ai', 
        name: 'Alex AI Insurtech', 
        categories: ['Seguros'], 
        categoriesEn: ['Insurance'],
        description: 'Te ayudamos a proteger a tu familia y asegurar tu futuro con planes de seguro médico y de vida que son fáciles de entender, accesibles y adaptados a tus necesidades.', 
        descriptionEn: 'We help you protect your family and secure your future with health and life insurance plans that are easy to understand, affordable, and tailored to your needs.', 
        contactPhone: '480-630-9630',
        contactEmail: 'hello@alexai.cloud',
        website: 'https://www.alexai.cloud',
        logoUrl: '/directorio-logos/logo-alex.png',
        dominantColor: '#e0f2fe' // Fallback color that fits Alex AI blue
      },
      { 
        _id: 'arasue-horizon', 
        name: 'Arasue Horizon', 
        categories: ['Tecnología', 'Productos', 'Servicios'], 
        categoriesEn: ['Technology', 'Products', 'Services'],
        description: 'Impulsamos negocios con desarrollo de software, inteligencia artificial y automatizaciones para hacer tu trabajo más fácil. Además, ofrecemos productos de origen 100% natural, como nuestra miel de alta calidad.', 
        descriptionEn: 'We boost businesses with software development, artificial intelligence, and automations to make your work easier. We also offer 100% natural products, like our high-quality honey.', 
        contactPhone: '480-569-4280', 
        contactEmail: 'hello@arasue.com', 
        website: 'https://www.arasue.com',
        logoUrl: '/directorio-logos/logo-arasue.png',
        dominantColor: '#fef3c7' // Fallback color that fits Arasue gold/sand
      }
    ];
  }

  return (
    <div className="bg-primary-sand min-h-screen pb-32 text-primary-navy">
      <CinematicHeader 
        title={isEs ? 'Catálogo de Servicios' : 'Business Directory'}
        subtitle={isEs 
          ? 'Apoya a los emprendedores y negocios de nuestra comunidad.' 
          : 'Support the entrepreneurs and businesses in our community.'}
        backgroundImageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {businesses.map((biz: any) => (
            <div key={biz._id} className="bg-white p-10 rounded-2xl border border-stone-200 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:border-accent-gold/50 transition-all duration-300 flex flex-col h-full group">
              <div className="flex items-center gap-6 mb-8">
                <div 
                  className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-stone-200 transition-colors p-2"
                  style={{ backgroundColor: biz.dominantColor || '#F2D3AC' }} // Fallback to primary-sand hex
                >
                  {biz.logoUrl ? (
                    <img src={biz.logoUrl} alt={biz.name} className="w-full h-full object-contain" />
                  ) : (
                    <Briefcase className="w-8 h-8 text-primary-navy/40 stroke-[1.5]" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-navy font-serif leading-tight group-hover:text-accent-gold transition-colors">{biz.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {(isEs ? biz.categories : (biz.categoriesEn || biz.categories))?.map((cat: string, index: number) => (
                      <span key={index} className="inline-block px-3 py-1 bg-primary-sand text-primary-navy text-xs font-bold tracking-widest uppercase rounded-full border border-stone-200">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-stone-600 mb-10 text-base leading-relaxed flex-grow font-medium">
                {isEs ? biz.description : (biz.descriptionEn || biz.description)}
              </p>
              
              <div className="space-y-4 text-sm bg-stone-50 p-6 rounded-xl border border-stone-200">
                {biz.contactPhone && (
                  <a href={`tel:${biz.contactPhone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-4 text-stone-700 hover:text-accent-gold transition-colors w-fit">
                    <Phone className="w-5 h-5 text-accent-gold stroke-[1.5]" />
                    <span className="font-bold">{biz.contactPhone}</span>
                  </a>
                )}
                {biz.contactEmail && (
                  <a href={`mailto:${biz.contactEmail}`} className="flex items-center gap-4 text-stone-700 hover:text-accent-gold transition-colors w-fit">
                    <Mail className="w-5 h-5 text-accent-gold stroke-[1.5]" />
                    <span className="font-bold truncate">{biz.contactEmail}</span>
                  </a>
                )}
                {biz.website && (
                  <a href={biz.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-primary-navy hover:text-accent-gold transition-colors truncate w-fit">
                    <Globe className="w-5 h-5 text-accent-gold stroke-[1.5] flex-shrink-0" />
                    <span className="font-bold truncate">{biz.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                  </a>
                )}
                {!biz.contactPhone && !biz.contactEmail && !biz.website && (
                  <div className="text-stone-400 text-xs italic font-bold tracking-widest uppercase">
                    {isEs ? 'Sin datos de contacto' : 'No contact data'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA to register */}
        <div className="mt-32 bg-primary-navy rounded-2xl p-12 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/20 rounded-full blur-[100px] group-hover:bg-accent-gold/30 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight font-serif">
              {isEs ? '¿Tienes un negocio?' : 'Do you own a business?'}
            </h2>
            <div className="w-16 h-1 bg-accent-gold mx-auto mb-8" />
            <p className="text-stone-300 mb-10 max-w-xl mx-auto text-lg font-medium leading-relaxed">
              {isEs 
                ? 'Regístrate para formar parte del catálogo de servicios recomendados por Renuevo Church y date a conocer en nuestra comunidad.' 
                : 'Register to be part of the recommended business directory by Renuevo Church and get known in our community.'}
            </p>
            <button className="relative inline-flex justify-center items-center gap-3 px-10 py-5 bg-accent-gold text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-primary-navy transition-all overflow-hidden group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <span className="relative z-10">{isEs ? 'Registrar mi negocio' : 'Register my business'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
