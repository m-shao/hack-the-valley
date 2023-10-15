import { connectDB, db } from '@/lib/db';
import RepositoryModel from '../models/repositoryModel';
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
	const username = searchParams.get('username');

	try {
		const repository = await RepositoryModel.findOne({
			name: repo,
			owner: owner,
		});

		if (repository) {
			const user = repository.users.find((u) => u.username === username);
			return Response.json(user, { status: 200 });
		} else {
			return Response.json(
				{ message: 'User not found' },
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

// export async function PUT(req) {
// 	const updateData = await req.json();
// 	const owner = updateData.owner;
// 	const repo = updateData.repo;
// 	const username = updateData.username;
// 	const score = updateData.score;
// 	const message = updateData.message;
// 	// console.log(message);

// 	// console.log({ owner, repo, username, score, message });
// 	try {
// 		const res = await RepositoryModel.findOneAndUpdate(
// 			{ name: repo, owner: owner, 'users.username': username },
// 			{
// 				$push: {
// 					'users.$.commits': {
// 						rating: score,
// 						message: message,
// 					},
// 				},
// 			}
// 		);

// 		console.log('YOMAMA');

// 		return Response.json({ status: 200 });
// 	} catch (err) {
// 		return Response.json(
// 			{ error: 'Internal Server Error' },
// 			{ status: 500 }
// 		);
// 	}
// }
