import React, { useEffect, useState } from "react";

const GitHubProfile = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch GitHub profile data
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
  }, [username]); // Re-fetch data when the username changes

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
    <div className="bg-gray-100  p-4 flex flex-col items-center">
      <div className="w-full  flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
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

        {/* Repositories and Followers Sections */}
        <div className="p-6 bg-gray-50 flex-grow">
          <h2 className="text-xl font-semibold mb-4">
            Repositories ({repositories.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold">{repo.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
                <div className="mt-3 text-sm flex items-center justify-between text-gray-500">
                  <span>🍴 {repo.forks_count} forks</span>
                  <span>⭐ {repo.stargazers_count} stars</span>
                </div>
              </div>
            ))}
          </div>

          {/* Followers List */}
          <h2 className="text-xl font-semibold mb-4">
            Followers ({followers.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {followers.map((follower) => (
              <div
                key={follower.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center">
                <img
                  src={follower.avatar_url}
                  alt={follower.login}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{follower.login}</h3>
                  <a href={follower.html_url} className="text-sm text-blue-500">
                    @{follower.login}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Following List */}
          <h2 className="text-xl font-semibold mb-4 mt-8">
            Following ({following.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {following.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{user.login}</h3>
                  <a href={user.html_url} className="text-sm text-blue-500">
                    @{user.login}
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
