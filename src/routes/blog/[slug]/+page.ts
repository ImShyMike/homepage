import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { PostModule } from '$lib/posts/posts';

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob<PostModule>('$lib/content/*.svx', { eager: true });
	const match = Object.entries(modules).find(([path]) => path.endsWith(`${params.slug}.svx`));

	if (!match) {
		throw error(404, `Post "${params.slug}" does not exist.`);
	}

	const { metadata, default: Content } = match[1];
	return { meta: metadata, Content };
};

export const prerender = true;
