import React, { useState } from "react";
import { FaSeedling, FaShoppingCart, FaClipboardList, FaChartLine, FaBars, FaUserCircle } from "react-icons/fa";
import "./CartPage.css";

interface CartItem {
  id: number;
  name: string;
  category: "Crop" | "Livestock" | "Other";
  price: string;
  image: string;
  inCart: boolean;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Fresh Maize",
      category: "Crop",
      price: "$15 / 10kg",
      image: "https://images.unsplash.com/photo-1603068689799-31a1d4b17c1d?auto=format&fit=crop&w=800&q=80",
      inCart: true,
      quantity: 2,
    },
    {
      id: 3,
      name: "Free-range Eggs",
      category: "Livestock",
      price: "$8 / dozen",
      image: "https://images.unsplash.com/photo-1589927986089-358123789ae7?auto=format&fit=crop&w=800&q=80",
      inCart: true,
      quantity: 3,
    },
    {
      id: 5,
      name: "Carrots",
      category: "Crop",
      price: "$20 / 10kg",
      image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      inCart: true,
      quantity: 1,
    },
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + priceNum * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
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
          <li>
            <FaChartLine /> Dashboard
          </li>
          <li>
            <FaClipboardList /> My Orders
          </li>
          <li className="active">
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
          <h1>Your Cart</h1>
          <p>Review and manage items in your cart before checkout.</p>
        </header>

        <section className="stats">
          <div className="stat-card blue">
            <h3>Total Items</h3>
            <h1>{totalItems}</h1>
          </div>
          <div className="stat-card green">
            <h3>Total Cost</h3>
            <h1>${totalCost.toFixed(2)}</h1>
          </div>
        </section>

        <section className="cart-items">
          <h2>Cart Items</h2>
          {cartItems.length === 0 ? (
            <p className="no-items">Your cart is empty.</p>
          ) : (
            <div className="cart-grid">
              {cartItems.map(item => (
                <article className="cart-card" key={item.id}>
                  <div className="card-media">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-info">
                    <div className="info-top">
                      <h3>{item.name}</h3>
                      <span className="badge">{item.category}</span>
                    </div>
                    <div className="meta">
                      <div>
                        <strong>Price</strong>
                        <div className="muted">{item.price}</div>
                      </div>
                      <div>
                        <strong>Quantity</strong>
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {cartItems.length > 0 && (
          <section className="checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </section>
        )}
      </main>
    </div>
  );
};

export default CartPage;