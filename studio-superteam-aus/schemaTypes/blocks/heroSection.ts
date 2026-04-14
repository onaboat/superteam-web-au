import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'headlineLine1',
      title: 'Headline line 1',
      type: 'string',
      initialValue: "Australia's Home",
    }),
    defineField({
      name: 'headlineLine2Prefix',
      title: 'Text before Solana logo',
      type: 'string',
      initialValue: 'for',
    }),
    defineField({
      name: 'headlineLine3',
      title: 'Headline line 3 (italic)',
      type: 'string',
      initialValue: 'Builders',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
      initialValue:
        'Accelerating founders, creatives & institutions driving internet capital markets on Solana',
    }),
  ],
  preview: {
    select: {
      line1: 'headlineLine1',
      tagline: 'tagline',
    },
    prepare({line1, tagline}) {
      return {
        title: 'Hero',
        subtitle: line1 || tagline,
      }
    },
  },
})
