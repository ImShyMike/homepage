import type { PageLoad } from './$types';
import type { Post, PostModule } from '$lib';

export const load: PageLoad = async () => {
	// Glob‐import all .svx files
	const modules = import.meta.glob<PostModule>('./svx/*.svx', { eager: true });
	const posts: Post[] = Object.entries(modules).map(([path, mod]) => {
		const slug = path
			.split('/')
			.pop()!
			.replace(/\.svx$/, '');

		return {
			slug,
			meta: mod.metadata,
			component: mod.default
		};
	});

	posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

	return { posts };
};

export const prerender = true;
