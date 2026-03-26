import { useState, useContext } from "react";
import EntryContext from "../context/EntryContext";
import { generatePost } from "../utils/ai";

function GeneratePost() {
  const { posts, setPosts, globalIntent, setGlobalIntent } =
    useContext(EntryContext);

  const [practice, setPractice] = useState("");
  const [learning, setLearning] = useState("");
  const [goal, setGoal] = useState("");
  const [intent, setIntent] = useState("");

  const [tone, setTone] = useState("casual");
  const [count, setCount] = useState(1);

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [useHistory, setUseHistory] = useState(false);
  const [wordCount, setWordCount] = useState(120);
  const handleGenerate = async () => {
    if (!practice && !learning && !goal) {
      alert("Please add some input");
      return;
    }

    setLoading(true);
    setOptions([]);

    const data = {
      practice,
      learning,
      goal,
      tone,
      intent: intent || globalIntent, // 🔥 use global
      useHistory,
      history: posts,
      wordCount,
    };

    try {
      const results = [];

      for (let i = 0; i < count; i++) {
        const res = await generatePost(data);

        if (res && res.trim() !== "") {
          results.push(res);
        }
      }

      setOptions(results);
      setPractice("");
      setLearning("");
      setGoal("");
    } catch (err) {
      console.error(err);
      alert("Error generating posts");
    }

    setLoading(false);
  };

  const handleSelect = (content) => {
    const newPost = {
      id: Date.now(),
      content,
      date: new Date().toISOString(),
      tone,
      inputs: {
        practice,
        learning,
        goal,
        intent: intent || globalIntent,
      },
    };

    setPosts((prev) => [newPost, ...prev]);
    setOptions([]);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1 mb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          AI Post Generator
        </h2>
        <p className="text-gray-500">
          Turn your coding progress into LinkedIn posts
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl p-5 space-y-4">
        <input
          placeholder="What did you build?"
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          placeholder="What did you learn?"
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          placeholder="Next goal?"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {/* 🔥 Intent */}
        <input
          placeholder="Optional: Describe style (e.g. Day 2, storytelling...)"
          value={intent || globalIntent}
          onChange={(e) => {
            setIntent(e.target.value);
            setGlobalIntent(e.target.value); // 🔥 persist
          }}
          className="w-full border p-3 rounded-lg"
        />

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="story">Story</option>
        </select>

        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full border p-3 rounded-lg"
        >
          <option value={1}>1 Post</option>
          <option value={2}>2 Posts</option>
          <option value={3}>3 Posts</option>
        </select>
          <div className="space-y-2">
  <label className="text-sm text-gray-600">
    Post Length: {wordCount} words
  </label>

  <input
    type="range"
    min="50"
    max="300"
    step="10"
    value={wordCount}
    onChange={(e) => setWordCount(Number(e.target.value))}
    className="w-full"
  />
</div> 
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useHistory}
            onChange={() => setUseHistory(!useHistory)}
          />
          <label className="text-sm text-gray-600">
            Continue from previous posts
          </label>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg w-full"
        >
          {loading ? "Generating..." : "Generate Post"}
        </button>
      </div>

      {options.length > 0 && (
        <div className="space-y-4">
          {options.map((post, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5"
            >
              <p className="whitespace-pre-line">{post}</p>

              <button
                onClick={() => handleSelect(post)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-3"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GeneratePost;