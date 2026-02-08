import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
    site: 'https://zums-stuff.github.io',
    base: '/CPCFI-Webpage',
    

    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
    },
    integrations: [
        starlight({
            title: "Zum's CPCFI Webpage",
            customCss: [
                './src/styles/custom.css',
                'katex/dist/katex.min.css',
            ],
            // 1. ELIMINADA LA LÍNEA 'defaultTheme' PARA EVITAR EL ERROR.
            // Tu CSS personalizado ya se encarga de que todo sea oscuro.

            components: {
                ThemeSelect: './src/components/HeaderBtn.astro',
            },
            
            logo: {
                src: './src/assets/CPCFI.png',
            },
            
            // 2. CORRECCIÓN: Ahora usamos corchetes [] (Array)
            social: [
                {
                    label: 'GitHub',
                    href: 'https://github.com/zums-stuff',
                    icon: 'github',
                },
            ],
            
            sidebar: [
                {
                    label: 'Bienvenida',
                    autogenerate: { directory: 'welcome' },
                },
                {
                    label: 'Introducción',
                    autogenerate: { directory: 'intro' }, 
                },
                {
                    label: 'Data Structures',
                    autogenerate: { directory: 'ds' },
                },
                {
                    label: 'Techniques',
                    autogenerate: { directory: 'techniques' },
                },
                {
                    label: 'Miscellaneous', 
                    autogenerate: { directory: 'misc' },
                },
                {
                    label: 'Binary Search', 
                    autogenerate: { directory: 'binary-search' },
                },
                {
                    label: 'Dynamic Programming', 
                    autogenerate: { directory: 'dp' },
                },
                {
                    label: 'Graph Theory', 
                    autogenerate: { directory: 'graphs' },
                },
                {
                    label: 'Math Theory', 
                    autogenerate: { directory: 'math' },
                },
                {
                    label: 'Range Queries', 
                    autogenerate: { directory: 'queries' },
                },
                {
                    label: 'Strings', 
                    autogenerate: { directory: 'strings' },
                },
                {
                    label: 'Trees', 
                    autogenerate: { directory: 'trees' },
                },
                {
                    label: 'Geometry', 
                    autogenerate: { directory: 'geometry' },
                },
                {
                    label: 'Appendix', 
                    autogenerate: { directory: 'appendix' },
                },
            ],
        }),
        react(),
    ],
});
