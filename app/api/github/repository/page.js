// 'use client';

import { Octokit } from 'octokit';

const octokit = new Octokit();

const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
	owner: 'm-shao',
	repo: 'hack-the-valley',
});

console.log(data);

const Hello = () => {
	return (
		<div>
			{data.map((commit) => {
				return (
					<div key={commit.node_id}>
						<p>{commit.commit.message}</p>
						<p>{commit.commit.author.login}</p>
						<p>{commit.commit.author.date}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Hello;
