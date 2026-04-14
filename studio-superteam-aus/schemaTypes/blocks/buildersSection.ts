import {defineField, defineType} from 'sanity'

export const buildersSection = defineType({
  name: 'buildersSection',
  title: 'Builders',
  type: 'object',
  fields: [
    defineField({
      name: 'stub',
      title: 'Stub',
      type: 'boolean',
      initialValue: true,
      hidden: true,
    }),
  ],
  preview: {
    prepare: () => ({title: 'Builders'}),
  },
})
