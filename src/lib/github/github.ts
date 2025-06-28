import type { GitHubRepoList } from '$lib';

const getRepos = async (username: string): Promise<GitHubRepoList> => {
	const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
		headers: {
			Accept: 'application/vnd.github.v3+json'
		}
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch repos: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();
	return data as GitHubRepoList;
};

export const languageColors: Record<string, string> = {
	JavaScript: '#f1e05a',
	TypeScript: '#2b7489',
	HTML: '#e34c26',
	CSS: '#563d7c',
	Python: '#3572A5',
	Java: '#b07219',
	Rust: '#dea584',
	Bash: '#89e051',
	Markdown: '#083fa1',
	JSON: '#292929',
	Lua: '#000080',
	PowerShell: '#012456',
	React: '#61DAFB',
	Svelte: '#ff3e00',
	TailwindCSS: '#38bdf8',
	Ruby: '#701516',
	'AGS Script': '#B9D9FF'
};

export { getRepos };
