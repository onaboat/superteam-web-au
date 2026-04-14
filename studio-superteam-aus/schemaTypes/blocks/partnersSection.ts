import {defineField, defineType} from 'sanity'

export const partnersSection = defineType({
  name: 'partnersSection',
  title: 'Partners',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Ecosystem & Partners',
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'partner',
          title: 'Partner',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Website URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      partners: 'partners',
    },
    prepare: ({partners}) => ({
      title: 'Partners',
      subtitle: partners?.length ? `${partners.length} partner(s)` : 'No partners yet',
    }),
  },
})
