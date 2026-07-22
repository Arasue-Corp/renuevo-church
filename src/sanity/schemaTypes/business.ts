import { defineField, defineType } from 'sanity'

export const businessType = defineType({
  name: 'business',
  title: 'Catálogo de Negocios',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Negocio',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categorías (Español)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoriesEn',
      title: 'Categorías (Inglés)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción (Español)',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Descripción (Inglés)',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Logo del Negocio',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email de Contacto',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Teléfono de Contacto',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Sitio Web',
      type: 'url',
    }),
    defineField({
      name: 'isApproved',
      title: 'Aprobado para mostrar',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
