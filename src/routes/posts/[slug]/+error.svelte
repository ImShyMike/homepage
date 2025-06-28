<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>404 - Post Not Found</title>
</svelte:head>

<div class="text-center py-16">
	<h1 class="text-8xl font-bold text-mauve mb-4">404</h1>
	<h2 class="text-2xl font-semibold text-text mb-2">Post Not Found</h2>
	<p class="text-subtext1 mb-8">
		{page.error?.message || 'The post you are looking for does not exist.'}
	</p>
	
	<div class="space-x-4">
		<a href="/posts" class="text-blue hover:text-sapphire transition-colors">
			← Back to Posts
		</a>
		<span class="text-overlay0">•</span>
		<a href="/" class="text-blue hover:text-sapphire transition-colors">
			Go Home
		</a>
	</div>
</div>
