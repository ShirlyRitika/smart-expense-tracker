import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import {
  FiHome,
  FiPlusCircle,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";

import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isProfilePage = location.pathname === "/profile";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-700";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">

      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-xl font-bold text-indigo-700"
        >
          💸 SmartExpense
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`flex items-center gap-1 hover:text-indigo-600 ${isActive(
              "/dashboard"
            )}`}
          >
            <FiHome />
            Dashboard
          </Link>

          {/* Add */}
          <Link
            to="/add-expense"
            className={`flex items-center gap-1 hover:text-indigo-600 ${isActive(
              "/add-expense"
            )}`}
          >
            <FiPlusCircle />
            Add
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">

            <button
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition ${
                isProfilePage
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              }`}
            >

              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                {user?.name?.[0]?.toUpperCase()}
              </span>

              <FiChevronDown size={14} />

            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border text-sm overflow-hidden">

                {/* Header */}
                <div className="px-4 py-2 bg-gray-50 border-b text-xs text-gray-600">
                  My Account
                </div>

                <div className="px-4 py-2 text-xs text-gray-500 border-b">
                  {user?.email}
                </div>

                {/* Profile */}
                <Link
                  to="/profile"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  👤 My Profile
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                >
                  🚪 Logout
                </button>

              </div>
            )}

          </div>

        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl text-indigo-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-4 py-4 space-y-4 text-sm border-t">

          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="block"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/add-expense"
            onClick={() => setOpen(false)}
            className="block"
          >
            ➕ Add Expense
          </Link>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block"
          >
            👤 My Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Logout
          </button>

        </div>
      )}

    </nav>
  );
}

export default Navbar;
