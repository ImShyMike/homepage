<script lang="ts">
	import '../app.css';
	import ThemeSwitcher from '$lib/../components/ThemeSwitcher.svelte';

	let { children } = $props();
</script>

<div class="bg-ctp-base text-ctp-text min-h-screen">
	<header class="border-ctp-surface0 bg-ctp-mantle border-b">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center space-x-6">
					<nav class="hidden space-x-4 md:flex">
						<a href="/" class="text-ctp-subtext1 hover:text-ctp-text transition-colors">Home</a>
						<a href="/projects" class="text-ctp-subtext1 hover:text-ctp-text transition-colors">Projects</a>
					</nav>
				</div>
				<ThemeSwitcher />
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>
