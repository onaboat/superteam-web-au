import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Drag blocks to change order. Only blocks listed here appear on the site.',
      type: 'array',
      of: [
        {type: 'heroSection'},
        {type: 'tickerSection'},
        {type: 'whatWeDoSection'},
        {type: 'eventsSection'},
        {type: 'buildersSection'},
        {type: 'communitySection'},
        {type: 'faqSection'},
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home page'}),
  },
})
