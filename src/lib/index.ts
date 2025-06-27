// place files you want to import through the `$lib` alias in this folder.
export const gitHubUsername = 'ImShyMike';
export const gitHubRepo = 'homepage';

// Github
export { getRepos, languageColors } from './github/github';
export type { GitHubRepoList, GitHubRepo } from './github/github.d';

// Theme
export { theme, themes } from './theme/theme';
export type { CatppuccinTheme } from './theme/theme.d';
