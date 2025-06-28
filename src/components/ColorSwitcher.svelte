<script lang="ts">
	import { onMount } from 'svelte';
	import Switcher from './Switcher.svelte';

	let isOpen = $state(false);
	let currentColor = $state('mauve');

	const colors = [
		'rosewater',
		'flamingo',
		'pink',
		'mauve',
		'red',
		'maroon',
		'peach',
		'yellow',
		'green',
		'teal',
		'sky',
		'sapphire',
		'blue',
		'lavender'
	];

	function setAccentColor(colorName: string) {
		document.documentElement.style.setProperty('--accent', `var(--${colorName})`);
		currentColor = colorName;
		isOpen = false;
	}
</script>

<Switcher
	bind:isOpen
	buttonClass="bg-ctp-surface0 relative flex h-10 w-10 items-center justify-center rounded-full p-0 transition-all duration-200 hover:scale-110"
	dropdownClass="w-48"
	ariaLabel="Switch accent color"
>
	{#snippet button()}
		<div
			class="h-8 w-8 rounded-full transition-all duration-200"
			style="background-color: var(--{currentColor})"
		></div>
	{/snippet}

	{#snippet dropdown()}
		<div
			class="bg-ctp-surface0 flex flex-wrap items-center justify-center rounded-lg p-4 shadow-md"
		>
			{#each colors as color}
				<button
					class="m-1 h-8 w-8 rounded-full transition-all duration-200 hover:scale-110"
					style="background-color: var(--{color})"
					onclick={() => setAccentColor(color)}
					aria-label="Set accent color to {color}"
				></button>
			{/each}
		</div>
	{/snippet}
</Switcher>
