'use client';

import React, { useEffect, useState } from 'react';

const data = [
    { name: 'John Doe', repo: 'johndoe/repo1' },
    { name: 'Jane Smith', repo: 'janesmith/repo2' },
    // Add more data as needed
  ];

const ExplorePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredData = data.filter(item => {
        const namematch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const repomatch = item.repo.toLowerCase().includes(searchTerm.toLowerCase());
        return repomatch || namematch;
    });


    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#343434]">
          <div className="flex flex-col">
            <h1 className="mb-2 text-lg font-bold text-[#7CB0FF]">Improve, Challenge and Rank Up</h1>
            <p className="mb-4 font-mono font-extralight text-8xl">Ranked GitHub</p>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type / to search"
              className="p-2 mb-4 text-black bg-white rounded"
            />
          </div>
    
          <div className="flex flex-col items-center">
            {filteredData.map((item, index) => (
              <div key={index} className="my-2">
                <h2 className="text-xl">{item.name}</h2>
                <p>Repository: {item.repo}</p>
              </div>
            ))}
          </div>
        </div>
      );
};

export default ExplorePage;
