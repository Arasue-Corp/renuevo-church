import { defineField, defineType } from 'sanity'

export const sermonType = defineType({
  name: 'sermon',
  title: 'Sermones',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título (Español)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Título (Inglés)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL del Video (YouTube o Facebook)',
      type: 'url',
    }),
    defineField({
      name: 'mainVerse',
      title: 'Versículo Principal (NTV)',
      type: 'text',
      description: 'Cita bíblica principal',
    }),
    defineField({
      name: 'mainVerseEn',
      title: 'Main Verse (NLT)',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      description: 'Si eliges una fecha futura, el sermón no aparecerá hasta que llegue esa fecha (Calendarización).',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
