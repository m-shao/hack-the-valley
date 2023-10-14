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
	console.log(repo, owner, username);

	try {
		const repository = await RepositoryModel.findOne({
			name: repo,
			owner: owner,
		});

		if (repository) {
			const user = repository.users.find((u) => u.username === username);
			return NextResponse.json(user, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: 'User not found' },
				{ status: 404 }
			);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}

// export async function PUT(req) {
// 	const updateData = await req.json();
// 	const email = updateData.email;
// 	const achievement = updateData.achievement;
// 	try {
// 		await UserModel.findOneAndUpdate(
// 			{ email: email },
// 			{
// 				$push: {
// 					achievements: achievement,
// 				},
// 			}
// 		);

// 		return NextResponse.json({ status: 200 });
// 	} catch (err) {
// 		return NextResponse.json(
// 			{ error: 'Internal Server Error' },
// 			{ status: 500 }
// 		);
// 	}
// }
