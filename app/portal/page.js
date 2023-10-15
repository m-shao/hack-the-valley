'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import background from '@/public/YMr8Mn01.svg';

// import logo from '@/public/github.png';

const data = [
	{ name: 'John Doe', repo: 'johndoe/repo1' },
	{ name: 'm-shao', repo: 'hack-the-valley' },
	// Add more data as needed
];

const ExplorePage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter(); // Define the router
	const filteredData = data.filter((item) => {
		const namematch = item.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const repomatch = item.repo
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		return repomatch || namematch;
	});

	const handleSearch = (e) => {
		// if (searchTerm.trim() !== '') {
		// 	const filteredItem = filteredData.find(
		// 		(item) =>
		// 			item.name
		// 				.toLowerCase()
		// 				.includes(searchTerm.toLowerCase()) ||
		// 			item.repo.toLowerCase().includes(searchTerm.toLowerCase())
		// 	);

		// 	if (filteredItem) {
		// 		const { name, repo } = filteredItem;
		// 		const encodedPersonName = encodeURIComponent(name);
		// 		const encodedRepoName = encodeURIComponent(repo);
		// 		router.push(`/view/${encodedPersonName}/${encodedRepoName}`);
		// 	}
		// }
		e.preventDefault();
		const splitString = searchTerm.split('/');
		router.push(`/view/${splitString[0]}/${splitString[1]}`);
	};

	return (
		<section className='flex flex-col w-screen h-screen text-white bg-black bg-background bg-cover bg-center bg-repeat-none'>
			<main className='flex flex-col items-center justify-center flex-1 gap-6 px-4 pb-12 text-center'>
				<h1 className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[100%] from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>
					Developer Duels
				</h1>
				<h2 className='text-xl'>
					A Github Ranked experience. Improve, Challenge and Rank Up
				</h2>
				<form onSubmit={handleSearch} className='w-full max-w-xl'>
					<input
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder='Type username/repository to check your ranking!'
						className='w-full px-4 py-4 mb-4 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#7CB0FF]'
					/>
				</form>
			</main>
		</section>
	);
};

export default ExplorePage;
