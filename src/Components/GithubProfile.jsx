import React, { useEffect, useState } from "react";
import { FaCodeFork } from "react-icons/fa6";

const GitHubProfile = ({ username, onUserClick }) => {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          profileResponse,
          reposResponse,
          followersResponse,
          followingResponse,
        ] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos`),
          fetch(`https://api.github.com/users/${username}/followers`),
          fetch(`https://api.github.com/users/${username}/following`),
        ]);

        if (
          !profileResponse.ok ||
          !reposResponse.ok ||
          !followersResponse.ok ||
          !followingResponse.ok
        ) {
          throw new Error("Failed to fetch data from GitHub API");
        }

        const profileData = await profileResponse.json();
        const reposData = await reposResponse.json();
        const followersData = await followersResponse.json();
        const followingData = await followingResponse.json();

        setProfile(profileData);
        setRepositories(reposData);
        setFollowers(followersData);
        setFollowing(followingData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to fetch data from GitHub API");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-4">User not found</div>;
  }

  return (
    <div className="bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Section */}
        <div className="p-6 bg-indigo-900 text-white flex flex-col items-center lg:w-1/3">
          <img
            src={profile.avatar_url}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold">
            {profile.name || profile.login}
          </h1>
          <p className="text-sm">@{profile.login}</p>
          <p className="text-center mt-2">{profile.bio}</p>
          <p className="mt-4">
            <span role="img" aria-label="location">
              📍
            </span>{" "}
            {profile.location}
          </p>
          <div className="mt-6">
            <p className="mb-1">
              <strong>{profile.public_repos}</strong> repositories
            </p>
            <p className="mb-1">
              <strong>{profile.followers}</strong> followers
            </p>
            <p>
              <strong>{profile.following}</strong> following
            </p>
          </div>
        </div>

        {/* Repositories Section */}
        <div className="p-6 bg-gray-50 flex-grow">
          <h2 className="text-xl font-semibold mb-4">
            Repositories ({repositories.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className="bg-white rounded-lg text-center bg-projectColor shadow overflow-hidden transition-shadow border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">{repo.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {repo.description || "No description available"}
                </p>
                <div className="flex justify-around p-2 text-sm w-full bg-projectColor2 text-gray-500">
                  <span>
                    <FaCodeFork /> {repo.forks_count} forks
                  </span>
                  <span>⭐ {repo.stargazers_count} stars</span>
                </div>
              </div>
            ))}
          </div>

          {/* Followers List */}
          <h2 className="text-xl font-semibold mb-4">
            Followers ({followers.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {followers.map((follower) => (
              <div
                key={follower.id}
                className="bg-projectColor2 p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center border border-gray-200 cursor-pointer"
                onClick={() => onUserClick(follower.login)}>
                <img
                  src={follower.avatar_url}
                  alt={follower.login}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{follower.login}</h3>
                  <a
                    href={follower.html_url}
                    className="text-sm text-blue-600 mt-2"
                    target="_blank"
                    rel="noopener noreferrer">
                    view {follower.login}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Following List */}
          <h2 className="text-xl font-semibold mb-4 mt-8">
            Following ({following.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {following.map((user) => (
              <div
                key={user.id}
                className="bg-yellow-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center border border-gray-200 cursor-pointer"
                onClick={() => onUserClick(user.login)}>
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{user.login}</h3>
                  <a
                    href={user.html_url}
                    className="text-sm text-blue-600 mt-2"
                    target="_blank"
                    rel="noopener noreferrer">
                    view {user.login}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubProfile;
