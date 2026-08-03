import { type SchemaTypeDefinition } from 'sanity'
import { announcementType } from './announcement'
import { businessType } from './business'
import { sermonType } from './sermon'
import { verseOfTheDayType } from './verseOfTheDay'
import { connectionCard } from './connectionCard'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [announcementType, businessType, sermonType, verseOfTheDayType, connectionCard],
}
