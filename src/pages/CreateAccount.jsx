import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [productType, setProductType] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    if (!name.trim()) return { isValid: false, message: "Please enter your full name." };
    if (!emailRegex.test(email.trim().toLowerCase())) return { isValid: false, message: "Invalid email format." };
    if (password.length < 6) return { isValid: false, message: "Password must be at least 6 characters." };
    if (!address.trim()) return { isValid: false, message: "Please enter your address." };
    if (!productType) return { isValid: false, message: "Please select a product type." };
    if (!userType) return { isValid: false, message: "Please select a user type." };
    return { isValid: true, message: "" };
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");
    setSuccess("");

    const { isValid, message } = validateForm();
    if (!isValid) {
      setError(message);
      errorRef.current?.focus();
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      address: address.trim(),
      productType,
      userType,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost/magento2/rest/V1/signup/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const serverMsg = data.message || data.error || `Failed to create account (HTTP ${response.status})`;
        setError(serverMsg);
        return;
      }

      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Network or server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
          aria-describedby={error ? "signup-error" : success ? "signup-success" : undefined}
        >
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">Create Accou</h1>

          {success && (
            <div
              id="signup-success"
              className="mb-4 text-green-600 text-sm text-center"
              role="status"
              aria-live="polite"
            >
              {success}
            </div>
          )}

          {error && (
            <div
              id="signup-error"
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
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm"
              required
              aria-required="true"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm"
              required
              aria-required="true"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm"
              required
              aria-required="true"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-white text-gray-700 rounded-md border border-gray-200 px-3 py-2 text-sm"
              required
              aria-required="true"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="product-type" className="block text-sm font-medium text-gray-700 mb-1">
              Produ Type
            </label>
            
          </div>

          <div className="mb-4">
            <label htmlFor="user-type" className="block text-sm font-medium text-gray-700 mb-1">
              User Type
            </label>
           
          </div>

          <button
            type="submit"
            className={`h-10 px-4 w-full flex items-center justify-center ${
              validateForm().isValid && !isSubmitting
                ? "bg-black hover:bg-gray-700"
                : "bg-gray-300 cursor-not-allowed"
            } shadow-md transition duration-300 rounded-md text-white font-medium`}
            disabled={!validateForm().isValid || isSubmitting}
            aria-disabled={!validateForm().isValid || isSubmitting}
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
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
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