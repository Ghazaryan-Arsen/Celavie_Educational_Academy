import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE_URL } from './src/config/site.ts'
import catalog from './src/i18n/catalog.json' with { type: 'json' }

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'celavie-sharing-metadata',
    transformIndexHtml() {
      const title = catalog['Languages, SMM & International Programs'][0] + ' | CELAVIE';
      const description = catalog['Explore language courses, SMM training and the Nice Exchange program at CELAVIE Educational Academy in Yerevan.'][0];
      return [
        { tag: 'meta', attrs: { name: 'description', content: description } },
        { tag: 'meta', attrs: { property: 'og:title', content: title } },
        { tag: 'meta', attrs: { property: 'og:description', content: description } },
        { tag: 'meta', attrs: { property: 'og:url', content: SITE_URL + '/' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'CELAVIE Educational Academy' } },
        { tag: 'meta', attrs: { property: 'og:locale', content: 'hy_AM' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
        { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
        { tag: 'meta', attrs: { name: 'twitter:description', content: description } },
      ];
    },
  }],
})
