// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Used for canonical URLs, Open Graph tags and the sitemap.
  site: 'https://kiwiandcode.co.uk',
  // Static HTML output: exactly what Cloudflare Pages wants.
  output: 'static',
  // Example sites and the form's thank-you/problem pages are noindex, so keep them out of the sitemap too.
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/examples/') && !page.includes('/contact/sent/') && !page.includes('/contact/problem/'),
    }),
  ],
});
