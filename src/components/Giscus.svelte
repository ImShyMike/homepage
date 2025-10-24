<script lang="ts">
	import Giscus from '@giscus/svelte';
	import { theme } from '$lib/theme';

	const THEME_NAME_MAP = {
		latte: 'catppuccin_latte',
		frappe: 'catppuccin_frappe',
		macchiato: 'catppuccin_macchiato',
		mocha: 'catppuccin_mocha'
	};
</script>

<Giscus
	id="giscus"
	term="blog-comments"
	repo="ImShyMike/blog"
	repoId="R_kgDOQIYt4w"
	category="General"
	categoryId="DIC_kwDOQIYt484CxA1R"
	mapping="pathname"
	strict="1"
	reactionsEnabled="1"
	emitMetadata="1"
	inputPosition="top"
	theme={THEME_NAME_MAP[$theme]}
	lang="en"
	loading="lazy"
/>
