import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { CatppuccinTheme } from '$lib';

export const themes: Record<CatppuccinTheme, { name: string; emoji: string }> = {
	latte: { name: 'Latte', emoji: '☀️' },
	frappe: { name: 'Frappé', emoji: '🌅' },
	macchiato: { name: 'Macchiato', emoji: '🌆' },
	mocha: { name: 'Mocha', emoji: '🌙' }
};

export const accents: string[] = [
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

function createAccentStore() {
	const getInitialAccent = (): string => {
		if (!browser) return 'blue';
		const stored = localStorage.getItem('accent');
		return stored && accents.includes(stored) ? stored : 'blue';
	};

	const { subscribe, set, update } = writable<string>(getInitialAccent());

	return {
		subscribe,
		set: (accent: string) => {
			if (browser) {
				localStorage.setItem('accent', accent);
				document.documentElement.setAttribute('data-accent', accent);
			}
			set(accent);
		},
		update: (fn: (current: string) => string) => {
			update((current) => {
				const newAccent = fn(current);
				if (browser) {
					if (accents.includes(newAccent)) {
						localStorage.setItem('accent', newAccent);
						document.documentElement.style.setProperty('--accent', `var(--${newAccent})`);
					} else {
						console.warn(`Invalid accent: ${newAccent}. Using default 'mauve'.`);
						localStorage.setItem('accent', 'mauve');
						document.documentElement.style.setProperty('--accent', `var(--mauve)`);
						return 'mauve';
					}
				}
				return newAccent;
			});
		},
		init: () => {
			if (browser) {
				const current = getInitialAccent();
				document.documentElement.setAttribute('data-accent', current);
				set(current);

				// listen for storage changes from other tabs/windows
				const handleStorageChange = (e: StorageEvent) => {
					if (e.key === 'accent' && e.newValue) {
						const newAccent = e.newValue;
						if (accents.includes(newAccent)) {
							document.documentElement.setAttribute('data-accent', newAccent);
							set(newAccent);
						}
					}
				};

				window.addEventListener('storage', handleStorageChange);
			}
		}
	};
}

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
export const accent = createAccentStore();
