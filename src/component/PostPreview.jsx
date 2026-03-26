import { useContext } from "react";
import EntryContext from "../context/EntryContext";

function PostPreview() {
  const { entries } = useContext(EntryContext);

  const postText = `
🚀 Progress Update

${entries.map((item) => `- ${item}`).join("\n")}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(postText);
    alert("Copied to clipboard!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Generated Post</h2>

      {entries.length === 0 ? (
        <p className="text-gray-500">No entries yet...</p>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <p className="font-semibold">🚀 Progress Update</p>

          <ul className="list-disc pl-5">
            {entries.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <button
            onClick={handleCopy}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Copy Post
          </button>
        </div>
      )}
    </div>
  );
}

export default PostPreview;
