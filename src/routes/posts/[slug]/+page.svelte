<script lang="ts">
	import type { PostMeta } from '$lib';
	import type { Component } from 'svelte';

	export let data: {
		meta: PostMeta;
		Content: Component;
	};
</script>

<article>
	<svelte:component this={data.Content} />
</article>
