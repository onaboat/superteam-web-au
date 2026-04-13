import {defineField, defineType} from 'sanity'

export const whatWeDoSection = defineType({
  name: 'whatWeDoSection',
  title: 'What we do',
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
    prepare: () => ({title: 'What we do'}),
  },
})
