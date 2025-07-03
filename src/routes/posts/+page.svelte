<script lang="ts">
	import type { Post } from '$lib/posts/posts';
	export let data: { posts: Post[] };
</script>

<div>
	<h2 class="text-ctp-text mb-6 text-center text-2xl font-semibold">Posts</h2>
	<div class="flex w-full max-w-4xl flex-col items-center space-y-4">
		{#if data.posts.length === 0}
			<p class="text-ctp-subtext1">No posts available.</p>
		{/if}
		{#each data.posts as { meta, slug } (slug)}
			<a
				class="hover-text-glow min-w-1xl sm:min-w-1xl block w-full max-w-3xl md:min-w-2xl"
				href={`/posts/${slug}`}
			>
				<div
					class="box small-box-glow border-ctp-surface1 hover:border-ctp-accent group smooth-border-transition flex w-full flex-col rounded-lg border p-4"
				>
					<div class="mb-1 text-left text-xl font-medium">
						<span class="hover-text-glow inline-block">{meta.title}</span>
					</div>
					<span class="text-ctp-text mb-2 text-left">{meta.description}</span>
					<small class="text-ctp-text text-left opacity-75"
						>{new Date(meta.date).toLocaleDateString()}</small
					>
				</div>
			</a>
		{/each}
	</div>
</div>
