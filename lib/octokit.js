import { Octokit } from 'octokit';

const octokit = new Octokit({
	auth: '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',
});

export { octokit };
