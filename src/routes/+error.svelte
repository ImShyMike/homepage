<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} - {page.error?.message}</title>
</svelte:head>

<div class="text-center py-16">
	<h1 class="text-8xl font-bold text-mauve mb-4">{page.status}</h1>
	<h2 class="text-2xl font-semibold text-text mb-2">{page.error?.message}</h2>

	<div class="space-x-4">
		<a href="/" class="line transition-colors">
			Go Home
		</a>
	</div>
</div>
