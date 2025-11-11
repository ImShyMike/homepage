<script lang="ts">
	import { PUBLIC_COMMIT_SHA } from '$env/static/public';
	import { GithubData, Socials } from '$lib';
	import { notifySuccess, notifyInfo, removeNotification } from '$lib/notifications';
	import { getUmamiStats } from '$lib/analytics';
	import { onMount } from 'svelte';
	import GitCommit from 'virtual:icons/tabler/git-commit';
	import GithubIcon from 'virtual:icons/tabler/brand-github';
	import BlueskyIcon from 'virtual:icons/tabler/brand-bluesky';
	import DiscordIcon from 'virtual:icons/tabler/brand-discord';
	import MailIcon from 'virtual:icons/tabler/mail';
	import LoadingIcon from 'virtual:icons/line-md/loading-twotone-loop';
	import CheckIcon from 'virtual:icons/tabler/check';

	const userUrl = `https://github.com/${GithubData.name}`;
	const commitSha = PUBLIC_COMMIT_SHA == '$CF_PAGES_COMMIT_SHA' ? undefined : PUBLIC_COMMIT_SHA;
	const shortHash = commitSha ? commitSha.slice(0, 7) : 'dev';
	const gitCommitUrl = commitSha ? `${userUrl}/${GithubData.repo}/commit/${commitSha}` : '';

	let views = $state('0');
	let loadingEmail = $state(false);
	let loadingNotificationId: string | null = null;

	async function sha256(str: string): Promise<string> {
		const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
		return Array.from(new Uint8Array(buffer))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');
	}

	// worst email scrape protection ever :fire:
	async function getEmail(): Promise<string> {
		if (loadingEmail) return '';

		loadingEmail = true;
		loadingNotificationId = notifyInfo('Loading email address...', {
			icon: LoadingIcon,
			duration: 0,
			dismissible: false
		});

		const prefix = '0'.repeat(Socials.email.difficulty);
		let email = '';
		let counter = 0;

		while (true) {
			const input = `${Socials.email.nonce}:${counter}`;
			const hash = await sha256(input);
			if (hash.startsWith(prefix)) {
				const key = input;
				const decoded = atob(Socials.email.encrypted)
					.split('')
					.map((c, i) => c.charCodeAt(0) ^ key.charCodeAt(i % key.length));
				email = new TextDecoder().decode(new Uint8Array(decoded));
				break;
			}
			counter++;
		}

		loadingEmail = false;

		if (loadingNotificationId) {
			removeNotification(loadingNotificationId);
			loadingNotificationId = null;
		}

		return email;
	}

	onMount(async () => {
		try {
			const stats = await getUmamiStats();
			if (stats) {
				views = stats.pageviews || '0';
			} else {
				console.warn('No Umami stats available');
			}
		} catch (error) {
			console.error('Error fetching Umami stats:', error);
		}
	});
</script>

{#snippet spacer()}<span class="bold text-ctp-surface1">|</span>{/snippet}

<footer class="flex justify-center">
	<div class="bg-ctp-mantle border-ctp-surface1 mx-4 mb-3 rounded-lg border p-3 shadow-lg">
		<div class="flex flex-row items-center justify-between gap-2 sm:gap-4">
			<a
				href={gitCommitUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="low-line text-ctp-text hover:text-ctp-accent flex items-center text-sm transition-colors sm:text-base"
				data-umami-event="git-commit"
				data-umami-event-commit={commitSha}
			>
				<GitCommit class="h-4 w-4 sm:h-5 sm:w-5" /><span>{shortHash}</span>
			</a>
			{@render spacer()}
			<span class="text-ctp-text flex items-center text-sm sm:text-base">
				{views.toLocaleString()} views
			</span>
			{@render spacer()}
			<div class="flex flex-row gap-1.5 text-center">
				<a
					href={userUrl}
					aria-label="GitHub"
					target="_blank"
					rel="noopener noreferrer"
					class="text-ctp-text hover:text-ctp-accent flex items-center transition-colors"
					data-umami-event="socials-click"
					data-umami-event-url={userUrl}
				>
					<GithubIcon class="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5" />
				</a>
				<a
					href={Socials.bluesky}
					aria-label="Bluesky"
					target="_blank"
					rel="noopener noreferrer"
					class="text-ctp-text hover:text-ctp-accent flex items-center transition-colors"
					data-umami-event="socials-click"
					data-umami-event-url={Socials.bluesky}
				>
					<BlueskyIcon class="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5" />
				</a>
				<a
					href={Socials.discord}
					aria-label="Discord"
					target="_blank"
					rel="noopener noreferrer"
					class="text-ctp-text hover:text-ctp-accent flex items-center transition-colors"
					data-umami-event="socials-click"
					data-umami-event-url={Socials.discord}
				>
					<DiscordIcon class="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5" />
				</a>
				<button
					aria-label="Email"
					class="text-ctp-text hover:text-ctp-accent flex cursor-pointer items-center bg-transparent p-0 transition-colors"
					title="Click to copy my email address"
					data-umami-event="socials-click"
					data-umami-event-url="email"
					onclick={async () => {
						const email = await getEmail();
						if (email) {
							navigator.clipboard.writeText(email);
							notifySuccess('Email address copied to clipboard!', {
								icon: CheckIcon,
								duration: 3000
							});
						}
					}}
				>
					<MailIcon class="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5" />
				</button>
			</div>
		</div>
	</div>
</footer>
