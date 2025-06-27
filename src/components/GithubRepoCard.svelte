<script lang="ts">
	import { languageColors, type GitHubRepo } from '$lib';

    import Star from 'virtual:icons/mdi/star.svg';
    import Github from 'virtual:icons/mdi/github.svg';
    import Link from 'virtual:icons/mdi/link.svg';

	interface Props {
		repo: GitHubRepo;
	}

	let { repo }: Props = $props();
</script>

<div
	class="bg-ctp-surface0 flex flex-row border-ctp-surface1 hover:border-ctp-lavender group rounded-lg border p-6 no-underline transition-colors duration-200"
>
    <div class="flex items-left flex-1 flex-col justify-between mr-2">
        <div class="mb-3 flex items-start justify-between">
            <h3 class="text-ctp-text text-lg font-medium transition-colors">
                {repo.name}
            </h3>
        </div>
        {#if repo.description}
            <p class="text-ctp-subtext0 mb-3 line-clamp-2 text-sm">
                {repo.description}
            </p>
        {/if}
        <div class="text-ctp-subtext1 flex items-center space-x-4 text-xs">
            {#if repo.language}
                <span class="flex items-center space-x-1">
                    <div class="bg-ctp-blue h-3 w-3 rounded-full" style="background-color: {repo.language in languageColors ? languageColors[repo.language] : ""}"></div>
                    <span>{repo.language}</span>
                </span>
            {/if}
            {#if repo.stargazers_count > 0}
                <span class="flex items-center space-x-1">
                    <Star class="h-4 w-4" />
                    <span>{repo.stargazers_count}</span>
                </span>
            {/if}
        </div>
    </div>
    <div class="flex flex-col flex-shrink-0 items-center space-y-3 justify-start">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <Github class="text-ctp-subtext1 hover:text-ctp-blue h-5.5 w-5.5" />
        </a>
        {#if repo.homepage}
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                <Link class="text-ctp-subtext1 hover:text-ctp-blue h-5.5 w-5.5" />
            </a>
        {/if}
    </div>
</div>
