<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { getSwitcherContext } from '$lib/context/switcher-context.svelte';

	const switcherId = crypto.randomUUID();
	const switcherContext = getSwitcherContext();

	let {
		isOpen = $bindable(false),
		disabled = false,
		dropdownClass = '',
		buttonClass = '',
		containerClass = 'relative',
		ariaLabel = 'Open menu',
		button: buttonSnippet,
		dropdown: dropdownSnippet
	}: {
		isOpen?: boolean;
		disabled?: boolean;
		dropdownClass?: string;
		buttonClass?: string;
		containerClass?: string;
		ariaLabel?: string;
		button?: Snippet;
		dropdown?: Snippet;
	} = $props();

	$effect(() => {
		if (switcherContext) {
			const contextOpen = switcherContext.currentlyOpen === switcherId;
			if (isOpen !== contextOpen) {
				isOpen = contextOpen;
			}
		}
	});

	function toggleDropdown() {
		if (!disabled) {
			if (switcherContext) {
				if (isOpen) {
					switcherContext.closeSwitcher(switcherId);
				} else {
					switcherContext.openSwitcher(switcherId);
				}
			} else {
				isOpen = !isOpen;
			}
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (switcherContext) {
				switcherContext.closeAll();
			} else {
				isOpen = false;
			}
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.switcher-container')) {
			if (switcherContext) {
				switcherContext.closeAll();
			} else {
				isOpen = false;
			}
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

<div class="switcher-container {containerClass}">
	<button
		onclick={toggleDropdown}
		class="cursor-pointer transition-colors focus:outline-none {buttonClass}"
		aria-expanded={isOpen}
		aria-haspopup="true"
		aria-label={ariaLabel}
		{disabled}
	>
		{@render buttonSnippet?.()}
	</button>

	{#if isOpen}
		<div
			class="bg-ctp-surface0 ring-ctp-overlay0 ring-opacity-50 absolute right-0 z-50 mt-2 overflow-hidden rounded-lg shadow-lg ring-1 {dropdownClass}"
		>
			{@render dropdownSnippet?.()}
		</div>
	{/if}
</div>
