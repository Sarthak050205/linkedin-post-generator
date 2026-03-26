import React, { useContext, useState } from "react";
import EntryContext from "../context/EntryContext";
function EntryForm() {
  const { entries, setEntries } = useContext(EntryContext);
  const [input, setInput] = useState("");
  const handleAdd = () => {
    if (input.trim() === "") return;
    setEntries([...entries, input]);
    setInput("");
  };
 
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add Entry</h2>

      <input
        type="text"
        value={input}
        placeholder="What did you learn"
        onChange={(e) => setInput(e.target.value)}
        className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
}

export default EntryForm;
