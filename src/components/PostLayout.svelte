<script>
	export let title = '';
	export let date = '';
</script>

<article class="prose prose-lg mx-auto max-w-4xl">
	{#if title}
		<h1 class="mb-4 text-ctp-text">{title}</h1>
	{/if}

	<div class="metadata mb-6 text-sm text-ctp-subtext0">
		{#if date}
			<p class="date">Published: {date}</p>
		{/if}
	</div>

	<div class="content">
		<slot />
	</div>
</article>

<style>
	.metadata {
		border-bottom: 1px solid var(--surface1);
		padding-bottom: 1rem;
	}

	.prose {
		color: var(--text);
	}
	
	.prose :global(h1),
	.prose :global(h2), 
	.prose :global(h3),
	.prose :global(h4),
	.prose :global(h5),
	.prose :global(h6) {
		color: var(--text);
	}
	
	.prose :global(p) {
		color: var(--subtext1);
	}
	
	.prose :global(a) {
		color: var(--accent);
		text-decoration: none;
	}
	
	.prose :global(a:hover) {
		color: var(--blue);
		text-decoration: underline;
	}
	
	.prose :global(code) {
		background-color: var(--surface0);
		color: var(--green);
		padding: 0.2em 0.4em;
		border-radius: 0.25rem;
	}
	
	.prose :global(pre) {
		background-color: var(--surface0);
		border: 1px solid var(--surface1);
	}
	
	.prose :global(blockquote) {
		border-left: 4px solid var(--accent);
		background-color: var(--surface0);
		color: var(--subtext1);
	}
</style>
