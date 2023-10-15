'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'



const data = [
    { name: 'John Doe', repo: 'johndoe/repo1' },
    { name: 'm-shao', repo: 'hack-the-valley' },
    // Add more data as needed
  ];

const ExplorePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter(); // Define the router
    const filteredData = data.filter(item => {
        const namematch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const repomatch = item.repo.toLowerCase().includes(searchTerm.toLowerCase());
        return repomatch || namematch;
    });
    
    const handleSearch = (router) => {
        if (searchTerm.trim() !== '') {
          const filteredItem = filteredData.find(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.repo.toLowerCase().includes(searchTerm.toLowerCase())
          );
    
          if (filteredItem) {
            const { name, repo } = filteredItem;
            const encodedPersonName = encodeURIComponent(name);
            const encodedRepoName = encodeURIComponent(repo);
            router.push(`/view/${encodedPersonName}/${encodedRepoName}`);
          }
        }
      };

    return (
        <div className=''>
        <div className="flex items-center justify-center min-h-screen text-white bg-#18191A">
          <div className="flex flex-col">
            <h1 className="mb-2 text-lg font-bold text-[#7CB0FF]">Improve, Challenge and Rank Up</h1>
            <p className="mb-4 font-mono font-extralight text-8xl">Ranked GitHub</p>
            <form onSubmit={handleSearch}>
                <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type / to search"
                className="w-full p-2 mb-4 text-black bg-white rounded"
                />
            </form>
          </div>
    </div>
          


        </div>
        
      );
};

export default ExplorePage;
