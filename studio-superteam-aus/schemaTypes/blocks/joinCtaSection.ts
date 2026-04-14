import {defineField, defineType} from 'sanity'

export const joinCtaSection = defineType({
  name: 'joinCtaSection',
  title: 'Join CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Ready to join',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
      initialValue: 'Everything you need to know about Superteam Australia.',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ctaButton',
          title: 'Button',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Use /path for internal links or https://... for external',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'external',
              title: 'Open in new tab',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
      initialValue: [
        {label: 'Get Involved', href: '/get-involved', external: false},
        {label: 'Join Telegram', href: 'https://t.me/SuperteamAU', external: true},
        {label: 'Follow on X', href: 'https://x.com/SuperteamAU', external: true},
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare: ({headline}) => ({
      title: 'Join CTA',
      subtitle: headline || 'Ready to join',
    }),
  },
})
