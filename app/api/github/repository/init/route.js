import { connectDB, db } from '@/lib/db';
import RepositoryModel from '../models/repositoryModel';
import { NextResponse } from 'next/server';
import { rate } from '@app/api/langchain/route';

/*
    @ Description of all possible endpoints:
    * GET: Get all acheivements of user
        ? user email
        > Returns: some JSON
*/

connectDB();

export async function PUT(req) {
	const updateData = await req.json();
	const owner = updateData.owner;
	const repo = updateData.repo;
	const username = updateData.username;
	const files = updateData.files;

	let score;
	for (let i; i < files.length; i++) {
		score = rate(files[i].content);
		console.log(score);
	}

	try {
		const res = await RepositoryModel.findOneAndReplace({
			name: repo,
			owner: owner,
			users: [],
		});

		return Response.json({ status: 200 });
	} catch (err) {
		return Response.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
