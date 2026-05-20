// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

const site = process.env.PUBLIC_SITE_URL || 'https://stew-of-stars.llll-ll.com'

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => page === `${site}/`,
      changefreq: 'monthly',
      priority: 1.0,
      lastmod: new Date(),
    }),
  ],
})
