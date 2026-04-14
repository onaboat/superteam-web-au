import {defineField, defineType} from 'sanity'

export const tickerSection = defineType({
  name: 'tickerSection',
  title: 'Ticker',
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
    prepare: () => ({title: 'Ticker'}),
  },
})
