import React from "react";
import Navbar from "./Components/Navbar";
import GitHubProfile from "./Components/GithubProfile";
import useStore from "./store/store";

const App = () => {
  const username = useStore((state) => state.username);
  const setUsername = useStore((state) => state.setUsername);

  return (
    <div>
      <Navbar onSearch={setUsername} />
      <GitHubProfile username={username} onUserClick={setUsername} />
    </div>
  );
};

export default App;
