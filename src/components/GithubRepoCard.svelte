<script lang="ts">
	import { languageColors } from '$lib/github';
	import type { GitHubRepo } from '$lib/github/github.d';
	import type { Post } from '$lib/posts/posts';
	import { accents } from '$lib/theme';

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
		posts?: Post[];
	}

	let { repo, posts = [] }: Props = $props();

	const relatedPost = posts.find(
		(post) => post.meta.project?.toLowerCase() === repo.name.toLowerCase()
	);

	const isClickable = !!relatedPost;
</script>

<div class="group p-2">
	<svelte:element
		this={isClickable ? 'a' : 'div'}
		href={isClickable ? `/blog/${relatedPost.slug}` : undefined}
		class="box small-box-glow smooth-border-transition border-ctp-surface1 group-hover:border-ctp-accent flex h-full flex-row rounded-lg border p-6 no-underline transition-colors duration-200 {isClickable
			? 'clickable cursor-pointer'
			: ''}"
	>
		<div class="items-left flex flex-1 flex-col justify-between">
			<div class="flex flex-row">
				<div class="flex flex-1 flex-col">
					<div class="mb-2 flex items-start justify-between">
						<h3
							class="text-ctp-text text-lg font-medium transition-colors {isClickable
								? 'group-hover:text-ctp-accent'
								: ''}"
						>
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
				</div>
				<div class="flex flex-shrink-0 flex-col items-center justify-start space-y-3">
					<a
						href={repo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						data-umami-event="repo-link"
						data-umami-url={repo.html_url}
						title={repo.html_url}
					>
						<Github class="text-ctp-subtext1 hover:text-ctp-accent h-5.5 w-5.5" />
					</a>
					{#if repo.homepage}
						<a
							href={repo.homepage}
							target="_blank"
							rel="noopener noreferrer"
							data-umami-event="repo-homepage"
							data-umami-url={repo.homepage}
							title={repo.homepage}
						>
							<Link class="text-ctp-subtext1 hover:text-ctp-accent h-5.5 w-5.5" />
						</a>
					{/if}
				</div>
			</div>
			<div class="text-ctp-subtext1 mt-auto flex flex-row justify-between">
				<div class="flex items-center space-x-4 text-xs">
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
				{#if isClickable}
					<span class="text-ctp-accent rounded-full border px-2 py-1 text-xs font-medium">
						Post Available
					</span>
				{/if}
			</div>
		</div>
	</svelte:element>
</div>

<style>
	.box {
		background-color: color-mix(in srgb, var(--accent) 5%, transparent 95%);
	}

	.box:hover {
		background-color: color-mix(in srgb, var(--accent) 7%, transparent 93%);
	}

	.clickable {
		border-color: color-mix(in srgb, var(--yellow) 40%, transparent 60%);
	}

	.clickable:hover {
		border-color: var(--ctp-accent) !important;
	}
</style>
