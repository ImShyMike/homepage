import { writable } from 'svelte/store';
import type { NotificationData, NotificationConfig } from './types.js';
import { DEFAULT_DURATION } from './types.js';

export const notifications = writable<NotificationData[]>([]);

let notificationId = 0;

function generateId(): string {
	return `notification-${++notificationId}-${Date.now()}`;
}

export function addNotification(config: NotificationConfig): string {
	const id = generateId();
	const notification: NotificationData = {
		id,
		text: config.text,
		type: config.type || 'info',
		icon: config.icon,
		duration: config.duration !== undefined ? config.duration : DEFAULT_DURATION,
		dismissible: config.dismissible !== false
	};

	notifications.update((items) => [...items, notification]);

	if (notification.duration && notification.duration > 0) {
		setTimeout(() => {
			removeNotification(id);
		}, notification.duration);
	}

	return id;
}

export function removeNotification(id: string): void {
	notifications.update((items) => items.filter((item) => item.id !== id));
}

export function clearNotifications(): void {
	notifications.set([]);
}

export function notifySuccess(text: string, config?: Partial<NotificationConfig>): string {
	return addNotification({ ...config, text, type: 'success' });
}

export function notifyError(text: string, config?: Partial<NotificationConfig>): string {
	return addNotification({ ...config, text, type: 'error' });
}

export function notifyWarning(text: string, config?: Partial<NotificationConfig>): string {
	return addNotification({ ...config, text, type: 'warning' });
}

export function notifyInfo(text: string, config?: Partial<NotificationConfig>): string {
	return addNotification({ ...config, text, type: 'info' });
}
