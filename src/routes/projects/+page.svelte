<script lang="ts">
	import { onMount } from 'svelte';
	import { GithubData } from '$lib';
	import { getRepos } from '$lib/github/github';
	import type { GitHubRepoList } from '$lib/github/github.d';

	import ErrorIcon from 'virtual:icons/mdi/error.svg';

	import GithubRepoCard from '$components/GithubRepoCard.svelte';

	let repos: GitHubRepoList = [];
	let loading = false;
	let error = '';

	onMount(async () => {
		try {
			loading = true;
			repos = (await getRepos(GithubData.name))
				.filter((repo) => !repo.fork && repo.name !== GithubData.repo && repo.description)
				.sort((a, b) => {
					return a.stargazers_count < b.stargazers_count ? 1 : -1;
				})
				.slice(0, 12);
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	});
</script>

<div>
	{#if loading}
		<div class="flex items-center justify-center py-12">
			<div class="text-ctp-subtext1 flex items-center space-x-2">
				<span>Loading repositories...</span>
			</div>
		</div>
	{:else if error}
		<div class="bg-ctp-red/10 border-ctp-red/20 rounded-lg border p-4">
			<div class="flex items-center space-x-2">
				<ErrorIcon class="text-ctp-red mr-1 h-5 w-5" />
				<span class="text-ctp-red font-medium">Error: {error}</span>
			</div>
		</div>
	{:else if repos.length > 0}
		<div class="mx-0.5 sm:mx-1 md:mx-8">
			<h2 class="text-ctp-text mb-6 text-center text-2xl font-semibold">GitHub Repositories</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-3">
				{#each repos as repo (repo.id)}
					<GithubRepoCard {repo} />
				{/each}
			</div>
		</div>
	{:else}
		<div class="py-12 text-center">
			<p class="text-ctp-subtext1">No repositories found.</p>
		</div>
	{/if}
</div>
