import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Pure Astro + Tailwind CSS v4 (via the official Vite plugin). No UI-framework
// islands — every interactive bit ships as a tiny vanilla <script>.
export default defineConfig({
  site: 'https://gxmzu.gujiakai.top',
  vite: {
    plugins: [tailwindcss()],
  },
});
