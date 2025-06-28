<script lang="ts">
	import { theme, themes } from '$lib';
	import type { CatppuccinTheme } from '$lib';
	import { onMount } from 'svelte';
	import Check from 'virtual:icons/mdi/check.svg';
	import Arrow from 'virtual:icons/mdi/chevron-down.svg';
	import Switcher from './Switcher.svelte';

	let isOpen = $state(false);
	let currentTheme = $state<CatppuccinTheme>('mocha');
	let isTransitioning = $state(false);

	$effect(() => {
		const unsubscribe = theme.subscribe((value) => {
			currentTheme = value;
		});
		return unsubscribe;
	});

	onMount(() => {
		theme.init();
	});

	function selectTheme(selectedTheme: CatppuccinTheme) {
		isTransitioning = true;
		theme.set(selectedTheme);
		isOpen = false;

		setTimeout(() => {
			isTransitioning = false;
		}, 300);
	}
</script>

<Switcher
	bind:isOpen
	disabled={isTransitioning}
	buttonClass="bg-ctp-mantle text-ctp-text hover:bg-ctp-surface0 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium {isTransitioning
		? 'opacity-75'
		: ''}"
	dropdownClass="w-48"
	ariaLabel="Switch theme"
>
	{#snippet button()}
		<span class="text-base">{themes[currentTheme].emoji}</span>
		<span class="hidden sm:inline">{themes[currentTheme].name}</span>
		<Arrow class="h-5 w-5 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" />
	{/snippet}

	{#snippet dropdown()}
		<div role="menu">
			{#each Object.entries(themes) as [themeKey, themeInfo] (themeKey)}
				<button
					onclick={() => selectTheme(themeKey as CatppuccinTheme)}
					class="text-ctp-text bg-ctp-mantle hover:bg-ctp-surface0 flex w-full items-center gap-3 rounded-none px-4 py-2 text-left text-sm transition-colors {currentTheme ===
					themeKey
						? 'bg-ctp-surface0'
						: ''}"
					role="menuitem"
				>
					<span class="text-base">{themeInfo.emoji}</span>
					<span>{themeInfo.name}</span>
					{#if currentTheme === themeKey}
						<Check class="text-ctp-green ml-auto h-5 w-5" />
					{/if}
				</button>
			{/each}
		</div>
	{/snippet}
</Switcher>
