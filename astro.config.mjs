import { defineConfig } from 'astro/config';

// https://astro.build/config
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
import node from '@astrojs/node';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
    integrations: [prefetch(), tailwind(), react(), robotsTxt()],
    output: 'server',
    adapter: node({
        mode: 'middleware',
    }),
});
