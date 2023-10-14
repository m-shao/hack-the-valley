import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 text-white bg-gray-800">
      <div className="flex items-center">
        <span className="mr-4">
          <i className="fa fa-bars"></i>
        </span>
        <a href="https://github.com">
          <i className="mr-2 fab fa-github"></i>
        </a>
      </div>
      <div className="flex">
        <button className="px-4 py-2 mr-2 rounded-full hover:bg-gray-700 hover:border-white hover:border">
          <i className="mr-2 fa fa-gamepad"></i> Duels
        </button>
        <button className="px-4 py-2 mr-2 rounded-full hover:bg-gray-700 hover:border-white hover:border">
          <i className="mr-2 fa fa-trophy"></i> Leaderboards
        </button>
        <button className="px-4 py-2 rounded-full hover:bg-gray-700 hover:border-white hover:border">
          <i className="mr-2 fa fa-home"></i> Home
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
