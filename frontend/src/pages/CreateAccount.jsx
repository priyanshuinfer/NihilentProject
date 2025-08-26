import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const checkEmail = (email) => emailRegex.test(email.trim().toLowerCase());

  const validateForm = () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!checkEmail(trimmedEmail)) {
      setError("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === trimmedEmail)) {
      setError("User with this email already exists");
      return false;
    }
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name: name.trim(), email: email.trim().toLowerCase(), password });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Account created successfully!");
    setName("");
    setEmail("");
    setPassword("");

    // Redirect to login after 1.5s
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div>
      <Navbar />
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-sky-50 to-white overflow-hidden">
    <form
    onSubmit={handleSignup}
    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 w-full max-w-md max-h-[90vh] overflow-auto"
    noValidate
    autoComplete="off"
    >
    <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
      Create Account
      </h1>

        {success && (
          <div className="mb-4 text-green-600 text-sm text-center" role="alert" aria-live="polite">
            {success}
          </div>
        )}

        {/* Name Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

         <div className="mb-4">
          <input
            type="text"
            placeholder="Address"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            required
          />
        </div>
         <div className="mb-4">
                 <select
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                required
                >
                  <option value="">Select Product Type</option>
                  <option value="Oil">Picture</option>
                  <option value="Oil">Painting</option>
    
                </select>
            </div>

         <div className="mb-4">
          
            
            
            <select
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            required
          >
                  <option value="">Select User Type</option>
                  <option value="Oil">Admin User</option>
                  <option value="Oil">Painting Buyer</option>
                  <option value="Oil">Picture Buyer</option>
    
                </select>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="h-10 px-4 w-full bg-black hover:bg-gray-500 shadow-md transition duration-500 rounded-md text-white font-medium  "
          disabled={!name.trim() || !email.trim() || !password.trim()}
        >
          Sign Up
        </button>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-black hover:underline focus:outline-none font-medium"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  </div>
  );
}

export default CreateAccount;
