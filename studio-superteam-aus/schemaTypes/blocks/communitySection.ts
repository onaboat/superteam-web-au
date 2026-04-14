import {defineField, defineType} from 'sanity'

export const communitySection = defineType({
  name: 'communitySection',
  title: 'Community',
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
    prepare: () => ({title: 'Community'}),
  },
})
