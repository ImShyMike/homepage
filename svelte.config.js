import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx', '.md'],
			smartypants: true,
			layout: {
				_: path.resolve(__dirname, 'src/components/PostLayout.svelte')
			}
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			$static: 'static',
			$routes: 'src/routes'
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
