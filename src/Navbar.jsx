import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex items-center">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600">
        PostAI
      </h1>

      {/* Center Links */}
      <div className="flex gap-6 mx-auto">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "text-gray-600 hover:text-blue-500"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/generate"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "text-gray-600 hover:text-blue-500"
          }
        >
          Generate
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "text-gray-600 hover:text-blue-500"
          }
        >
          History
        </NavLink>

      </div>

      <div className="w-16"></div>
    </div>
  );
}

export default Navbar;