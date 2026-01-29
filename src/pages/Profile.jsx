import { useContext, useState } from "react";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, login } = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (!name) {
      setMessage("Name is required");
      return;
    }

    const updatedUser = {
      ...user,
      name, // only update name
    };

    login(updatedUser); // update context + localStorage
    setMessage("Profile updated ✅");
    setEdit(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6">

        <div className="max-w-4xl mx-auto space-y-6">

          {/* Hero Card */}
          <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-6 flex flex-col sm:flex-row items-center gap-6">

            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
              {name?.[0]?.toUpperCase()}
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center sm:text-left">

              {!edit ? (
                <>
                  <h1 className="text-3xl font-bold">
                    {user?.name}
                  </h1>

                  <p className="text-gray-500 mt-1">
                    {user?.email}
                  </p>
                </>
              ) : (
                <div className="space-y-3">

                  {/* Name Edit Only */}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Name"
                  />

                  {/* Email Read Only */}
                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>

                </div>
              )}

              <div className="mt-3 inline-block px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
                💼 Free Plan
              </div>

            </div>

          </div>

          {/* Message */}
          {message && (
            <p className="text-center text-green-600 text-sm">
              {message}
            </p>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-white rounded-xl shadow p-4 text-center">
              <p className="text-gray-500 text-sm">
                Status
              </p>
              <p className="font-bold text-green-600 mt-1">
                Active
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-4 text-center">
              <p className="text-gray-500 text-sm">
                Account Type
              </p>
              <p className="font-bold text-indigo-600 mt-1">
                Free
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-4 text-center">
              <p className="text-gray-500 text-sm">
                Member Since
              </p>
              <p className="font-bold mt-1">
                2025
              </p>
            </div>

          </div>

          {/* Account Information */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Account Information
            </h2>

            <div className="divide-y">

              <div className="flex justify-between py-3">
                <span className="text-gray-500">
                  Name
                </span>
                <span className="font-medium">
                  {user?.name}
                </span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-gray-500">
                  Email
                </span>
                <span className="font-medium">
                  {user?.email}
                </span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-gray-500">
                  Plan
                </span>
                <span className="font-medium text-indigo-600">
                  Free
                </span>
              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row gap-4 justify-between items-center">

            <p className="text-gray-600 text-sm">
              Manage your account settings
            </p>

            <div className="flex gap-3">

              {!edit ? (
                <button
                  onClick={() => setEdit(true)}
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEdit(false);
                      setName(user.name);
                    }}
                    className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100 text-sm"
                  >
                    Cancel
                  </button>
                </>
              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;
