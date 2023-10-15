'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import FileRating from './FileRating';

const CommitPreview = ({ commit, repo, owner }) => {
	const [open, setOpen] = useState(false);
	return (
		<div className='flex flex-col gap-2 border-gray-800 border-b-2 px-4 py-2 '>
			<div
				className='flex justify-between items-center'
				onClick={() => {
					setOpen((prev) => !prev);
				}}>
				<div>
					<h1 className='text-lg font-medium'>
						{commit.commit.message}
					</h1>
					<h1 className='text-md flex gap-2'>
						{commit.commit.author.name}
					</h1>
				</div>
				<Link
					href={commit.html_url}
					target='_blank'
					className='h-8 w-8'>
					<Image
						src='/github.png'
						alt='gh logo'
						className='invert rounded-full'
						width={24}
						height={24}
					/>
				</Link>
			</div>
			{open ? (
				<div className='text-sm'>
					{commit.files.map((file, index) => (
						<div className='flex gap-1 items-center' key={index}>
							{file.filename}
							<FileRating
								file={file}
								repo={repo}
								owner={owner}
								sha={commit.sha}
							/>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

export default CommitPreview;
