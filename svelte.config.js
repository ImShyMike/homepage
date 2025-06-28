import { mdsvex } from 'mdsvex';
import cloudflare from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import rehypePrismPlus from 'rehype-prism-plus';

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
			},
			rehypePlugins: [rehypePrismPlus]
		})
	],
	kit: {
		adapter: cloudflare({
			config: './wrangler.toml',
			platformProxy: {
				environment: 'production',
				persist: true
			}
		}),
		alias: {
			$components: 'src/components',
			$static: 'static',
			$routes: 'src/routes'
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
