<script lang="ts">
	import { languageColors } from '$lib/github/github';
	import type { GitHubRepo } from '$lib/github/github.d';
	import { accents } from '$lib/theme/theme';

	import Star from 'virtual:icons/mdi/star.svg';
	import Github from 'virtual:icons/mdi/github.svg';
	import Link from 'virtual:icons/mdi/link.svg';
	import Tag from 'virtual:icons/mdi/tag.svg';

	function getColorForTopic(topic: string): string {
		let hash = 0;
		for (let i = 0; i < topic.length; i++) {
			const char = topic.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash;
		}
		const index = Math.abs(hash) % accents.length;
		return accents[index];
	}

	interface Props {
		repo: GitHubRepo;
	}

	let { repo }: Props = $props();
</script>

<div class="group p-2">
	<div
		class="box small-box-glow smooth-border-transition border-ctp-surface1 group-hover:border-ctp-accent flex h-full flex-row rounded-lg border p-6 no-underline transition-colors duration-200"
	>
		<div class="items-left mr-3 flex flex-1 flex-col justify-between">
			<div class="mb-2 flex items-start justify-between">
				<h3 class="text-ctp-text text-lg font-medium transition-colors">
					{repo.name}
				</h3>
			</div>
			{#if repo.description}
				<p class="text-ctp-subtext0 mb-2 line-clamp-2 text-sm">
					{repo.description}
				</p>
			{/if}
			{#if repo.topics && repo.topics.length > 0}
				<div class="mb-2 flex max-h-[80px] flex-wrap items-center gap-2 overflow-y-auto">
					<Tag class="text-ctp-text h-5 w-5 text-center align-middle" />
					{#if repo.topics.length > 3}
						<span class="text-ctp-subtext1 text-xs">
							{repo.topics.length} topics
						</span>
					{/if}
					{#each repo.topics as topic (topic)}
						<span
							class="text-ctp-mantle overflow-hidden rounded-full px-2 py-1 text-xs text-ellipsis whitespace-nowrap"
							style="max-width: 150px; background-color: color-mix(in srgb, var(--{getColorForTopic(
								topic
							)}) 85%, transparent 15%);"
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
</div>

<style>
	.box {
		background-color: color-mix(in srgb, var(--accent) 5%, transparent 95%);
	}
</style>
