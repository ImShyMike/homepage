<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>404 - Post Not Found</title>
</svelte:head>

<div class="py-16 text-center">
	<h1 class="text-mauve mb-4 text-8xl font-bold">404</h1>
	<h2 class="text-text mb-2 text-2xl font-semibold">Post Not Found</h2>
	<p class="text-subtext1 mb-8">
		{page.error?.message || 'The post you are looking for does not exist.'}
	</p>

	<div class="space-x-4">
		<a href="/blog" class="text-blue hover:text-sapphire transition-colors"> ← Back to Posts </a>
		<span class="text-overlay0">•</span>
		<a href="/" class="text-blue hover:text-sapphire transition-colors"> Go Home </a>
	</div>
</div>
