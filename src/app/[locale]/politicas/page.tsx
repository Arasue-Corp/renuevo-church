import CinematicHeader from '@/components/layout/CinematicHeader';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return { title: locale === 'es' ? 'Política de Privacidad | Renuevo Church' : 'Privacy Policy | Renuevo Church' };
}

export default async function PrivacyPolicyPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <div className="bg-primary-sand min-h-screen pb-32 text-primary-navy">
      <CinematicHeader 
        title={isEs ? 'Política de Privacidad' : 'Privacy Policy'}
        subtitle={isEs ? 'Protegiendo tu información y respetando tu privacidad.' : 'Protecting your information and respecting your privacy.'}
        backgroundImageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="container mx-auto px-6 max-w-4xl py-20 relative z-10">
        <div className="bg-white p-10 md:p-16 rounded-2xl shadow-xl border border-stone-200">
          
          <p className="text-stone-500 mb-8 italic text-sm">
            {isEs ? 'Última actualización: 22 de Julio de 2026' : 'Last updated: July 22, 2026'}
          </p>

          <div className="prose prose-stone max-w-none text-stone-700 space-y-6">
            
            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '1. Introducción' : '1. Introduction'}</h2>
            <p>
              {isEs 
                ? 'Bienvenido a Renuevo Church. Respetamos tu privacidad y estamos comprometidos a proteger tu información personal. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos tu información cuando visitas nuestro sitio web.'
                : 'Welcome to Renuevo Church. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '2. Información que Recopilamos' : '2. Information We Collect'}</h2>
            <p>
              {isEs 
                ? 'Podemos recopilar información personal que tú nos proporcionas voluntariamente al rellenar formularios de contacto, "Connection Cards" o al comunicarte con nosotros. Esta información puede incluir tu nombre, dirección de correo electrónico, número de teléfono, dirección postal, estado civil y preferencias de congregación.'
                : 'We may collect personal information that you voluntarily provide to us when you fill out contact forms, Connection Cards, or communicate with us. This information may include your name, email address, phone number, mailing address, marital status, and congregation preferences.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '3. Uso de la Información' : '3. Use of Information'}</h2>
            <p>
              {isEs 
                ? 'Utilizamos la información recopilada para:'
                : 'We use the information we collect to:'}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{isEs ? 'Responder a tus consultas y peticiones de oración o visitas.' : 'Respond to your inquiries and requests for prayer or visits.'}</li>
              <li>{isEs ? 'Enviarte comunicaciones relevantes sobre eventos y ministerios de la iglesia.' : 'Send you relevant communications about church events and ministries.'}</li>
              <li>{isEs ? 'Mejorar nuestro sitio web y analizar tendencias de uso.' : 'Improve our website and analyze usage trends.'}</li>
              <li>{isEs ? 'Cumplir con obligaciones legales.' : 'Comply with legal obligations.'}</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '4. Cookies y Tecnologías de Rastreo' : '4. Cookies and Tracking Technologies'}</h2>
            <p>
              {isEs 
                ? 'Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el tráfico del sitio y personalizar el contenido. Al usar nuestro sitio, aceptas el uso de cookies. Puedes configurar tu navegador para que rechace todas o algunas cookies, pero esto puede afectar la funcionalidad de ciertas partes del sitio.'
                : 'Our website uses cookies and similar technologies to enhance user experience, analyze site traffic, and personalize content. By using our site, you consent to the use of cookies. You can set your browser to refuse all or some browser cookies, but this may affect the functionality of certain parts of the site.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '5. Divulgación de Datos' : '5. Disclosure of Data'}</h2>
            <p>
              {isEs 
                ? 'No vendemos, alquilamos ni compartimos tu información personal con terceros para fines de marketing comercial. Sin embargo, podemos compartir tu información con proveedores de servicios de terceros (como plataformas de alojamiento o bases de datos como Sanity) que nos ayudan a operar el sitio web y el ministerio, siempre bajo estrictas medidas de confidencialidad.'
                : 'We do not sell, rent, or share your personal information with third parties for commercial marketing purposes. However, we may share your information with third-party service providers (such as hosting platforms or databases like Sanity) who assist us in operating our website and ministry, under strict confidentiality agreements.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '6. Cumplimiento Legal en EE. UU. (CCPA y otros)' : '6. US Legal Compliance (CCPA and others)'}</h2>
            <p>
              {isEs 
                ? 'Si eres residente de ciertos estados en Estados Unidos (como California bajo la CCPA), puedes tener derechos adicionales con respecto a tu información personal, incluyendo el derecho a solicitar acceso, eliminación u oponerte a la venta de tus datos personales. Como organización religiosa sin fines de lucro, estamos exentos de ciertas regulaciones de privacidad comercial, pero aplicamos los más altos estándares éticos en el manejo de tu información.'
                : 'If you are a resident of certain states in the United States (such as California under the CCPA), you may have additional rights regarding your personal information, including the right to request access, deletion, or opt-out of the sale of your personal data. As a non-profit religious organization, we are exempt from certain commercial privacy regulations, but we apply the highest ethical standards in handling your information.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '7. Seguridad de los Datos' : '7. Data Security'}</h2>
            <p>
              {isEs 
                ? 'Implementamos medidas de seguridad administrativas, técnicas y físicas apropiadas para proteger tu información personal contra pérdida, robo o acceso no autorizado. Sin embargo, ninguna transmisión por internet es 100% segura.'
                : 'We implement appropriate administrative, technical, and physical security measures to protect your personal information against loss, theft, or unauthorized access. However, no internet transmission is 100% secure.'}
            </p>

            <h2 className="text-2xl font-serif font-bold text-primary-navy">{isEs ? '8. Contáctanos' : '8. Contact Us'}</h2>
            <p>
              {isEs 
                ? 'Si tienes preguntas sobre esta Política de Privacidad o nuestras prácticas de datos, contáctanos en:'
                : 'If you have questions about this Privacy Policy or our data practices, please contact us at:'}
            </p>
            <address className="not-italic text-stone-600 bg-stone-100 p-4 rounded-lg">
              Renuevo Church<br />
              6331 W Lamar Rd<br />
              Glendale, AZ 85301<br />
              (480) 440-0396
            </address>

          </div>
        </div>
      </section>
    </div>
  );
}
