<script lang="ts">
	import { theme, themes } from '$lib';
	import type { CatppuccinTheme } from '$lib';
	import { onMount } from 'svelte';
	import Check from 'virtual:icons/mdi/check.svg';
	import Arrow from 'virtual:icons/mdi/chevron-down.svg';

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

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.theme-switcher')) {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="theme-switcher relative">
	<button
		onclick={toggleDropdown}
		class="bg-ctp-surface0 text-ctp-text hover:bg-ctp-surface1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none {isTransitioning ? 'opacity-75' : ''}"
		aria-expanded={isOpen}
		aria-haspopup="true"
		disabled={isTransitioning}
	>
		<span class="text-base">{themes[currentTheme].emoji}</span>
		<span class="hidden sm:inline">{themes[currentTheme].name}</span>
		<Arrow class="h-5 w-5 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" />
	</button>

	{#if isOpen}
		<div
			class="bg-ctp-surface0 ring-ctp-overlay0 ring-opacity-50 absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg shadow-lg ring-1"
		>
			<div role="menu">
				{#each Object.entries(themes) as [themeKey, themeInfo]}
					<button
						onclick={() => selectTheme(themeKey as CatppuccinTheme)}
						class="text-ctp-text hover:bg-ctp-surface1 flex w-full items-center gap-3 rounded-none px-4 py-2 text-left text-sm transition-colors {currentTheme ===
						themeKey
							? 'bg-ctp-surface1'
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
		</div>
	{/if}
</div>
