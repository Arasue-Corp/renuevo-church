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
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: ['Alimentación', 'Servicios Profesionales', 'Salud', 'Construcción', 'Educación', 'Otros'],
      },
      validation: (rule) => rule.required(),
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
