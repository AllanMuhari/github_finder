import React, { useState } from "react";
import useStore from "../store/store";

const Navbar = () => {
  const [input, setInput] = useState("");
  const setUsername = useStore((state) => state.setUsername);

  const handleSearch = () => {
    setUsername(input);
  };

  return (
    <div className="bg-customBlack">
      <div className="flex flex-col sm:flex-row justify-around items-center p-4">
        <h1 className="text-xl sm:text-2xl font-bold text-textColor mb-2 sm:mb-0">
          GITHUB FINDER
        </h1>
        <div className="text-textColor flex gap-1 mb-2 sm:mb-0">
          <p>By</p>
          <a href="" className="text-textColor underline">
            Allan Muhari
          </a>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 p-2 bg-070f2b">
          <input
            type="text"
            placeholder="enter a username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-2 sm:mb-0 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-buttonColor rounded px-4 py-2">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
