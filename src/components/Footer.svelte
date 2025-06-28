<script lang="ts">
	import { PUBLIC_COMMIT_SHA } from '$env/static/public';
	import { GithubData } from '$lib';
	import GitCommit from 'virtual:icons/tabler/git-commit';

	const userUrl = `https://github.com/${GithubData.name}`;
	const commitSha = PUBLIC_COMMIT_SHA || '';
	const shortHash = commitSha ? commitSha.slice(0, 7) : 'dev';
	const gitCommitUrl = commitSha ? `${userUrl}/${GithubData.repo}/commit/${commitSha}` : '';
</script>

{#snippet spacer()}<span class="bold">|</span>{/snippet}

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
			<div class="text-center">
				<a
					href={userUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="low-line text-ctp-text hover:text-ctp-accent flex items-center transition-colors"
				>
					shymike
				</a>
			</div>
		</div>
	</div>
</footer>
