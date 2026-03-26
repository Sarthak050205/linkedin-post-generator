import { useContext } from "react";
import EntryContext from "../context/EntryContext";

function Dashboard() {
  const { posts = [] } = useContext(EntryContext) || {};

  const latest = posts[0];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <p className="text-gray-500 mt-1">
        Turn your coding progress into LinkedIn posts
      </p>
      {/* Latest Post */}
      <div>
        <h3 className="text-lg font-medium mb-2">Latest Post</h3>

        {latest ? (
          <div className="bg-white shadow-md rounded-lg p-4 ✅">
            {latest.content}
          </div>
        ) : (
          <p>No post generated yet</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
