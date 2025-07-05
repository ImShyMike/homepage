import type { PageLoad } from './$types';
import { loadPosts } from '$lib/posts';

export const load: PageLoad = async () => {
	const posts = await loadPosts();
	return { posts };
};

export const prerender = true;
