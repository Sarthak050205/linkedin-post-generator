import { useState, useEffect } from "react";
import EntryContext from "./EntryContext";

function EntryProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem("posts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 🔥 NEW: global intent (persistent)
  const [globalIntent, setGlobalIntent] = useState(() => {
    return localStorage.getItem("globalIntent") || "";
  });

  // Save posts
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // 🔥 Save intent
  useEffect(() => {
    localStorage.setItem("globalIntent", globalIntent);
  }, [globalIntent]);

  return (
    <EntryContext.Provider
      value={{
        posts,
        setPosts,
        globalIntent,
        setGlobalIntent,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
}

export default EntryProvider;