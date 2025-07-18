<script lang="ts">
	import '../app.css';
	import ThemeSwitcher from '$components/ThemeSwitcher.svelte';
	import ColorSwitcher from '$components/ColorSwitcher.svelte';
	import Footer from '$components/Footer.svelte';
	import NotificationContainer from '$components/NotificationContainer.svelte';
	import { WebsiteData, UmamiData, isDev } from '$lib';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { createSwitcherContext } from '$lib/context/switcher-context.svelte';
	import ThreeBarsIcon from 'virtual:icons/octicon/three-bars.svg';
	import CloseIcon from 'virtual:icons/octicon/x-12';

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

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function isActive(path: string): string {
		const normalize = (url: string) => url.replace(/\/+$/, '');
		const currentPath = normalize(page.url.pathname);
		const targetPath = normalize(path);

		return currentPath === targetPath
			? 'fill-line'
			: currentPath.startsWith(targetPath) && targetPath !== ''
				? 'fill-line'
				: '';
	}

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

	{#if !isDev}
		<link rel="preconnect" href={UmamiData.url} />
		<script
			async
			defer
			src="{UmamiData.url}/script.js"
			data-website-id={UmamiData.websiteId}
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
			? 'bg-ctp-mantle/90 backdrop-blur-sm'
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
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text px-0.5 transition-colors {isActive(
								'/'
							)}">Home</a
						>
						{@render spacer()}
						<a
							data-sveltekit-preload-data
							href="/projects"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text px-0.5 transition-colors {isActive(
								'/projects'
							)}">Projects</a
						>
						{@render spacer()}
						<a
							data-sveltekit-preload-data
							href="/posts"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text px-0.5 transition-colors {isActive(
								'/posts'
							)}">Posts</a
						>
					</nav>

					<!-- Mobile Menu Button -->
					<button
						class="text-ctp-subtext1 hover:text-ctp-text hover:bg-ctp-surface0 rounded-md p-2 transition-colors md:hidden"
						onclick={toggleMobileMenu}
						aria-label="Toggle mobile menu"
					>
						{#if isMobileMenuOpen}
							<CloseIcon class="h-6 w-6" />
						{:else}
							<ThreeBarsIcon class="h-6 w-6" />
						{/if}
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
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text block px-0.5 py-1 transition-colors {isActive(
								'/'
							)}"
							onclick={() => (isMobileMenuOpen = false)}>Home</a
						>
						<a
							data-sveltekit-preload-data
							href="/projects"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text block px-0.5 py-1 transition-colors {isActive(
								'/projects'
							)}"
							onclick={() => (isMobileMenuOpen = false)}>Projects</a
						>
						<a
							data-sveltekit-preload-data
							href="/posts"
							class="line hover-text-glow text-ctp-subtext1 hover:text-ctp-text block px-0.5 py-1 transition-colors {isActive(
								'/posts'
							)}"
							onclick={() => (isMobileMenuOpen = false)}>Posts</a
						>
					</nav>
				</div>
			{/if}
		</div>
	</header>

	<main class="max-w-none flex-grow px-4 py-6 pt-22 sm:px-6 lg:px-12 xl:px-16">
		{@render children()}
	</main>

	<Footer />

	<NotificationContainer />
</div>
