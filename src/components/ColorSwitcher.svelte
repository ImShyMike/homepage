<script lang="ts">
	import { onMount } from 'svelte';
	import Switcher from './Switcher.svelte';
	import { accents, accent } from '$lib';

	let isOpen = $state(false);
	let currentColor = $state('mauve');

	function setAccentColor(colorName: string) {
		document.documentElement.style.setProperty('--accent', `var(--${colorName})`);
		accent.set(colorName);
		currentColor = colorName;
		isOpen = false;
	}

	$effect(() => {
		const unsubscribe = accent.subscribe((value) => {
			currentColor = value;
			document.documentElement.style.setProperty('--accent', `var(--${value})`);
		});
		return unsubscribe;
	});

	onMount(() => {
		accent.init();
	});
</script>

<Switcher
	bind:isOpen
	buttonClass="bg-ctp-surface0 relative flex h-8 w-8 items-center justify-center rounded-full p-0 transition-all duration-200 hover:scale-110"
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
		<div class="bg-ctp-mantle flex flex-wrap items-center justify-center rounded-lg p-4 shadow-md">
			{#each accents as color (color)}
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
