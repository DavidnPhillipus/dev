import React, { useState } from "react";
import { FaSeedling, FaShoppingCart, FaClipboardList, FaChartLine, FaBars, FaUserCircle } from "react-icons/fa";
import "./BuyerDashboard.css";

interface ListingItem {
  id: number;
  name: string;
  category: "Crop" | "Livestock" | "Other";
  price: string;
  image: string;
  inCart: boolean;
}

const BuyerDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [listings, setListings] = useState<ListingItem[]>([
    {
      id: 1,
      name: "Fresh Maize",
      category: "Crop",
      price: "$15 / 10kg",
      image: "https://images.unsplash.com/photo-1603068689799-31a1d4b17c1d?auto=format&fit=crop&w=800&q=80",
      inCart: false,
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      category: "Crop",
      price: "$10 / 5kg",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      inCart: false,
    },
    {
      id: 3,
      name: "Free-range Eggs",
      category: "Livestock",
      price: "$8 / dozen",
      image: "https://images.unsplash.com/photo-1589927986089-358123789ae7?auto=format&fit=crop&w=800&q=80",
      inCart: false,
    },
    {
      id: 4,
      name: "Beef Cattle",
      category: "Livestock",
      price: "$550 each",
      image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80",
      inCart: false,
    },
    {
      id: 5,
      name: "Carrots",
      category: "Crop",
      price: "$20 / 10kg",
      image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      inCart: false,
    },
    {
      id: 6,
      name: "Potatoes",
      category: "Crop",
      price: "$25 / 25kg",
      image: "https://images.unsplash.com/photo-1576179635661-26c92e1f3677?auto=format&fit=crop&w=800&q=80",
      inCart: false,
    },
    {
      id: 7,
      name: "Honey",
      category: "Other",
      price: "$12 / 500g",
      image: "https://images.unsplash.com/photo-1505577058444-a3dab87b9f32?auto=format&fit=crop&w=800&q=80",
      inCart: false,
    },
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const toggleCart = (id: number) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, inCart: !item.inCart } : item))
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredListings = listings.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory)
  );

  const itemsInCart = listings.filter(item => item.inCart).length;
  const totalSpent = 3240; // Static for demo purposes
  const pendingOrders = 5; // Static for demo purposes
  const totalPurchases = 24; // Static for demo purposes

  return (
    <div className="dashboard-container">
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <FaBars size={20} />
        </button>
      </div>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <FaSeedling className="logo-icon" />
          <h2>FarmSmart</h2>
        </div>
        <ul className="sidebar-links">
          <li className="active">
            <FaChartLine /> Dashboard
          </li>
          <li>
            <FaClipboardList /> My Orders
          </li>
          <li>
            <FaShoppingCart /> Cart
          </li>
        </ul>
        <div className="sidebar-footer">
          <FaUserCircle className="profile-icon" />
          <p className="profile-name">David Phillipus</p>
        </div>
      </aside>

      <div className={`mobile-overlay ${sidebarOpen ? "show" : ""}`} onClick={closeSidebar}></div>

      <main className="main">
        <header className="header">
          <h1>Welcome Back, David 👋</h1>
          <p>Browse and purchase available crops, livestock, and more from our farmers.</p>
        </header>

        <section className="stats">
          <div className="stat-card blue">
            <h3>Total Purchases</h3>
            <h1>{totalPurchases}</h1>
          </div>
          <div className="stat-card green">
            <h3>Pending Orders</h3>
            <h1>{pendingOrders}</h1>
          </div>
          <div className="stat-card orange">
            <h3>Items in Cart</h3>
            <h1>{itemsInCart}</h1>
          </div>
          <div className="stat-card red">
            <h3>Total Spent</h3>
            <h1>${totalSpent.toLocaleString()}</h1>
          </div>
        </section>

        <section className="filters">
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
            <option value="All">All Categories</option>
            <option value="Crop">Crop</option>
            <option value="Livestock">Livestock</option>
            <option value="Other">Other</option>
          </select>
        </section>

        <section className="listings">
          <h2>Available Listings</h2>
          {filteredListings.length === 0 ? (
            <p className="no-results">No listings match your search.</p>
          ) : (
            <div className="listing-grid">
              {filteredListings.map(item => (
                <article className="listing-card" key={item.id}>
                  <div className="card-media">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="listing-info">
                    <div className="info-top">
                      <h3>{item.name}</h3>
                      <span className={`badge ${item.inCart ? "badge-in-cart" : "badge-available"}`}>
                        {item.inCart ? "In Cart" : "Available"}
                      </span>
                    </div>
                    <div className="meta">
                      <div>
                        <strong>Category</strong>
                        <div className="muted">{item.category}</div>
                      </div>
                      <div>
                        <strong>Price</strong>
                        <div className="muted">{item.price}</div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                        className={`toggle-btn ${item.inCart ? "remove" : "add"}`}
                        onClick={() => toggleCart(item.id)}
                      >
                        {item.inCart ? "Remove from Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default BuyerDashboard;