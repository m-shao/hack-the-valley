import { Octokit } from 'octokit';

const octokit = new Octokit({
	auth: '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',
});

export { octokit };
