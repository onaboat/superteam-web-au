import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

const previewOrigin =
  typeof process !== 'undefined' && process.env.SANITY_STUDIO_PREVIEW_ORIGIN
    ? process.env.SANITY_STUDIO_PREVIEW_ORIGIN
    : 'http://localhost:3000'

export const presentationResolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: [{route: '/', type: 'homePage'}],
  locations: {
    homePage: defineLocations({
      select: {
        id: '_id',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
  },
}

export const previewUrlConfig = {
  initial: previewOrigin,
  previewMode: {
    enable: '/api/draft-mode/enable' as const,
  },
}
