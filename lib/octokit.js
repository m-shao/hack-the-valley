import { Octokit } from 'octokit';

const octokit = new Octokit({
	auth: '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',
});

export { octokit };
