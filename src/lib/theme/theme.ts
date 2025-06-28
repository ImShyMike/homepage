import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { CatppuccinTheme } from '$lib';

const defaultTheme: CatppuccinTheme = 'mocha';
const defaultAccent: string = 'mauve';

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

function createStore<T>(key: string, defaultValue: T, validator: (value: unknown) => value is T) {
	const getInitial = (): T => {
		if (!browser) return defaultValue;
		const stored = localStorage.getItem(key);
		try {
			return stored && validator(JSON.parse(stored)) ? JSON.parse(stored) : defaultValue;
		} catch {
			return defaultValue;
		}
	};

	const { subscribe, set, update } = writable<T>(getInitial());

	return {
		subscribe,
		set: (value: T) => {
			if (browser) {
				localStorage.setItem(key, JSON.stringify(value));
				document.documentElement.setAttribute(`data-${key}`, String(value));
			}
			set(value);
		},
		update,
		init: () => {
			if (browser) {
				const current = getInitial();
				document.documentElement.setAttribute(`data-${key}`, String(current));
				set(current);

				const handleStorageChange = (e: StorageEvent) => {
					if (e.key === key && e.newValue) {
						try {
							const newValue = JSON.parse(e.newValue);
							if (validator(newValue)) {
								document.documentElement.setAttribute(`data-${key}`, String(newValue));
								set(newValue);
							}
						} catch {
							// ignore invalid JSON
						}
					}
				};

				window.addEventListener('storage', handleStorageChange);

				return () => window.removeEventListener('storage', handleStorageChange);
			}
		}
	};
}

const isValidTheme = (value: unknown): value is CatppuccinTheme =>
	typeof value === 'string' && Object.keys(themes).includes(value);

const isValidAccent = (value: unknown): value is string =>
	typeof value === 'string' && accents.includes(value);

export const theme = (() => {
	const store = createStore('theme', defaultTheme, isValidTheme);
	return {
		...store,
		toggle: () => {
			store.update((current) => {
				const themeKeys = Object.keys(themes) as CatppuccinTheme[];
				const currentIndex = themeKeys.indexOf(current);
				return themeKeys[(currentIndex + 1) % themeKeys.length];
			});
		}
	};
})();

export const accent = createStore('accent', defaultAccent, isValidAccent);
