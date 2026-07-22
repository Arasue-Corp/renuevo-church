import { defineField, defineType } from 'sanity'

export const announcementType = defineType({
  name: 'announcement',
  title: 'Anuncios',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título (Español)',
      type: 'string',
      validation: (rule) => rule.required(),
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
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Imagen Destacada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      title: 'Contenido (Español)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'contentEn',
      title: 'Contenido (Inglés)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Destacar en Inicio',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
