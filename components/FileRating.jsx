'use client';
import { useEffect, useState } from 'react';

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

async function fetchRateData(file) {
	try {
		const response = await fetch(`/api/langchain?file=${file}`, {
			method: 'GET',
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

const FileRating = ({ file, owner, repo, sha }) => {
	const [fileContent, setFileContent] = useState(undefined);
	const [data, setData] = useState(undefined);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		console.log(fileContent);
		async function fetchStuff(file) {
			const data1 = await fetchFileData(owner, repo, sha, file.filename);
			setFileContent(data1);
			const rate = await fetchRateData(data1.content);
			setData(rate);
		}
		fetchStuff(file);
	}, []);

	useEffect(() => {
		console.log(data);
	}, [data]);

	if (!open) {
		return (
			<svg
				onClick={() => {
					setOpen((prev) => !prev);
				}}
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='w-4 h-4'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M8.25 4.5l7.5 7.5-7.5 7.5'
				/>
			</svg>
		);
	}

	if (!data) {
		return <div>loading...</div>;
	}
	return <div>{data.message}</div>;
};

export default FileRating;
