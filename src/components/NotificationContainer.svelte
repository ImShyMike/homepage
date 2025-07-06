<script lang="ts">
	import { notifications } from '$lib/notifications';
	import Notification from './Notification.svelte';
</script>

{#if $notifications.length > 0}
	<div
		class="fixed right-4 bottom-20 z-50 flex flex-col gap-2 lg:bottom-4"
		aria-label="Notifications"
	>
		{#each $notifications as notification (notification.id)}
			<Notification {notification} />
		{/each}
	</div>
{/if}
