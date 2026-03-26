import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function Layout() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen transition bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar dark={dark} setDark={setDark} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;