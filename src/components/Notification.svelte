<script lang="ts">
	import CloseIcon from 'virtual:icons/octicon/x-12';
	import type { NotificationData } from '$lib/notifications';
	import { NOTIFICATION_COLORS } from '$lib/notifications';
	import { removeNotification } from '$lib/notifications';

	interface Props {
		notification: NotificationData;
	}

	let { notification }: Props = $props();

	let visible = $state(false);

	$effect(() => {
		setTimeout(() => {
			visible = true;
		}, 10);
	});

	function handleClose() {
		visible = false;
		setTimeout(() => {
			removeNotification(notification.id);
		}, 300);
	}

	const backgroundColor = NOTIFICATION_COLORS[notification.type];
</script>

<div
	class="{backgroundColor} text-ctp-base flex items-center gap-2 rounded-lg px-4 py-2 shadow-lg transition-all duration-300 {visible
		? 'translate-y-0 opacity-100'
		: 'translate-y-2 opacity-0'}"
>
	{#if notification.icon}
		{@const IconComponent = notification.icon}
		<IconComponent class="h-5 w-5" />
	{/if}
	<span class="font-medium">{notification.text}</span>
	{#if notification.dismissible}
		<button
			class="text-ctp-text bg-surface1 hover:text-ctp-red ml-auto p-0 transition-colors"
			onclick={handleClose}
			aria-label="Close notification"
		>
			<CloseIcon class="h-5.5 w-5.5" />
		</button>
	{/if}
</div>
