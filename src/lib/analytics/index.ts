import { UmamiData } from '$lib';
import type { UmamiStats } from './umami';

export async function getUmamiStats(): Promise<UmamiStats> {
	const nowMs = Date.now();
	const url = new URL(`/api/websites/${UmamiData.websiteId}/stats`, UmamiData.url);
	url.searchParams.set('startAt', '0');
	url.searchParams.set('endAt', nowMs.toString());

	const res = await fetch(url.toString(), {
		headers: {
			'x-umami-share-token': UmamiData.shareToken
		}
	});

	if (!res.ok) {
		throw new Error(`HTTP ${res.status} - ${res.statusText}`);
	}

	const data = await res.json();
	return {
		pageviews: data.pageviews,
		visitors: data.visitors,
		bounces: data.bounces
	} as UmamiStats;
}
