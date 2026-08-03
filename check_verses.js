const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'h25n4y6e', // Need to get the actual project ID from .env
  dataset: 'production',
  apiVersion: '2024-07-20',
  useCdn: false
});

async function main() {
  const query = `*[_type == "verseOfTheDay"]`;
  const verses = await client.fetch(query);
  console.log(JSON.stringify(verses, null, 2));
}

main().catch(console.error);
