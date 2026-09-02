import { defineField, defineType } from 'sanity'

export const verseOfTheDayType = defineType({
  name: 'verseOfTheDay',
  title: 'Versículos del Día',
  type: 'document',
  fields: [
    defineField({
      name: 'reference',
      title: 'Cita Bíblica (Ej. Juan 3:16)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'referenceEn',
      title: 'Bible Reference (e.g. John 3:16)',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Texto del Versículo (Español)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textEn',
      title: 'Verse Text (English)',
      type: 'text',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Imagen de Fondo (Opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha del Versículo',
      type: 'datetime',
      description: 'El versículo que se muestra es el que tiene la fecha más reciente que sea menor o igual a hoy.',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'reference',
      subtitle: 'publishedAt',
      media: 'featuredImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sin referencia',
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Sin fecha',
        media,
      }
    }
  }
})
