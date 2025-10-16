import React, { useState } from "react";
import { FaSeedling, FaShoppingCart, FaClipboardList, FaChartLine, FaBars, FaUserCircle } from "react-icons/fa";
import "./OrdersPage.css";

interface OrderItem {
  id: number;
  name: string;
  category: "Crop" | "Livestock" | "Other";
  price: string;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  date: string;
  items: OrderItem[];
  total: number;
  status: "Pending" | "Delivered" | "Cancelled";
}

const OrdersPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const orders: Order[] = [
    {
      id: 1,
      date: "2025-10-10",
      items: [
        {
          id: 1,
          name: "Fresh Maize",
          category: "Crop",
          price: "$15 / 10kg",
          quantity: 2,
          image: "https://images.unsplash.com/photo-1603068689799-31a1d4b17c1d?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          name: "Free-range Eggs",
          category: "Livestock",
          price: "$8 / dozen",
          quantity: 3,
          image: "https://images.unsplash.com/photo-1589927986089-358123789ae7?auto=format&fit=crop&w=800&q=80",
        },
      ],
      total: 39,
      status: "Pending",
    },
    {
      id: 2,
      date: "2025-10-05",
      items: [
        {
          id: 5,
          name: "Carrots",
          category: "Crop",
          price: "$20 / 10kg",
          quantity: 1,
          image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
        },
      ],
      total: 20,
      status: "Delivered",
    },
    {
      id: 3,
      date: "2025-09-28",
      items: [
        {
          id: 7,
          name: "Honey",
          category: "Other",
          price: "$12 / 500g",
          quantity: 2,
          image: "https://images.unsplash.com/photo-1505577058444-a3dab87b9f32?auto=format&fit=crop&w=800&q=80",
        },
      ],
      total: 24,
      status: "Cancelled",
    },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const filteredOrders = statusFilter === "All"
    ? orders
    : orders.filter(order => order.status === statusFilter);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === "Pending").length;
  const deliveredOrders = orders.filter(order => order.status === "Delivered").length;

  return (
    <div className="orders-container">
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
          <li className="active">
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
          <h1>My Orders</h1>
          <p>View and manage your past and pending orders.</p>
        </header>

        <section className="stats">
          <div className="stat-card blue">
            <h3>Total Orders</h3>
            <h1>{totalOrders}</h1>
          </div>
          <div className="stat-card green">
            <h3>Pending Orders</h3>
            <h1>{pendingOrders}</h1>
          </div>
          <div className="stat-card orange">
            <h3>Delivered Orders</h3>
            <h1>{deliveredOrders}</h1>
          </div>
        </section>

        <section className="filters">
          <select value={statusFilter} onChange={handleStatusFilter} className="status-select">
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </section>

        <section className="orders">
          <h2>Your Orders</h2>
          {filteredOrders.length === 0 ? (
            <p className="no-orders">No orders match your filter.</p>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map(order => (
                <article className="order-card" key={order.id}>
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`badge badge-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-meta">
                    <div>
                      <strong>Date</strong>
                      <div className="muted">{order.date}</div>
                    </div>
                    <div>
                      <strong>Total</strong>
                      <div className="muted">${order.total.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="order-items">
                    <h4>Items</h4>
                    {order.items.map(item => (
                      <div className="order-item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                          <h5>{item.name}</h5>
                          <p>Category: {item.category}</p>
                          <p>Price: {item.price}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
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

export default OrdersPage;