<script lang="ts">
	import type { GitHubRepoList } from '$lib/github/github.d';
	import type { Post } from '$lib/posts/posts';

	import GithubRepoCard from '$components/GithubRepoCard.svelte';

	export let data: {
		repos: GitHubRepoList;
		posts: Post[];
	};
</script>

<div>
	{#if data.repos.length > 0}
		<div class="mx-0.5 sm:mx-1 md:mx-8">
			<h2 class="text-ctp-text mb-6 text-center text-2xl font-semibold">GitHub Repositories</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-3">
				{#each data.repos as repo (repo.id)}
					<GithubRepoCard {repo} posts={data.posts} />
				{/each}
			</div>
		</div>
	{:else}
		<div class="py-12 text-center">
			<p class="text-ctp-subtext1">No repositories found.</p>
		</div>
	{/if}
</div>
