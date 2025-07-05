<script lang="ts">
	import { onMount } from 'svelte';
	import { GithubData } from '$lib';
	import { getRepos } from '$lib/github';

	let stars = $state(0);
	let repoCount = $state(0);

	onMount(async () => {
		try {
			const repos = (await getRepos(GithubData.name)).filter((repo) => !repo.fork);
			repoCount = repos.length;
			stars = repos.reduce(
				(total, repo) => total + ((repo.stargazers_count != 1 ? repo.stargazers_count : 0) || 0),
				0
			);
		} catch (err) {
			console.log(err instanceof Error ? err.message : 'An error occurred');
		}
	});
</script>

<div class="space-y-8">
	<section class="text-center">
		<h1 class="text-ctp-text mb-4 font-sans text-4xl font-bold">
			Hi, I'm <span class="text-ctp-accent text-glow">shymike</span>
		</h1>
		<p class="text-ctp-subtext0 mx-auto max-w-4xl text-lg">
			Student who likes coding and gaming :D
		</p>
	</section>

	<section class="text-center">
		<p>
			I've worked on various projects and have amassed <span class="text-ctp-yellow font-bold"
				>{stars}</span
			>
			stars across <span class="text-ctp-yellow font-bold">{repoCount}</span> repositories on GitHub.
		</p>
		<br />
		<button
			onclick={() => {
				const img = document.querySelector('img');
				if (img) {
					img.src = `https://cataas.com/cat?${new Date().getTime()}`;
				}
			}}
			data-umami-event="cat-button-click"
		>
			I want another cat picture!
		</button>
		<br />
		<img
			src="https://cataas.com/cat"
			alt="A cute cat"
			class="mx-auto mt-4 rounded-lg shadow-lg"
			width="400"
			height="400"
		/>
	</section>
</div>
