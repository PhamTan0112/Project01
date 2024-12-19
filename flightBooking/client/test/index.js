import React from "react";
import Router from "next/router";

function HomePage() {
  const navigateToLogin = () => {
    Router.push("/login"); // Chuyển hướng đến trang Login
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Home Page</h1>
      <button onClick={navigateToLogin} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
        Go to Login Page
      </button>
    </div>
  );
}

export default HomePage;
