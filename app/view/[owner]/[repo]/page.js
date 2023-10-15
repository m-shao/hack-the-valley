'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommitPreview from '@/components/CommitPreview';

async function fetchRepoData(owner, repo) {
	try {
		const response = await fetch(
			`/api/github/repository?owner=${owner}&repo=${repo}`,
			{
				method: 'GET',
			}
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
async function fetchContributorData(owner, repo) {
	try {
		const response = await fetch(
			`/api/github/repository/contributors?owner=${owner}&repo=${repo}`,
			{
				method: 'GET',
			}
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
async function fetchCommitData(owner, repo, sha) {
	try {
		const response = await fetch(
			`/api/github/repository/commit?owner=${owner}&repo=${repo}&sha=${sha}`,
			{
				method: 'GET',
			}
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

// async function addCommitData(owner, repo, username, score, message) {
// 	try {
// 		const response = await fetch('/api/ranked/repository/commit', {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				owner: owner,
// 				repo: repo,
// 				username: username,
// 				score: score,
// 				message: message,
// 			}),
// 		});
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}
// 		const data = await response.json();
// 		return data;
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

async function initData(owner, repo, username, files) {
	try {
		const response = await fetch('/api/github/repository/init', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				owner: owner,
				repo: repo,
				username: username,
				files: files,
			}),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

const Viewer = () => {
	const params = useParams();
	const owner = params.owner;
	const repoName = params.repo;

	const [loaded, setLoaded] = useState(false);
	const [files, setFiles] = useState([]);
	const [commits, setCommits] = useState([]);
	const [contributors, setContributors] = useState([]);
	const [placers, setPlacers] = useState([]);

	const placement = [
		{ user: 'user1', score: 1 },
		{ user: 'user2', score: 2 },
		{ user: 'user3', score: 3 },
		{ user: 'user4', score: 4 },
		{ user: 'user5', score: 5 },
		{ user: 'user6', score: 6 },
	];

	const placementColours = [
		'text-yellow-500',
		'text-gray-500',
		'text-orange-600',
	];

	useEffect(() => {
		//fetch all data
		async function fetchStuff() {
			const repoData = await fetchRepoData(owner, repoName);
			const contributors = await fetchContributorData(owner, repoName);
			console.log(contributors);
			setContributors(contributors);
			const commits = [];
			let commitData = null;
			for (let i = 0; i < repoData.length; i++) {
				commitData = await fetchCommitData(
					owner,
					repoName,
					repoData[i].sha
				);
				commits.push(commitData);
			}
			setCommits(commits);
			console.log(commits);
			setLoaded(true);
		}
		fetchStuff();
	}, []);

	return (
		<div className='w-screen h-screen flex overflow-y-hidden bg-black gap-16 p-16'>
			<div className=' flex-1 bg-black border-4 border-white rounded-lg flex flex-col gap-4 items-center overflow-y-scroll'>
				<h1 className='text-white text-4xl pt-12 font-black'>
					Leaderboard
				</h1>
				<div className='bg-gray-700 text-gray-600 w-full h-[2px]'></div>
				<div className='flex gap-2 w-full px-8 text-xl'>
					<span className='w-14'></span>
					<h1 className='text-white w-3/4 font-bold underline'>
						User
					</h1>
					<h1 className='text-white font-bold underline'>Points</h1>
				</div>
				<div className='flex flex-col gap-4 items-center w-full overflow-y-scroll min-h-full px-8'>
					{placers
						?.sort((a, b) => b.score - a.score)
						.map((user, index) => (
							<div
								key={user.user}
								className='flex gap-4  w-full text-3xl text-white items-center '>
								<span
									className={
										placementColours[index] +
										' font-medium w-8'
									}>
									#{index + 1}{' '}
								</span>
								<div className='px-4 py-4 border-4 border-white rounded-md flex gap-2 flex-1'>
									<h1 className=' w-3/4'>{user.user}</h1>
									<h1 className=''>{user.score}</h1>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className=' flex-1 border-4 border-white text-white rounded-lg bg-black overflow-y-scroll'>
				{commits.map((commit) => {
					let user = commit.author.login;
					let score = commit.stats.total;
					// Find the index of the user within the placers array
					let userIndex = placers.findIndex(
						(placer) => placer.user === user
					);

					if (userIndex === -1) {
						// If the user is not in the placers array, add a new object
						placers.push({ user, score });
					} else {
						// If the user is already in the placers array, update the score
						placers[userIndex].score += score;
					}
					return (
						<CommitPreview
							commit={commit}
							key={commit.sha}
							repo={repoName}
							owner={owner}
						/>
					);
				})}
			</div>
		</div>
	);

	return (
		<div>
			{loaded ? (
				<div>
					{files.map((file) => (
						<div key={file?.name}>
							<h1 className='text-red'>{file?.name}</h1>
							{atob(file?.content)}
							{console.log(atob(file?.content))}
						</div>
					))}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Viewer;
