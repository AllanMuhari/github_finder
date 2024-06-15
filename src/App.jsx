import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import GitHubProfile from "./Components/GithubProfile";

const App = () => {
  const [username, setUsername] = useState("AllanMuhari");

  const handleSearch = (newUsername) => {
    setUsername(newUsername);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <GitHubProfile username={username} onUserClick={handleSearch} />
    </div>
  );
};

export default App;
