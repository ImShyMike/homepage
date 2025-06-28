// General variables
export const GithubData = {
	name: 'ImShyMike',
	repo: 'homepage'
};

export const WebsiteData = {
	name: 'ShyMike',
	description: 'My small little homepage',
	url: 'https://shymike.dev',
	tags: ['homepage', 'personal', 'blog']
};

// Github
export { getRepos, languageColors } from './github/github';
export type { GitHubRepoList, GitHubRepo } from './github/github.d';

// Theme
export { theme, themes, accents, accent } from './theme/theme';
export type { CatppuccinTheme } from './theme/theme.d';

// Posts
export type { PostMeta, Post, PostModule } from './posts/post.d';
