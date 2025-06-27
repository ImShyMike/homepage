import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { CatppuccinTheme } from '$lib';

export const themes: Record<CatppuccinTheme, { name: string; emoji: string }> = {
	latte: { name: 'Latte', emoji: '☀️' },
	frappe: { name: 'Frappé', emoji: '🌅' },
	macchiato: { name: 'Macchiato', emoji: '🌆' },
	mocha: { name: 'Mocha', emoji: '🌙' }
};

function createThemeStore() {
	const getInitialTheme = (): CatppuccinTheme => {
		if (!browser) return 'mocha';
		const stored = localStorage.getItem('theme') as CatppuccinTheme;
		return stored && Object.keys(themes).includes(stored) ? stored : 'mocha';
	};

	const { subscribe, set, update } = writable<CatppuccinTheme>(getInitialTheme());

	return {
		subscribe,
		set: (theme: CatppuccinTheme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				document.documentElement.setAttribute('data-theme', theme);
			}
			set(theme);
		},
		toggle: () => {
			update((current) => {
				const themeKeys = Object.keys(themes) as CatppuccinTheme[];
				const currentIndex = themeKeys.indexOf(current);
				const nextTheme = themeKeys[(currentIndex + 1) % themeKeys.length];

				if (browser) {
					localStorage.setItem('theme', nextTheme);
					document.documentElement.setAttribute('data-theme', nextTheme);
				}

				return nextTheme;
			});
		},
		init: () => {
			if (browser) {
				const current = getInitialTheme();
				document.documentElement.setAttribute('data-theme', current);
				set(current);

				// listen for storage changes from other tabs/windows
				const handleStorageChange = (e: StorageEvent) => {
					if (e.key === 'theme' && e.newValue) {
						const newTheme = e.newValue as CatppuccinTheme;
						if (Object.keys(themes).includes(newTheme)) {
							document.documentElement.setAttribute('data-theme', newTheme);
							set(newTheme);
						}
					}
				};

				window.addEventListener('storage', handleStorageChange);
			}
		}
	};
}

export const theme = createThemeStore();
