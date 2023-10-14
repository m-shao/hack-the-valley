'use client';

import React, { useEffect, useState } from 'react';

return (
    <div className="container mx-auto">
        <div className="p-5 mb-4 bg-white rounded-t shadow-md">
            <h1 className="mb-4 text-2xl font-semibold">Achievements</h1>
            <div className="mb-4">
                <p>
                    Achievements Completed: {currentPoints}/{totalPoints}
                </p>
                <div className="w-full h-4 bg-gray-400 rounded">
                    <div
                        className="h-4 bg-blue-500 rounded"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
        <div className="flex flex-col space-y-4 h-[calc(100vh-148px)] overflow-scroll p-6">
            {userBadges.map((achievement, index) => (
                <AchievementCard key={index} {...achievement} />
            ))}
        </div>
    </div>
);

export default AchievementsPage;