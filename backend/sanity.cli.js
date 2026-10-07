import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '74l2lf69',
    dataset: 'production'
  },
  studioHost: 'modena-film-festival',
  deployment: {
    appId: 'qhn6cb64pmy4wgcrrcg5q8wh',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: false,
  }
})
