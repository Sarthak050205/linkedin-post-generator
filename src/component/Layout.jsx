import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8 ">
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;