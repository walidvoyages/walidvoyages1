
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://walidvoyages.github.io',
  base: '/walidvoyages1',
  trailingSlash: 'always',
  integrations: [sitemap()]
});
