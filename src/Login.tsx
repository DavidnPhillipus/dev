import React from "react";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <div className="auth-page">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🌿</span> FarmSmart
        </div>
      </nav>

      {/* ===== LOGIN CARD ===== */}
      <div className="auth-container">
        <div className="auth-card">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Sign in to manage your farm smarter</p>

          <form>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-footer">
              <a href="#" className="forgot">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>

            <p className="redirect-text">
              Don’t have an account? <a href="/register">Create one</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
