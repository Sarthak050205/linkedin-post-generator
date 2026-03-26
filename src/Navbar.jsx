import { NavLink } from "react-router-dom";

function Navbar({ dark, setDark }) {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition";

  const active = "bg-blue-600 text-white shadow";
  const inactive =
    "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <nav className="bg-white dark:bg-gray-800 border-b shadow-sm">
      <div className="max-w-4xl mx-auto flex flex-col items-center py-4 gap-3">

        <h1 className="text-xl font-bold tracking-tight">
          LinkedIn Post Generator
        </h1>

        <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
          <NavLink to="/" className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }>
            Dashboard
          </NavLink>

          <NavLink to="/generate" className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }>
            Generate
          </NavLink>

          <NavLink to="/history" className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }>
            History
          </NavLink>
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white transition hover:scale-105"
        >
          {dark ? "Light ☀️" : "Dark 🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;