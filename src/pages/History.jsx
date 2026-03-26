import { useContext } from "react";
import EntryContext from "../context/EntryContext";

function History() {
  const { posts = [], setPosts } = useContext(EntryContext) || {};

  // 🗑 Delete post
  const handleDelete = (id) => {
    const updated = posts.filter((post) => post.id !== id);
    setPosts(updated);
  };

  // 📋 Copy post
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert("Copied!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">History</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Start generating your first post 🚀</p>
        
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-4 "
          >
            {/* Date */}
            <p className="text-sm text-gray-500">
              {new Date(post.date).toLocaleString()}
            </p>

            {/* Content */}
            <p className="whitespace-pre-line">{post.content}</p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleCopy(post.content)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Copy
              </button>

              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default History;