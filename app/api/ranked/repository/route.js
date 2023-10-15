import { connectDB, db } from '@/lib/db';
import RepositoryModel from './models/repositoryModel';
import { NextResponse } from 'next/server';

/*
    @ Description of all possible endpoints:
    * GET: Get all acheivements of user
        ? user email
        > Returns: some JSON
*/

connectDB();

/// GET all commits from a user
export async function GET(req) {
	let searchURL = new URL(req.url);
	let searchParams = searchURL.searchParams;
	const repo = searchParams.get('repo');
	const owner = searchParams.get('owner');
	console.log(repo, owner);

	try {
		const repository = await RepositoryModel.findOne({
			name: repo,
			owner: owner,
		});

		if (repository) {
			return Response.json(repository, { status: 200 });
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
