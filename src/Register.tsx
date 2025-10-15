import React from "react";
import "./Register.css";

const Register: React.FC = () => {
  return (
    <div className="auth-page">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🌿</span> FarmSmart
        </div>
      </nav>

      {/* ===== REGISTER CARD ===== */}
      <div className="auth-container">
        <div className="auth-card">
          <h2>Create Account 🌱</h2>
          <p className="subtitle">Join FarmSmart and grow smarter</p>

          <form>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" placeholder="John Doe" required />
            </div>

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
              <label htmlFor="role">Select Role</label>
              <select id="role" required>
                <option value="">-- Choose your role --</option>
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>

            <p className="redirect-text">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
