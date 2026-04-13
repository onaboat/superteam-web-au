import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {previewUrlConfig, presentationResolve} from './presentation/resolve'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'superteam-aus',

  projectId: 'bhh819h2',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    presentationTool({
      resolve: presentationResolve,
      previewUrl: previewUrlConfig,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
