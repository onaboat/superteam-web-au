import {defineField, defineType} from 'sanity'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ',
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
    prepare: () => ({title: 'FAQ'}),
  },
})
