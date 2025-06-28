<script lang="ts">
	export let title = '';
	export let date = '';
</script>

<article class="prose prose-lg mx-auto max-w-4xl">
	{#if title}
		<h1 class="text-ctp-text mb-4">{title}</h1>
	{/if}

	<div class="text-ctp-subtext0 mb-6 border-b border-[var(--surface1)] pb-4 text-sm">
		{#if date}
			<p class="date pl-1">Published: {date}</p>
		{/if}
	</div>

	<div class="content">
		<slot />
	</div>
</article>

<style>
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
		position: relative;
	}

	.prose :global(a::after) {
		content: '';
		transform: translateX(-50%);
		transition: width 200ms ease-in-out;
		background-color: var(--accent);
		position: absolute;
		bottom: 4px;
		left: 50%;
		height: 1px;
		width: 0;
	}

	.prose :global(a:hover::after) {
		width: 100%;
	}

	.prose :global(code) {
		background-color: var(--surface0);
		color: var(--green);
		padding: 0.2em 0.4em;
		border-radius: 0.25rem;
		font-size: 0.875em;
	}

	.prose :global(pre) {
		background-color: var(--surface0);
		border: 1px solid var(--surface1);
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1.5em 0;
	}

	.prose :global(pre code) {
		background-color: transparent;
		padding: 0;
		border-radius: 0;
		font-size: inherit;
	}

	.prose :global(blockquote) {
		border-left: 4px solid var(--accent);
		background-color: color-mix(in srgb, var(--surface0) 50%, transparent 50%);
		color: var(--subtext1);
		padding: 0.01rem 1rem !important;
		margin: 1rem 0 !important;
	}

	.prose :global(strong),
	.prose :global(b) {
		color: var(--text);
		font-weight: bold;
	}

	.prose :global(em),
	.prose :global(i) {
		color: var(--text);
		font-style: italic;
	}

	.prose :global(mark) {
		background-color: var(--yellow);
		color: var(--base);
		padding: 0.1em 0.2em;
	}

	.prose :global(del),
	.prose :global(s) {
		color: var(--subtext0);
		text-decoration: line-through;
	}

	.prose :global(ins),
	.prose :global(u) {
		color: var(--green);
		text-decoration: underline;
	}

	.prose :global(small) {
		color: var(--subtext0);
		font-size: 0.875em;
	}

	.prose :global(kbd) {
		background-color: var(--surface1);
		color: var(--text);
		border: 1px solid var(--surface2);
		border-radius: 0.25rem;
		padding: 0.1em 0.3em;
		font-family: monospace;
		font-size: 0.9em;
	}

	.prose :global(abbr) {
		color: var(--text);
		text-decoration: underline dotted;
		cursor: help;
	}

	.prose :global(sub),
	.prose :global(sup) {
		color: var(--subtext1);
		font-size: 0.75em;
	}

	.prose :global(table) {
		border-collapse: collapse;
		width: 100%;
		margin: 1.5em 0;
		border: 1px solid var(--surface1);
	}

	.prose :global(th),
	.prose :global(td) {
		border: 1px solid var(--surface1);
		padding: 0.75rem;
		text-align: left;
	}

	.prose :global(th) {
		background-color: var(--surface0);
		color: var(--text);
		font-weight: bold;
	}

	.prose :global(td) {
		color: var(--subtext1);
	}

	.prose :global(tbody tr:nth-child(even)) {
		background-color: var(--surface0);
	}

	.prose :global(tbody tr:hover) {
		background-color: var(--surface1);
	}
</style>
