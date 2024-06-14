import React, { useState } from "react";

const Navbar = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    onSearch(username);
  };

  return (
    <div className="bg-customBlack">
      <div className="flex justify-around items-center p-4">
        <h1 className="text-2xl font-bold text-textColor">GITHUB FINDER</h1>
        <div className="text-textColor flex gap-1">
          <p>By</p>
          <a href="" className="text-textColor underline">
            Allan Muhari
          </a>
        </div>
        <div className="flex items-center space-x-2 p-2 bg-070f2b">
          <input
            type="text"
            placeholder="enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-buttonColor p-1 rounded px-4 py-2">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
