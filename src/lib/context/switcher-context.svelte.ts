import { getContext, setContext } from 'svelte';

const SWITCHER_CONTEXT_KEY = Symbol('switcher-context');

export interface SwitcherContext {
	currentlyOpen: string | null;
	openSwitcher: (id: string) => void;
	closeSwitcher: (id: string) => void;
	closeAll: () => void;
}

export function createSwitcherContext() {
	let currentlyOpen = $state<string | null>(null);

	const context: SwitcherContext = {
		get currentlyOpen() {
			return currentlyOpen;
		},
		openSwitcher(id: string) {
			currentlyOpen = id;
		},
		closeSwitcher(id: string) {
			if (currentlyOpen === id) {
				currentlyOpen = null;
			}
		},
		closeAll() {
			currentlyOpen = null;
		}
	};

	setContext(SWITCHER_CONTEXT_KEY, context);
	return context;
}

export function getSwitcherContext(): SwitcherContext | undefined {
	return getContext(SWITCHER_CONTEXT_KEY);
}
