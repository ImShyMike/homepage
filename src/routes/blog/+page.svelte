<script lang="ts">
	import type { Post } from '$lib/posts/posts';
	export let data: { posts: Post[] };
</script>

<div class="flex flex-col items-center justify-center">
	<h2 class="text-ctp-text mb-6 text-center text-2xl font-semibold">Blog</h2>
	<div class="flex w-full max-w-4xl flex-col items-center space-y-4">
		{#if data.posts.length === 0}
			<p class="text-ctp-subtext1">No posts available.</p>
		{/if}
		{#each data.posts as { meta, slug } (slug)}
			<a
				class="hover-text-glow min-w-1xl sm:min-w-1xl block w-full max-w-3xl md:min-w-2xl"
				href={`/blog/${slug}`}
			>
				<div
					class="box small-box-glow border-ctp-surface1 hover:border-ctp-accent group smooth-border-transition flex w-full flex-col rounded-lg border p-4"
				>
					<div class="mb-1 flex items-center justify-between">
						<span class="hover-text-glow inline-block text-xl font-medium">{meta.title}</span>
						{#if meta.project}
							<span
								class="text-ctp-accent bg-ctp-accent/10 border-ctp-accent/20 rounded-full border px-2 py-1 text-xs font-medium"
							>
								{meta.project}
							</span>
						{/if}
					</div>
					<span class="text-ctp-text text-md mb-2 text-left">{meta.description}</span>
					<small class="text-ctp-text text-left opacity-75">
						{new Date(meta.date).toLocaleDateString()}
						{#if meta.edited}
							<span class="text-ctp-subtext1">
								(edited: {new Date(meta.edited).toLocaleDateString()})</span
							>
						{/if}
						{#if meta.tags && meta.tags.length > 0}
							<span class="text-ctp-text">-</span>
							<span class="text-ctp-accent">
								{#each meta.tags as tag, i (i)}
									{tag}{i < meta.tags.length - 1 ? ', ' : ''}
								{/each}
							</span>
						{/if}
					</small>
				</div>
			</a>
		{/each}
	</div>
</div>
