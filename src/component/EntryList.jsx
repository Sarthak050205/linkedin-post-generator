import { useContext } from "react";
import EntryContext from "../context/EntryContext";

function EntryList() {
  const { entries, setEntries } = useContext(EntryContext);

  const handleDelete = (indexToDelete) => {
    const updated = entries.filter((_, index) => index !== indexToDelete);
    setEntries(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Entries</h2>

      {entries.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2"
        >
          <p>{item}</p>

          <button
            onClick={() => handleDelete(index)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default EntryList;
