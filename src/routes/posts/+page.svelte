<script lang="ts">
	import type { Post } from '$lib';
	export let data: { posts: Post[] };
</script>

<div>
    <h2 class="text-ctp-text mb-6 text-2xl font-semibold text-center">Posts</h2>
    <div class="space-y-4 flex flex-col items-center w-full max-w-4xl mx-auto">
        {#if data.posts.length === 0}
            <p class="text-ctp-subtext1">No posts available.</p>
        {/if}
        {#each data.posts as { meta, slug } (slug)}
            <a class="hover-text-glow block w-full max-w-2xl" href={`/posts/${slug}`}>
                <div class="box small-box-glow border-ctp-surface1 hover:border-ctp-accent group flex flex-col rounded-lg border p-4 smooth-border-transition w-full">
                    <div class="text-left text-xl font-medium mb-1">
                        <span class="hover-text-glow inline-block">{meta.title}</span>
                    </div>
                    <span class="text-left text-ctp-text mb-2">{meta.description}</span>
                    <small class="text-left text-ctp-text opacity-75">{new Date(meta.date).toLocaleDateString()}</small>
                </div>
            </a>
        {/each}
    </div>
</div>
