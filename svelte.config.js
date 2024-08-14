// import { config } from 'dotenv';
// config(); // Ensure environment variables are loaded
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        alias: {
            $str: './src/store',
            $db: './src/db',
            $lib: './src/lib',
            $routes: './src/routes',
            $comp: './src/lib/components',
            $api: './src/routes/api',
						$env: './src/env'
        }
    }
};

export default config;