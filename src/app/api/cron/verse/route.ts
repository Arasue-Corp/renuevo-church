import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic'; // Ensure this runs dynamically every time

// Popular Bible verses to pick from
const POPULAR_VERSES = [
  "John 3:16", "Jeremiah 29:11", "Romans 8:28", "Philippians 4:13", "Genesis 1:1",
  "Proverbs 3:5", "Proverbs 3:6", "Romans 12:2", "Philippians 4:6", "Matthew 28:19",
  "Ephesians 2:8", "Galatians 5:22", "Romans 8:31", "Romans 15:13", "Isaiah 41:10",
  "Joshua 1:9", "Isaiah 40:31", "Matthew 11:28", "Romans 8:38", "Romans 8:39",
  "Matthew 6:33", "Hebrews 11:1", "Hebrews 12:2", "1 Peter 5:7", "James 1:2",
  "James 1:5", "1 Corinthians 13:4", "1 Corinthians 13:7", "1 Corinthians 13:13",
  "Proverbs 18:10", "Psalm 23:1", "Psalm 23:4", "Psalm 23:6", "Psalm 46:1",
  "Psalm 119:105", "Psalm 139:14", "Isaiah 9:6", "Isaiah 53:5", "Jeremiah 33:3",
  "Lamentations 3:22", "Lamentations 3:23", "Micah 6:8", "Zephaniah 3:17",
  "Matthew 5:16", "Matthew 6:34", "Mark 10:27", "Luke 1:37", "John 1:12",
  "John 10:10", "John 14:6", "John 14:27", "John 16:33", "Acts 1:8",
  "Romans 5:8", "Romans 6:23", "Romans 10:9", "1 Corinthians 10:13",
  "2 Corinthians 5:17", "2 Corinthians 12:9", "Galatians 2:20", "Ephesians 2:10"
];

export async function GET(request: Request) {
  try {
    // 1. Verify Authentication
    const { searchParams } = new URL(request.url);
    const authHeader = request.headers.get('authorization');
    const secret = searchParams.get('secret') || (authHeader ? authHeader.split(' ')[1] : null);

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Pick a random verse
    const randomIndex = Math.floor(Math.random() * POPULAR_VERSES.length);
    const referenceQuery = POPULAR_VERSES[randomIndex];

    // 3. Fetch Spanish (Reina Valera)
    const resEs = await fetch(`https://bible-api.com/${encodeURIComponent(referenceQuery)}?translation=valera`);
    const dataEs = await resEs.json();
    
    // 4. Fetch English (World English Bible - public domain)
    const resEn = await fetch(`https://bible-api.com/${encodeURIComponent(referenceQuery)}?translation=web`);
    const dataEn = await resEn.json();

    if (!dataEs.text || !dataEn.text) {
      throw new Error('Failed to fetch verse from bible-api.com');
    }

    // Clean up texts (remove newlines and excess spaces)
    const textEs = dataEs.text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const textEn = dataEn.text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    
    // The reference string from the API (might have proper accents like "Juan 3:16")
    // Note: bible-api.com returns English book names in the reference field even for Valera,
    // but we can just use the provided reference. If you want Spanish names, you'd need a map, 
    // but for now we'll use the API's reference or standard.
    const referenceEn = dataEn.reference;
    // We can do a basic replacement for some common book names if we want, or just use English.
    // For simplicity, we'll store the API's reference.
    const referenceEs = dataEs.reference;

    // 5. Save to Sanity
    const doc = {
      _type: 'verseOfTheDay',
      reference: referenceEs,
      referenceEn: referenceEn,
      text: textEs,
      textEn: textEn,
      publishedAt: new Date().toISOString(),
    };

    const created = await client.create(doc);

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
