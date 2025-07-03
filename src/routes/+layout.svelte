<script lang="ts">
	import '../app.css';
	import ThemeSwitcher from '$components/ThemeSwitcher.svelte';
	import ColorSwitcher from '$components/ColorSwitcher.svelte';
	import Footer from '$components/Footer.svelte';
	import { WebsiteData, UmamiData } from '$lib';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { createSwitcherContext } from '$lib/context/switcher-context.svelte';

	const isProd = import.meta.env.MODE === 'production';

	let { children } = $props();
	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	createSwitcherContext();

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 10;
		};

		isScrolled = window.scrollY > 10;

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	let title = $derived(['~', ...page.url.pathname.split('/').slice(1)].join('/'));

	(() => {
		// umami outbound link tracking - https://umami.is/docs/track-outbound-links
		document.querySelectorAll('a').forEach((a) => {
			if (a.host !== window.location.host && !a.getAttribute('data-umami-event')) {
				a.setAttribute('data-umami-event', 'outbound-link-click');
				a.setAttribute('data-umami-event-url', a.href);
			}
		});
		// umami button click tracking
		document.querySelectorAll('button').forEach((button) => {
			if (!button.getAttribute('data-umami-event')) {
				let data = button.getAttribute('aria-label')?.trim() || button.textContent?.trim() || '';
				if (data) {
					button.setAttribute('data-umami-event', data);
				}
			}
		});
	})();
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

	{#if isProd}
		<link rel="preconnect" href="https://umami.shymike.dev" />
		<script
			async
			defer
			src="http://umami.shymike.dev/script.js"
			data-website-id="dea5159a-f101-4266-ab03-2cc56ed5cc42"
			data-domains={UmamiData.domains}
			data-exclude-search="false"
			data-auto-track="true"
			data-exclude-hash="false"
			data-do-not-track="false"
		></script>
	{/if}
</svelte:head>

{#snippet spacer()}<span class="bold text-ctp-surface1">|</span>{/snippet}

<div class="bg-ctp-base text-ctp-text flex min-h-screen flex-col">
	<header
		class="border-ctp-surface0 fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300 {isScrolled
			? 'bg-ctp-mantle/80 backdrop-blur-md'
			: 'bg-ctp-mantle'}"
	>
		<div class="mx-auto max-w-7xl px-4 lg:px-8 xl:px-12">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center space-x-6">
					<!-- Desktop Navbar -->
					<nav class="hidden space-x-4 md:flex">
						<a
							data-sveltekit-preload-data
							href="/"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text px-0.5 transition-colors"
							>Home</a
						>
						{@render spacer()}
						<a
							data-sveltekit-preload-data
							href="/projects"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text px-0.5 transition-colors"
							>Projects</a
						>
						{@render spacer()}
						<a
							data-sveltekit-preload-data
							href="/posts"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text px-0.5 transition-colors"
							>Posts</a
						>
					</nav>

					<!-- Mobile Menu Button -->
					<button
						class="text-ctp-subtext1 hover:text-ctp-text hover:bg-ctp-surface0 rounded-md p-2 transition-colors md:hidden"
						onclick={toggleMobileMenu}
						aria-label="Toggle mobile menu"
					>
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							{#if isMobileMenuOpen}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							{:else}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							{/if}
						</svg>
					</button>
				</div>
				<div class="flex items-center space-x-4">
					<ThemeSwitcher />
					<ColorSwitcher />
				</div>
			</div>

			<!-- Mobile Navbar -->
			{#if isMobileMenuOpen}
				<div class="border-ctp-surface0 border-t py-4 md:hidden">
					<nav class="flex flex-col items-start space-y-4">
						<a
							data-sveltekit-preload-data
							href="/"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text block px-0.5 py-1 transition-colors"
							onclick={() => (isMobileMenuOpen = false)}>Home</a
						>
						<a
							data-sveltekit-preload-data
							href="/projects"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text block px-0.5 py-1 transition-colors"
							onclick={() => (isMobileMenuOpen = false)}>Projects</a
						>
						<a
							data-sveltekit-preload-data
							href="/posts"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text block px-0.5 py-1 transition-colors"
							onclick={() => (isMobileMenuOpen = false)}>Posts</a
						>
					</nav>
				</div>
			{/if}
		</div>
	</header>

	<main class="mx-auto max-w-none flex-grow px-4 py-6 pt-22 sm:px-6 lg:px-12 xl:px-16">
		{@render children()}
	</main>

	<Footer />
</div>
