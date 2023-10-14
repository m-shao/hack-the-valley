'use client';

import { useEffect, useState } from 'react';

async function fetchUserData(owner, repo, username) {
	try {
		const response = await fetch(
			`/api/ranked/repository/commit?owner=${owner}&repo=${repo}&username=${username}`,
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
		throw error;
	}
}

async function fetchRepoData(owner, repo) {
	try {
		const response = await fetch(
			`/api/ranked/repository?owner=${owner}&repo=${repo}`,
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
		throw error;
	}
}

function UserProfile() {
	const [repo, setRepo] = useState(null);
	const owner = 'test'; // Replace with the actual owner name
	const repoName = 'test'; // Replace with the actual repository name
	const username = 'test'; // Replace with the actual username

	useEffect(() => {
		fetchRepoData(owner, repoName)
			.then((data) => {
				setRepo(data);
				console.log(data);
			})
			.catch((error) => {
				console.error('Error fetching repo data:', error);
			});
	}, []);

	return (
		<div>
			{repo ? (
				<div>
					<h1>Repo:{repo?.name}</h1>
					<h2>Owner:{repo?.owner}</h2>
					<h3>
						Users and commits:
						{repo?.users?.map((user, index) => (
							<div key={index}>
								<h4>{user?.username}</h4>
								{user?.commits?.map((commit, index1) => (
									<div key={index1}>
										<h5>{commit?.message}</h5>
										<h5>{commit?.rating}</h5>
									</div>
								))}
							</div>
						))}
					</h3>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default UserProfile;
