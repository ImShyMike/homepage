<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} - {page.error?.message}</title>
</svelte:head>

<div class="py-16 text-center">
	<h1 class="text-mauve mb-4 text-8xl font-bold">{page.status}</h1>
	<h2 class="text-text mb-2 text-2xl font-semibold">{page.error?.message}</h2>

	<div class="space-x-4">
		<a href="/" class="line transition-colors"> Go Home </a>
	</div>
</div>
