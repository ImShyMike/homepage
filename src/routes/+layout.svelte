<script lang="ts">
	import '../app.css';
	import ThemeSwitcher from '$lib/../components/ThemeSwitcher.svelte';
	import ColorSwitcher from '$components/ColorSwitcher.svelte';
	import Footer from '$components/Footer.svelte';
	import { WebsiteData } from '$lib';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { children } = $props();
	let isScrolled = $state(false);

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 10;
		};

		isScrolled = window.scrollY > 10;

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	let title = $derived(['~', ...page.url.pathname.split('/').slice(1)].join('/'));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={WebsiteData.description} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={WebsiteData.description} />
	<meta name="twitter:image" content={`${WebsiteData.url}/og.png`} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={WebsiteData.description} />
	<meta property="og:image" content={`${WebsiteData.url}/og.png`} />
	<meta property="og:url" content={WebsiteData.url.toString()} />
	<meta property="og:site_name" content={WebsiteData.name} />

	<meta name="author" content={WebsiteData.name} />
	<meta name="keywords" content={WebsiteData.tags.join(', ')} />
	<link rel="canonical" href={WebsiteData.url + page.url.pathname} />
</svelte:head>

<div class="bg-ctp-base text-ctp-text flex min-h-screen flex-col">
	<header
		class="border-ctp-surface0 fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300 {isScrolled
			? 'bg-ctp-mantle/80 backdrop-blur-md'
			: 'bg-ctp-mantle'}"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-3 lg:px-8 xl:px-12">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center space-x-6">
					<nav class="hidden space-x-4 md:flex">
						<a
							data-sveltekit-preload-data
							href="/"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text transition-colors"
							>Home</a
						>
						<a
							data-sveltekit-preload-data
							href="/projects"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text transition-colors"
							>Projects</a
						>
						<a
							data-sveltekit-preload-data
							href="/posts"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text transition-colors"
							>Posts</a
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

	<main class="mx-auto max-w-none flex-grow px-4 py-6 pt-22 sm:px-6 lg:px-12 xl:px-16">
		{@render children()}
	</main>

	<Footer />
</div>
