import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  function handleLogin(email, pass) {
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("users")) || [];
    } catch (e) {
      console.error("Error parsing users from localStorage:", e);
    }

    const matchedUser = users.find(
      (u) => u.email === email && u.password === pass
    );

    if (matchedUser) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", email);
    } else {
      alert("Invalid email or password!");
      setIsLoggedIn(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <div>
                <h2>Welcome, {localStorage.getItem("username")}</h2>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Login page */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* Signup page */}
        <Route
          path="/CreateAccount"
          element={<CreateAccount />}
        />

        {/* 404 page */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
