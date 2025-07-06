import type { ComponentType } from 'svelte';

export interface PostMeta {
	id: string;
	title: string;
	date: string; // ISO date
	edited?: string; // ISO date, optional
	description?: string;
	tags?: string[];
	project?: string;
}

export interface Post {
	slug: string;
	meta: PostMeta;
	component: ComponentType;
}

export interface PostModule {
	metadata: PostMeta;
	default: ComponentType;
}
