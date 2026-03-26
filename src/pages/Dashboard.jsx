import { useEffect, useState } from "react";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("posts")) || [];
      setPosts(stored);
    } catch (err) {
      console.error("Error reading posts:", err);
      setPosts([]);
    }
  }, []);

  const latestPost = posts[0]; // newest first

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-2">
          Dashboard
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          Track your LinkedIn posting journey 🚀
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Total Posts</p>
          <h3 className="text-2xl font-bold mt-1">
            {posts.length}
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Status</p>
          <h3 className="text-lg font-medium mt-1">
            {posts.length > 0 ? "Active 🔥" : "Start Posting"}
          </h3>
        </div>
      </div>

      {/* LATEST POST */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-3">
          Latest Post
        </h3>

        {latestPost ? (
          <>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {latestPost.content}
            </p>

            <p className="text-xs text-gray-500 mt-3">
              {new Date(latestPost.date).toLocaleString()}
            </p>
          </>
        ) : (
          <p className="text-gray-500 text-sm">
            No posts generated yet.
          </p>
        )}
      </div>

    </div>
  );
}

export default Dashboard;