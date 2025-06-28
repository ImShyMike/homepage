<script lang="ts">
	import { languageColors, type GitHubRepo } from '$lib';

	import Star from 'virtual:icons/mdi/star.svg';
	import Github from 'virtual:icons/mdi/github.svg';
	import Link from 'virtual:icons/mdi/link.svg';

	interface Props {
		repo: GitHubRepo;
	}

	let { repo }: Props = $props();
</script>

<div
	class="bg-ctp-surface0 border-ctp-surface1 hover:border-ctp-accent group flex flex-row rounded-lg border p-6 no-underline transition-colors duration-200"
>
	<div class="items-left mr-3 flex flex-1 flex-col justify-between">
		<div class="mb-3 flex items-start justify-between">
			<h3 class="text-ctp-text text-lg font-medium transition-colors">
				{repo.name}
			</h3>
		</div>
		{#if repo.description}
			<p class="text-ctp-subtext0 mb-3 line-clamp-2 text-sm">
				{repo.description}
			</p>
		{/if}
		{#if repo.topics && repo.topics.length > 0}
			<div class="mb-3 flex max-h-[80px] flex-wrap gap-2 overflow-y-auto">
				{#each repo.topics as topic (topic)}
					<span
						class="bg-ctp-surface1 text-ctp-text overflow-hidden rounded-full px-2 py-1 text-xs text-ellipsis whitespace-nowrap"
						style="max-width: 150px;"
						title={topic}
					>
						{topic.length > 11 ? `${topic.substring(0, 11)}...` : topic}
					</span>
				{/each}
			</div>
		{/if}
		<div class="text-ctp-subtext1 mt-auto flex items-center space-x-4 text-xs">
			{#if repo.language}
				<span class="flex items-center space-x-1">
					<div
						class="bg-ctp-blue h-3 w-3 rounded-full"
						style="background-color: {repo.language in languageColors
							? languageColors[repo.language]
							: ''}"
					></div>
					<span>{repo.language}</span>
				</span>
			{/if}
			{#if repo.stargazers_count > 0}
				<span class="flex items-center space-x-1">
					<Star class="text-ctp-yellow h-4 w-4" />
					<span>{repo.stargazers_count}</span>
				</span>
			{/if}
		</div>
	</div>
	<div class="flex flex-shrink-0 flex-col items-center justify-start space-y-3">
		<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
			<Github class="text-ctp-subtext1 hover:text-ctp-accent h-5.5 w-5.5" />
		</a>
		{#if repo.homepage}
			<a href={repo.homepage} target="_blank" rel="noopener noreferrer">
				<Link class="text-ctp-subtext1 hover:text-ctp-accent h-5.5 w-5.5" />
			</a>
		{/if}
	</div>
</div>
