import { defineField, defineType } from 'sanity'

export const devotionalType = defineType({
  name: 'devotional',
  title: 'Devocionales',
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
      name: 'author',
      title: 'Autor',
      type: 'string',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Imagen Destacada',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Contenido (Español)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (English)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      description: 'Para programar un devocional, selecciona una fecha y hora en el futuro.',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
