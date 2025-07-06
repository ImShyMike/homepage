<script lang="ts">
	import { browser } from '$app/environment';
	export let title = '';
	export let date = '';
	export let project = '';
	export let edited = '';

	function goBack() {
		if (browser) {
			history.back();
		}
	}
</script>

<article class="prose prose-lg mx-auto max-w-6xl">
	{#if title}
		<button
			class="line hover-text-glow text-ctp-text hover:text-ctp-accent m-0 mb-6 flex cursor-pointer items-center gap-2 bg-transparent p-0"
			onclick={goBack}
			aria-label="Go back"
		>
			<!-- material-symbols:arrow-back-rounded -->
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
					fill="currentColor"
					d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
				/></svg
			>
			<span>Go Back</span>
		</button>
	{/if}

	{#if title}
		<div class="mb-4 border-t border-[var(--surface1)] pt-5">
			<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h1 class="title">{title}</h1>
				{#if project}
					<span
						class="text-ctp-accent bg-ctp-accent/10 border-ctp-accent/20 w-fit rounded-full border px-3 py-1 text-sm font-medium"
					>
						{project}
					</span>
				{/if}
			</div>
		</div>
	{/if}

	<div class="text-ctp-subtext0 mb-6 border-b border-[var(--surface1)] text-sm">
		{#if date}
			<p class="date pl-1">
				Published: {new Date(date).toLocaleDateString()}
				{#if edited}
					<span class="text-ctp-overlay1">(Edited: {new Date(edited).toLocaleDateString()})</span>
				{/if}
			</p>
		{/if}
	</div>

	<div class="content">
		<slot />
	</div>
</article>

<style>
	.prose .title {
		color: var(--accent) !important;
		margin: 0 !important;
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
