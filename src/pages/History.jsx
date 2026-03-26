import { useEffect, useState } from "react";

function History() {
  const [posts, setPosts] = useState([]);

  // Load posts
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("posts")) || [];
      setPosts(stored);
    } catch (err) {
      console.error("Error loading posts:", err);
      setPosts([]);
    }
  }, []);

  // Copy
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // Delete
  const handleDelete = (id) => {
    const updated = posts.filter((post) => post.id !== id);
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold">History</h2>
        <p className="text-gray-500 text-sm mt-1">
          All your generated LinkedIn posts
        </p>
      </div>

      {/* POSTS */}
      {posts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center text-gray-500">
          No posts yet. Start generating 🚀
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {post.content}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleString()}
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleCopy(post.content)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;