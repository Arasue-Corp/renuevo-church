import { defineField, defineType } from 'sanity'

export const hombresDeAltarRegistrationType = defineType({
  name: 'hombresDeAltarRegistration',
  title: 'Registro Hombres de Altar',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'apellido',
      title: 'Apellido',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'edad',
      title: 'Edad',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'iglesia',
      title: 'Iglesia a la que pertenece',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'telefono',
      title: 'Teléfono',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email (Opcional)',
      type: 'string',
    }),
    defineField({
      name: 'tallaCamiseta',
      title: 'Talla de Camiseta',
      type: 'string',
      options: {
        list: [
          { title: 'XS', value: 'XS' },
          { title: 'S', value: 'S' },
          { title: 'M', value: 'M' },
          { title: 'L', value: 'L' },
          { title: 'XL', value: 'XL' },
          { title: 'XXL', value: 'XXL' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
})
