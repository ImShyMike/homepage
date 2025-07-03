<script lang="ts">
	import { PUBLIC_COMMIT_SHA } from '$env/static/public';
	import { GithubData, Socials } from '$lib';
	import { getUmamiStats } from '$lib/analytics/umami';
	import { onMount } from 'svelte';
	import GitCommit from 'virtual:icons/tabler/git-commit';
	import GithubIcon from 'virtual:icons/tabler/brand-github';
	import BlueskyIcon from 'virtual:icons/tabler/brand-bluesky';

	const userUrl = `https://github.com/${GithubData.name}`;
	const commitSha = PUBLIC_COMMIT_SHA == '$CF_PAGES_COMMIT_SHA' ? undefined : PUBLIC_COMMIT_SHA;
	const shortHash = commitSha ? commitSha.slice(0, 7) : 'dev';
	const gitCommitUrl = commitSha ? `${userUrl}/${GithubData.repo}/commit/${commitSha}` : '';

	let views = $state(0);

	onMount(async () => {
		try {
			const stats = await getUmamiStats();
			if (stats) {
				views = stats.pageviews.value || 0;
			} else {
				console.warn('No Umami stats available');
			}
		} catch (error) {
			console.error('Error fetching Umami stats:', error);
		}
	});
</script>

{#snippet spacer()}<span class="bold text-ctp-surface1">|</span>{/snippet}

<footer class="flex justify-center">
	<div class="bg-ctp-mantle border-ctp-surface1 mx-4 mb-3 rounded-lg border px-6 py-3 shadow-lg">
		<div class="flex flex-row items-center justify-between gap-4">
			<a
				href={gitCommitUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="low-line text-ctp-text hover:text-ctp-accent flex items-center transition-colors"
			>
				<GitCommit class="mr-1 h-5 w-5" /><span>{shortHash}</span>
			</a>
			{@render spacer()}
			<span class="text-ctp-text flex items-center">
				{views.toLocaleString()} views
			</span>
			{@render spacer()}
			<div class="flex flex-row gap-1 text-center">
				<a
					href={userUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-ctp-text hover:text-ctp-accent flex items-center transition-colors"
				>
					<GithubIcon class="mr-1 h-5.5 w-5.5" />
				</a>
				<a
					href={Socials.bluesky}
					target="_blank"
					rel="noopener noreferrer"
					class="text-ctp-text hover:text-ctp-accent flex items-center transition-colors"
				>
					<BlueskyIcon class="mr-1 h-5.5 w-5.5" />
				</a>
			</div>
		</div>
	</div>
</footer>
