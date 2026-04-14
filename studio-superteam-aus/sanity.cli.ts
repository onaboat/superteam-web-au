import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'bhh819h2',
    dataset: 'production'
  },
  deployment: {
    /** Sanity-hosted Studio app (from first `sanity deploy`). */
    appId: 's1v58b19luj6hrcj147kcevu',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
