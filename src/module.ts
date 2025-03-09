import { defineNuxtModule, addPlugin, createResolver, addComponentsDir } from '@nuxt/kit'

import { name, version } from '../package.json'
// Module options TypeScript interface definition
export interface ModuleOptions {
  isGlobal?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'nuxt-zoom-gallery',
  },

  //
  // Default configuration options of the Nuxt module
  defaults: {
    isGlobal: false,
  },
  setup(options) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // nuxt.options.css = nuxt.options.css || [];
    // nuxt.options.css.push("vue-zoom-gallery/dist/vue-zoom-gallery.css")

    addComponentsDir({
      path: resolver.resolve('runtime/components'),
      global: options.isGlobal,
    })
  },
})
