import CinematicHeader from '@/components/layout/CinematicHeader';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return { title: locale === 'es' ? 'Términos y Condiciones | Renuevo Church' : 'Terms and Conditions | Renuevo Church' };
}

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <div className="bg-primary-sand min-h-screen pb-32 text-primary-navy">
      <CinematicHeader 
        title={isEs ? 'Términos y Condiciones' : 'Terms and Conditions'}
        subtitle={isEs ? 'Acuerdo legal para el uso de nuestro sitio web.' : 'Legal agreement for the use of our website.'}
        backgroundImageUrl="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="container mx-auto px-6 max-w-4xl py-20 relative z-10">
        <div className="bg-white p-10 md:p-16 rounded-2xl shadow-xl border border-stone-200">
          
          <p className="text-stone-500 mb-8 italic text-sm">
            {isEs ? 'Última actualización: 22 de Julio de 2026' : 'Last updated: July 22, 2026'}
          </p>

          <div className="prose prose-stone max-w-none text-stone-700 space-y-6">
            
            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '1. Aceptación de los Términos' : '1. Acceptance of Terms'}</h2>
            <p>
              {isEs 
                ? 'Al acceder y utilizar el sitio web de Renuevo Church, aceptas estar sujeto a estos Términos y Condiciones, así como a todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, tienes prohibido usar o acceder a este sitio.'
                : 'By accessing and using the Renuevo Church website, you agree to be bound by these Terms and Conditions, as well as all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '2. Uso de la Licencia' : '2. Use License'}</h2>
            <p>
              {isEs 
                ? 'Se concede permiso para descargar temporalmente una copia de los materiales (información, videos o audios) en el sitio web de Renuevo Church para visualización transitoria personal y no comercial. Esta es una concesión de licencia, no una transferencia de título.'
                : 'Permission is granted to temporarily download one copy of the materials (information, videos, or audio) on the Renuevo Church website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.'}
            </p>
            <p>
              {isEs 
                ? 'Bajo esta licencia no puedes: modificar o copiar los materiales; usarlos para ningún propósito comercial; intentar descompilar o aplicar ingeniería inversa a cualquier software en el sitio; ni transferir los materiales a otra persona o "espejar" los materiales en cualquier otro servidor.'
                : 'Under this license you may not: modify or copy the materials; use them for any commercial purpose; attempt to decompile or reverse engineer any software on the site; or transfer the materials to another person or "mirror" the materials on any other server.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '3. Limitaciones' : '3. Limitations'}</h2>
            <p>
              {isEs 
                ? 'En ningún caso Renuevo Church o sus proveedores serán responsables de ningún daño (incluyendo, sin limitación, daños por pérdida de datos o interrupción del negocio) que surja del uso o la incapacidad de usar los materiales en el sitio de Renuevo Church.'
                : 'In no event shall Renuevo Church or its suppliers be liable for any damages (including, without limitation, damages for loss of data or business interruption) arising out of the use or inability to use the materials on the Renuevo Church site.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '4. Precisión de los Materiales' : '4. Accuracy of Materials'}</h2>
            <p>
              {isEs 
                ? 'Los materiales que aparecen en el sitio web de Renuevo Church pueden incluir errores técnicos, tipográficos o fotográficos. No garantizamos que ninguno de los materiales en nuestro sitio web sea preciso, completo o actual. Renuevo Church puede realizar cambios en los materiales en cualquier momento sin previo aviso.'
                : 'The materials appearing on the Renuevo Church website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. Renuevo Church may make changes to the materials at any time without notice.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '5. Enlaces' : '5. Links'}</h2>
            <p>
              {isEs 
                ? 'Renuevo Church no ha revisado todos los sitios vinculados a su sitio web y no es responsable de los contenidos de ningún sitio vinculado. La inclusión de cualquier enlace no implica respaldo por parte de Renuevo Church del sitio. El uso de cualquier sitio web vinculado es bajo el propio riesgo del usuario.'
                : 'Renuevo Church has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Renuevo Church of the site. Use of any such linked website is at the user\'s own risk.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '6. Modificaciones' : '6. Modifications'}</h2>
            <p>
              {isEs 
                ? 'Podemos revisar estos Términos y Condiciones para nuestro sitio web en cualquier momento sin previo aviso. Al usar este sitio web, aceptas estar sujeto a la versión actual de estos términos.'
                : 'We may revise these Terms and Conditions for our website at any time without notice. By using this website you are agreeing to be bound by the then-current version of these terms.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '7. Ley Aplicable' : '7. Governing Law'}</h2>
            <p>
              {isEs 
                ? 'Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes del estado de Arizona, Estados Unidos de América. Tú te sometes irrevocablemente a la jurisdicción exclusiva de los tribunales en ese estado o ubicación.'
                : 'These terms and conditions are governed by and construed in accordance with the laws of the State of Arizona, United States of America. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.'}
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
