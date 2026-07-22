import { defineType, defineField } from 'sanity';

export const connectionCard = defineType({
  name: 'connectionCard',
  title: 'Connection Cards',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'zip',
      title: 'Zip Code',
      type: 'string',
    }),
    defineField({
      name: 'maritalStatus',
      title: 'Marital Status',
      type: 'string',
      options: {
        list: [
          { title: 'Married', value: 'married' },
          { title: 'Single', value: 'single' },
        ],
      },
    }),
    defineField({
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'I want to visit the church', value: 'visit' },
          { title: 'I am new to the neighborhood', value: 'new_in_town' },
          { title: 'I would like a home visit', value: 'home_visit' },
          { title: 'I would like to belong to the church', value: 'membership' },
        ],
      },
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      date: 'submittedAt',
    },
    prepare({ title, subtitle, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      return {
        title,
        subtitle: `${formattedDate} - ${subtitle || 'No email'}`,
      };
    },
  },
});
