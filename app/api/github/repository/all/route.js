import { octokit } from 'lib/octokit';
import { NextResponse } from 'next/server';

/*
    @ Description of all possible endpoints:
    * GET: Get all acheivements of user
        ? user email
        > Returns: some JSON
*/

/// GET repository information from github api
//get the sha to get the commit
export async function GET(req) {
	let searchURL = new URL(req.url);
	let searchParams = searchURL.searchParams;
	const repo = searchParams.get('repo');
	const owner = searchParams.get('owner');

	console.log(repo, owner);

	try {
		const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
			owner: owner,
			repo: repo,
		});
		// console.log(data);

		if (data) {
			return Response.json(data, { status: 200 });
		} else {
			return Response.json(
				{ message: 'Repository not found' },
				{ status: 404 }
			);
		}
	} catch (error) {
		console.error(error);
		return Response.json(
			{ message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
