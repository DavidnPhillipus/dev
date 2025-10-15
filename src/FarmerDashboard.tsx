import React, { useEffect, useState } from "react";
import {
  FaSeedling,
  FaWarehouse,
  FaChartLine,
  FaPlusCircle,
  FaBell,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./FarmerDashboard.css";

const FarmerDashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // when switching to desktop ensure mobile menu closed
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  const toggleMobile = () => setMobileOpen((s) => !s);
  const closeMobile = () => setMobileOpen(false);

  const stats = [
    { title: "Total Produce", value: "568", caption: "in storage" },
    { title: "Active Listings", value: "68", caption: "on the marketplace" },
    { title: "Orders Pending", value: "12", caption: "awaiting approval" },
    { title: "Revenue", value: "$5,380", caption: "this month" },
  ];

  return (
    <div className="dashboard-wrapper" aria-live="polite">
      {/* Mobile header: hamburger */}
      {isMobile && (
        <div className="mobile-header">
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="hamburger-btn"
            onClick={toggleMobile}
          >
            {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      )}

      {/* Overlay when mobile menu open */}
      <div
        className={`mobile-overlay ${mobileOpen ? "show" : ""}`}
        onClick={closeMobile}
        role="presentation"
      />

      {/* SIDEBAR */}
      <aside
        className={`sidebar ${mobileOpen ? "open" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <FaSeedling className="logo-icon" />
            <h2>FarmSmart</h2>
          </div>

          <ul className="sidebar-links" role="menu">
            <li className="active" role="menuitem" tabIndex={0}>
              <FaChartLine /> <span>Dashboard</span>
            </li>
            <li role="menuitem" tabIndex={0}>
              <FaPlusCircle /> <span>Add Crops</span>
            </li>
            <li role="menuitem" tabIndex={0}>
              <FaPlusCircle /> <span>Add Livestock</span>
            </li>
            <li role="menuitem" tabIndex={0}>
              <FaWarehouse /> <span>Inventory</span>
            </li>
            <li role="menuitem" tabIndex={0}>
              <FaBell /> <span>Notifications</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <FaUserCircle className="profile-icon" />
          <p className="profile-name">David Phillipus</p>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main" onClick={closeMobile}>
        <header className="header">
          <h1>Welcome Back, David 👨‍🌾</h1>
          <p>Here’s what’s happening on your farm today.</p>
        </header>

        <section className="stats" aria-label="Key stats">
          {stats.map((s, i) => (
            <div key={i} className="stat-card" role="article" aria-labelledby={`stat-${i}`}>
              <h3 id={`stat-${i}`}>{s.title}</h3>
              <h1>{s.value}</h1>
              <p>{s.caption}</p>
            </div>
          ))}
        </section>

        <section className="bottom-section">
          <div className="activity" aria-live="polite">
            <h2>Recent Activity</h2>
            <ul>
              <li>50kg maize added to inventory</li>
              <li>30kg carrots listed on marketplace</li>
              <li>Received 5 new orders</li>
            </ul>
          </div>

          <div className="cta">
            <h2>Need to add new crops?</h2>
            <p>Quickly register your next harvest and update your stock records.</p>
            <div className="cta-actions">
              <button className="add-btn" type="button">
                <FaPlusCircle /> Add New Crop
              </button>
              <button className="add-btn" type="button">
                <FaPlusCircle /> Add New Livestock
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FarmerDashboard;
