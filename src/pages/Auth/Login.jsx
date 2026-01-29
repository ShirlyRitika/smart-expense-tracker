import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../utils/auth";

import {
  authContainer,
  authItem,
} from "../../utils/animations";

function Login() {
  // Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Call backend API
      const res = await loginUser(email, password);

      // Save user in context
      login(res.user);

      // Save token
      localStorage.setItem("token", res.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">

      <motion.div
        variants={authContainer}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl"
      >

        {/* Title */}
        <motion.h2
          variants={authItem}
          className="text-3xl font-bold text-center mb-2"
        >
          Welcome Back 👋
        </motion.h2>

        <motion.p
          variants={authItem}
          className="text-center text-gray-500 mb-6"
        >
          Login to manage your expenses
        </motion.p>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ x: -10 }}
            animate={{ x: [-10, 10, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
            className="text-red-600 text-center mb-3"
          >
            {error}
          </motion.p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <motion.input
            variants={authItem}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <motion.input
            variants={authItem}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <motion.button
            variants={authItem}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold shadow-md disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

        </form>

        {/* Footer */}
        <motion.p
          variants={authItem}
          className="text-center mt-5 text-sm"
        >
          No account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium"
          >
            Register
          </Link>
        </motion.p>

      </motion.div>
    </div>
  );
}

export default Login;
