import {defineField, defineType} from 'sanity'

export const eventsSection = defineType({
  name: 'eventsSection',
  title: 'Events',
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
    prepare: () => ({title: 'Events'}),
  },
})
