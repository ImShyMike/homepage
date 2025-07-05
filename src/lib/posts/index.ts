import type { Post, PostModule } from './posts.d';

export async function loadPosts(): Promise<Post[]> {
	// Glob-import all .svx files
	const modules = import.meta.glob<PostModule>('../../routes/posts/svx/*.svx', { eager: true });
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

	return posts;
}
