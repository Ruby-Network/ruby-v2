import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import robotsTxt from 'astro-robots-txt';
import partytown from '@astrojs/partytown';
import dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
    integrations: [prefetch(), tailwind(), react(), robotsTxt(), partytown()],
    site: process.env.URL,
    output: 'server',
    adapter: node({
        mode: 'middleware',
    }),
});
