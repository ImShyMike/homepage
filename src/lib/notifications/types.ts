import type { Component } from 'svelte';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationData {
	id: string;
	text: string;
	type: NotificationType;
	icon?: Component;
	duration?: number; // in milliseconds, 0 = no auto-dismiss
	dismissible?: boolean;
}

export interface NotificationConfig {
	text: string;
	type?: NotificationType;
	icon?: Component;
	duration?: number;
	dismissible?: boolean;
}

export const NOTIFICATION_COLORS: Record<NotificationType, string> = {
	success: 'bg-ctp-green',
	error: 'bg-ctp-red',
	warning: 'bg-ctp-yellow',
	info: 'bg-ctp-blue'
};

export const DEFAULT_DURATION = 3000;
