import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';

const BILINGUAL_VERSES = [
  { ref: "Juan 3:16", refEn: "John 3:16", es: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.", en: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
  { ref: "Filipenses 4:13", refEn: "Philippians 4:13", es: "Todo lo puedo en Cristo que me fortalece.", en: "I can do all this through him who gives me strength." },
  { ref: "Salmos 23:1", refEn: "Psalm 23:1", es: "Jehová es mi pastor; nada me faltará.", en: "The LORD is my shepherd, I lack nothing." },
  { ref: "Romanos 8:28", refEn: "Romans 8:28", es: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.", en: "And we know that in all things God works for the good of those who love him." },
  { ref: "Proverbios 3:5", refEn: "Proverbs 3:5", es: "Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia.", en: "Trust in the LORD with all your heart and lean not on your own understanding." },
  { ref: "Josué 1:9", refEn: "Joshua 1:9", es: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.", en: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go." },
  { ref: "Isaías 41:10", refEn: "Isaiah 41:10", es: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.", en: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you." },
  { ref: "Jeremías 29:11", refEn: "Jeremiah 29:11", es: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal.", en: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you." },
  { ref: "Romanos 12:2", refEn: "Romans 12:2", es: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento.", en: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind." },
  { ref: "Mateo 11:28", refEn: "Matthew 11:28", es: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", en: "Come to me, all you who are weary and burdened, and I will give you rest." },
  { ref: "Hebreos 11:1", refEn: "Hebrews 11:1", es: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.", en: "Now faith is confidence in what we hope for and assurance about what we do not see." },
  { ref: "1 Corintios 13:4", refEn: "1 Corinthians 13:4", es: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.", en: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud." },
  { ref: "Salmos 46:1", refEn: "Psalm 46:1", es: "Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones.", en: "God is our refuge and strength, an ever-present help in trouble." },
  { ref: "Mateo 6:33", refEn: "Matthew 6:33", es: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", en: "But seek first his kingdom and his righteousness, and all these things will be given to you as well." },
  { ref: "Efesios 2:8", refEn: "Ephesians 2:8", es: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.", en: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God." }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authHeader = request.headers.get('authorization');
    const secret = searchParams.get('secret') || (authHeader ? authHeader.split(' ')[1] : null);

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Pick a random verse from our internal bilingual array
    const randomIndex = Math.floor(Math.random() * BILINGUAL_VERSES.length);
    const selectedVerse = BILINGUAL_VERSES[randomIndex];

    // Save to Sanity
    const doc = {
      _type: 'verseOfTheDay',
      reference: selectedVerse.ref,
      referenceEn: selectedVerse.refEn,
      text: selectedVerse.es,
      textEn: selectedVerse.en,
      publishedAt: new Date().toISOString(),
    };

    const created = await client.create(doc);

    // Revalidate the home page and messages page to show the new verse instantly
    try {
      const { revalidatePath } = require('next/cache');
      revalidatePath('/', 'layout');
    } catch (e) {
      console.log('Failed to revalidate cache', e);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Verse of the Day created successfully',
      data: created 
    });

  } catch (error: any) {
    console.error("Cron Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
