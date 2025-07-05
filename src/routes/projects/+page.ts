import type { PageLoad } from './$types';
import { GithubData } from '$lib';
import { getRepos } from '$lib/github';
import { loadPosts } from '$lib/posts';

export const load: PageLoad = async () => {
	const [posts, allRepos] = await Promise.all([loadPosts(), getRepos(GithubData.name)]);

	const repos = allRepos
		.filter((repo) => !repo.fork && repo.description)
		.sort((a, b) => (a.stargazers_count < b.stargazers_count ? 1 : -1))
		.slice(0, 12);

	return { repos, posts };
};

export const prerender = true;
