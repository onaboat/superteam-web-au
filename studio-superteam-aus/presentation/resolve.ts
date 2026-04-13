import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

/** Live site origin for Presentation iframe + draft-mode (must match deployed Next app). */
const productionPreviewOrigin = 'https://superteam-aus-web.vercel.app'

const previewOrigin =
  typeof process !== 'undefined' && process.env.SANITY_STUDIO_PREVIEW_ORIGIN
    ? process.env.SANITY_STUDIO_PREVIEW_ORIGIN
    : process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : productionPreviewOrigin

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
