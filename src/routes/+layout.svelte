<script lang="ts">
	import '../app.css';
	import ThemeSwitcher from '$lib/../components/ThemeSwitcher.svelte';
	import ColorSwitcher from '$components/ColorSwitcher.svelte';

	let { children } = $props();
</script>

<div class="bg-ctp-base text-ctp-text min-h-screen">
	<header class="border-ctp-surface0 bg-ctp-mantle border-b">
		<div class="mx-auto max-w-7xl px-4 sm:px-3 lg:px-8 xl:px-12">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center space-x-6">
					<nav class="hidden space-x-4 md:flex">
						<a
							data-sveltekit-preload-data
							href="/"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text transition-colors">Home</a
						>
						<a
							data-sveltekit-preload-data
							href="/projects"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text transition-colors">Projects</a
						>
						<a
							data-sveltekit-preload-data
							href="/posts"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text transition-colors">Posts</a
						>
					</nav>
				</div>
				<div class="flex items-center space-x-4">
					<ThemeSwitcher />
					<ColorSwitcher />
				</div>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-none px-4 py-6 sm:px-6 lg:px-12 xl:px-16">
		{@render children()}
	</main>
</div>
