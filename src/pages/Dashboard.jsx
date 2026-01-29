import { useContext, useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

import {
  FiTrash2,
  FiTrendingUp,
  FiList,
  FiPieChart,
} from "react-icons/fi";

function Dashboard() {
  const { user, token } = useContext(AuthContext);

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch expenses
  const fetchExpenses = async () => {
  try {
    const res = await fetch(
  `http://localhost:5000/api/expense/${user._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      setExpenses(data);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchExpenses();
  }, []);

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/expense/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  const total = expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6">

        <div className="max-w-6xl mx-auto space-y-6">

          {/* Header */}
          <h1 className="text-3xl font-bold">
            Dashboard 📊
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">

              <FiTrendingUp className="text-indigo-600 text-3xl" />

              <div>
                <p className="text-sm text-gray-500">
                  Total Spent
                </p>
                <p className="text-2xl font-bold">
                  ₹ {total}
                </p>
              </div>

            </div>

            <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">

              <FiList className="text-green-600 text-3xl" />

              <div>
                <p className="text-sm text-gray-500">
                  Entries
                </p>
                <p className="text-2xl font-bold">
                  {expenses.length}
                </p>
              </div>

            </div>

            <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">

              <FiPieChart className="text-purple-600 text-3xl" />

              <div>
                <p className="text-sm text-gray-500">
                  Avg / Expense
                </p>
                <p className="text-2xl font-bold">
                  ₹{" "}
                  {expenses.length
                    ? Math.round(
                        total /
                          expenses.length
                      )
                    : 0}
                </p>
              </div>

            </div>

          </div>

          {/* Expense List */}
          <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-semibold mb-4">
              Recent Expenses
            </h2>

            {loading && (
              <p className="text-center text-gray-500">
                Loading...
              </p>
            )}

            {!loading &&
              expenses.length === 0 && (
                <p className="text-center text-gray-500">
                  No expenses yet
                </p>
              )}

            <div className="space-y-3">

              {expenses.map((e) => (
                <div
                  key={e._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-3 hover:shadow transition"
                >

                  <div>
                    <h4 className="font-semibold">
                      {e.title}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {e.category} • {e.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-2 sm:mt-0">

                    <span className="font-bold">
                      ₹ {e.amount}
                    </span>

                    <button
                      onClick={() =>
                        handleDelete(e._id)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;
