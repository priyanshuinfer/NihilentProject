import React, { useState, useRef, useId, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRef = useRef(null);
  const errorRef = useRef(null);
  const emailId = useId();
  const passwordId = useId();
  const errorId = useId();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateForm = () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!emailRegex.test(trimmedEmail)) {
      setError("Invalid email format");
      return false;
    }
    if (!password.trim()) {
      setError("Password cannot be empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!validateForm()) {
      errorRef.current?.focus();
      setIsSubmitting(false);
      return;
    }

    const payload = {
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      const response = await fetch("http://localhost/magento2/rest/V1/signup/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const serverMsg = data.message || data.error || "Invalid email or password";
        setError(serverMsg);
        errorRef.current?.focus();
        setIsSubmitting(false);
        return;
      }

      onLogin(data.user || { email: payload.email }, data.token);
      navigate("/dashboard"); 
    } catch (err) {
      setError("Network or server error. Please try again later.");
      errorRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-white p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 w-full max-w-sm"
          noValidate
          autoComplete="off"
          aria-describedby={error ? errorId : undefined}
        >
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-8">
            Sign in to your account
          </h1>

          {error && (
            <div
              id={errorId}
              ref={errorRef}
              className="mb-4 text-red-500 text-sm text-center"
              role="alert"
              aria-live="assertive"
              tabIndex="-1"
            >
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor={emailId} className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id={emailId}
              type="email"
              placeholder="Your Email"
              value={email}
              ref={emailRef}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              required
              aria-required="true"
              aria-describedby={error ? errorId : undefined}
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <div className="mb-6">
            <label htmlFor={passwordId} className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id={passwordId}
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              required
              aria-required="true"
              aria-describedby={error ? errorId : undefined}
            />
          </div>

          <button
            type="submit"
            className={`h-10 px-4 w-full flex items-center justify-center ${
              validateForm() && !isSubmitting
                ? "bg-black hover:bg-gray-700 hover:shadow-slate-800"
                : "bg-gray-300 cursor-not-allowed"
            } shadow-md transition duration-300 rounded-md text-white font-medium`}
            disabled={!validateForm() || isSubmitting}
            aria-disabled={!validateForm() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/create-account")}
              className="text-black hover:underline focus:outline-none font-medium"
            >
              Create one
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;