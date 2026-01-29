import { useState, useContext } from "react";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

import {
  FiTag,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

function AddExpense() {
  const { user, token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      setError("All fields are required");
      return;
    }

    try {
      setError("");

      const res = await fetch(
        "http://localhost:5000/api/expense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user._id,
            title,
            amount: Number(amount),
            category,
            date,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to save expense");
      }

      setMessage("Expense Added Successfully");

      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");
    } catch (err) {
      setError("Failed to add expense");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-purple-50 p-6">

        <div className="max-w-xl mx-auto space-y-6">

          {/* Header */}
          <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-6 text-center">

            <h1 className="text-3xl font-bold mb-1">
              Add Transaction 💸
            </h1>

            <p className="text-gray-500 text-sm">
              Track your spending smartly
            </p>

          </div>

          {/* Success */}
          {message && (
            <div className="flex items-center justify-center gap-2 bg-green-50 text-green-600 p-3 rounded-xl shadow">

              <FiCheckCircle />
              <span className="text-sm">
                {message}
              </span>

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 text-center p-2 rounded-lg text-sm shadow">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Title */}
              <div className="relative">

                <FiTag className="absolute top-3 left-3 text-gray-400" />

                <input
                  type="text"
                  placeholder="Expense Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="w-full border pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

              </div>

              {/* Amount */}
              <div className="relative">

                <FiDollarSign className="absolute top-3 left-3 text-gray-400" />

                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  className="w-full border pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

              </div>

              {/* Category */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Category
                </p>

                <div className="flex flex-wrap gap-2">

                  {[
                    "Food",
                    "Travel",
                    "Rent",
                    "Shopping",
                    "Bills",
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setCategory(cat)
                      }
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        category === cat
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}

                </div>

              </div>

              {/* Date */}
              <div className="relative">

                <FiCalendar className="absolute top-3 left-3 text-gray-400" />

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full border pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

              </div>

              {/* Submit */}
              <button
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Save Expense
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default AddExpense;
