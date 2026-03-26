import { useState } from "react";
import { generatePost } from "../utils/ai";

function GeneratePost() {
  const [practice, setPractice] = useState("");
  const [learning, setLearning] = useState("");
  const [goal, setGoal] = useState("");
  const [intent, setIntent] = useState("");
  const [tone, setTone] = useState("casual");
  const [wordCount, setWordCount] = useState(120);
  const [numPosts, setNumPosts] = useState(1);

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");

  // 🔥 Generate posts
  const handleGenerate = async () => {
    if (!practice && !learning && !goal) {
      setError("Please add some input");
      return;
    }

    setError("");
    setLoading(true);
    setOptions([]);

    const data = {
      practice,
      learning,
      goal,
      intent,
      tone,
      wordCount,
    };

    try {
      const results = [];

      for (let i = 0; i < numPosts; i++) {
        const res = await generatePost(data);
        if (res) results.push(res);
      }

      if (results.length === 0) {
        setError("Error generating posts");
      } else {
        setOptions(results);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }

    setLoading(false);

    // clear inputs
    setPractice("");
    setLearning("");
    setGoal("");
    setIntent("");
  };

  // 🔥 Save selected post
  const handleSelect = (post) => {
    const newPost = {
      id: Date.now(),
      content: post,
      date: new Date().toISOString(),
    };

    const existing =
      JSON.parse(localStorage.getItem("posts")) || [];

    const updated = [newPost, ...existing];

    localStorage.setItem("posts", JSON.stringify(updated));

    alert("Post saved to history!");
  };

  // 🔥 Copy
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="space-y-6">

      {/* FORM */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Generate Post</h2>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <input
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
          placeholder="What did you work on?"
          className="w-full p-3 rounded-lg border dark:bg-gray-700"
        />

        <input
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          placeholder="What did you learn?"
          className="w-full p-3 rounded-lg border dark:bg-gray-700"
        />

        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Next goal?"
          className="w-full p-3 rounded-lg border dark:bg-gray-700"
        />

        <input
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          placeholder="Intent (optional)"
          className="w-full p-3 rounded-lg border dark:bg-gray-700"
        />

        {/* Tone */}
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-gray-700"
        >
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="story">Story</option>
        </select>

        {/* Number of posts */}
        <div>
          <label className="text-sm">
            Number of posts:{" "}
            <span className="font-medium">{numPosts}</span>
          </label>

          <input
            type="range"
            min="1"
            max="3"
            value={numPosts}
            onChange={(e) => setNumPosts(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Word count */}
        <div>
          <label className="text-sm">
            Word Length:{" "}
            <span className="font-medium">{wordCount}</span>
          </label>

          <input
            type="range"
            min="50"
            max="300"
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:scale-105 transition"
        >
          {loading ? "Generating..." : "Generate Post"}
        </button>
      </div>

      {/* OUTPUT */}
      <div className="space-y-4">
        {options.map((post, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {post}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleSelect(post)}
                className="text-green-600 text-sm"
              >
                Select
              </button>

              <button
                onClick={() => handleCopy(post)}
                className="text-blue-600 text-sm"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratePost;