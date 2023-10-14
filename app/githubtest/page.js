'use client';

import { useEffect, useState } from 'react';

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

async function fetchFileData(owner, repo, sha, fileName) {
	try {
		const response = await fetch(
			`/api/github/repository/file?owner=${owner}&repo=${repo}&sha=${sha}&fileName=${fileName}`,
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

function UserProfile() {
	const [repo, setRepo] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [files, setFiles] = useState([]);
	const owner = 'm-shao'; // Replace with the actual owner name
	const repoName = 'hack-the-valley-test'; // Replace with the actual repository name

	useEffect(() => {
		async function fetchStuff() {
			const repoData = await fetchRepoData(owner, repoName);
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

			let files = [];
			let fileData = null;
			for (let i = 0; i < commits.length; i++) {
				for (let j = 0; j < commits[i].files.length; j++) {
					fileData = await fetchFileData(
						owner,
						repoName,
						repoData[i].sha,
						commits[i].files[j].filename
					);
					if (fileData) files.push(fileData);
				}
			}
			setFiles(files);
			setLoaded(true);
		}
		fetchStuff();
	}, []);

	return (
		<div>
			{loaded ? (
				<div>
					{files.map((file) => {
						return (
							<div key={file?.name}>
								<h1 className='text-red'>{file?.name}</h1>
								{atob(file?.content)}
								{console.log(atob(file?.content))}
							</div>
						);
					})}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default UserProfile;
