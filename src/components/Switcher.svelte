<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

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

	function toggleDropdown() {
		if (!disabled) {
			isOpen = !isOpen;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.switcher-container')) {
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
