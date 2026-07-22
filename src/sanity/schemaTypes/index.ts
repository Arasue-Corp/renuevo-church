import { type SchemaTypeDefinition } from 'sanity'
import { announcementType } from './announcement'
import { businessType } from './business'
import { sermonType } from './sermon'
import { devotionalType } from './devotional'
import { connectionCard } from './connectionCard'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [announcementType, businessType, sermonType, devotionalType, connectionCard],
}
