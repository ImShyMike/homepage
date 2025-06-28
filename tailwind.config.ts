import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Catppuccin colors using simplified CSS variables
				ctp: {
					rosewater: 'var(--rosewater)',
					flamingo: 'var(--flamingo)',
					pink: 'var(--pink)',
					mauve: 'var(--mauve)',
					red: 'var(--red)',
					maroon: 'var(--maroon)',
					peach: 'var(--peach)',
					yellow: 'var(--yellow)',
					green: 'var(--green)',
					teal: 'var(--teal)',
					sky: 'var(--sky)',
					sapphire: 'var(--sapphire)',
					blue: 'var(--blue)',
					lavender: 'var(--lavender)',
					text: 'var(--text)',
					subtext1: 'var(--subtext1)',
					subtext0: 'var(--subtext0)',
					overlay2: 'var(--overlay2)',
					overlay1: 'var(--overlay1)',
					overlay0: 'var(--overlay0)',
					surface2: 'var(--surface2)',
					surface1: 'var(--surface1)',
					surface0: 'var(--surface0)',
					base: 'var(--base)',
					mantle: 'var(--mantle)',
					crust: 'var(--crust)',
					accent: 'var(--accent)'
				}
			},
			typography: {
				DEFAULT: {
					css: {
						color: 'var(--text)',
						maxWidth: 'none',
						'h1, h2, h3, h4, h5, h6': {
							color: 'var(--text)'
						},
						a: {
							color: 'var(--accent)',
							textDecoration: 'none',
							'&:hover': {
								color: 'var(--blue)'
							}
						},
						code: {
							color: 'var(--accent)',
							backgroundColor: 'var(--mantle)',
							padding: '0.125rem 0.25rem',
							borderRadius: '0.25rem',
							fontSize: '0.875em'
						},
						pre: {
							backgroundColor: 'var(--mantle)',
							color: 'var(--text)'
						},
						'pre code': {
							backgroundColor: 'transparent',
							padding: 0
						},
						blockquote: {
							borderLeftColor: 'var(--accent)',
							color: 'var(--subtext1)'
						},
						hr: {
							borderColor: 'var(--surface0)'
						},
						strong: {
							color: 'var(--text)'
						},
						em: {
							color: 'var(--text)'
						}
					}
				}
			}
		}
	},
	plugins: [typography]
} satisfies Config;
