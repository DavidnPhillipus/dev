import React, { useState } from "react";
import { FaSeedling, FaWarehouse, FaChartLine, FaPlusCircle, FaBell, FaUserCircle } from "react-icons/fa";
import "./InventoryDashboard.css";

interface InventoryItem {
  id: number;
  name: string;
  category: "Crop" | "Livestock" | "Other";
  quantity: number;
  pricePerUnit: number;
  listed: boolean;
  image?: string;
}

const InventoryDashboard: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: "Fresh Maize", category: "Crop", quantity: 100, pricePerUnit: 20, listed: true, image: "https://images.unsplash.com/photo-1603068689799-31a1d4b17c1d?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Carrots", category: "Crop", quantity: 80, pricePerUnit: 15, listed: false, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Cattle", category: "Livestock", quantity: 12, pricePerUnit: 5000, listed: true, image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Tomatoes", category: "Crop", quantity: 60, pricePerUnit: 10, listed: false, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Potatoes", category: "Crop", quantity: 120, pricePerUnit: 18, listed: true, image: "https://images.unsplash.com/photo-1582515073490-3998132b9c57?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Onions", category: "Crop", quantity: 75, pricePerUnit: 12, listed: false, image: "https://images.unsplash.com/photo-1582515073490-3998132b9c57?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Sheep", category: "Livestock", quantity: 15, pricePerUnit: 3500, listed: true, image: "https://images.unsplash.com/photo-1559561853-8be64f03c576?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Goats", category: "Livestock", quantity: 20, pricePerUnit: 2500, listed: false, image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Spinach", category: "Crop", quantity: 50, pricePerUnit: 8, listed: true, image: "https://images.unsplash.com/photo-1551892589-865f698694e0?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Cabbage", category: "Crop", quantity: 40, pricePerUnit: 10, listed: false, image: "https://images.unsplash.com/photo-1574226516831-e1dff420e42e?auto=format&fit=crop&w=800&q=80" },
    { id: 11, name: "Eggs (Grade A)", category: "Livestock", quantity: 400, pricePerUnit: 0.12, listed: true, image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80" },
    { id: 12, name: "Honey", category: "Other", quantity: 15, pricePerUnit: 6.5, listed: false, image: "https://images.unsplash.com/photo-1505577058444-a3dab87b9f32?auto=format&fit=crop&w=800&q=80" },
    { id: 13, name: "Wheat", category: "Crop", quantity: 900, pricePerUnit: 0.45, listed: true, image: "https://images.unsplash.com/photo-1508536051667-2b5f7d1f7c13?auto=format&fit=crop&w=800&q=80" },
    { id: 14, name: "Barley", category: "Crop", quantity: 200, pricePerUnit: 0.5, listed: false, image: "https://images.unsplash.com/photo-1534850336045-c3b9b5b7b3d9?auto=format&fit=crop&w=800&q=80" },
    { id: 15, name: "Milk (Raw)", category: "Livestock", quantity: 320, pricePerUnit: 0.6, listed: true, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80" },
    { id: 16, name: "Beans Marlborough", category: "Crop", quantity: 45, pricePerUnit: 10, listed: false, image: "https://images.unsplash.com/photo-1542444459-db28f7f7f3d8?auto=format&fit=crop&w=800&q=80" },
    { id: 17, name: "Apples", category: "Crop", quantity: 150, pricePerUnit: 2.5, listed: true, image: "https://images.unsplash.com/photo-1448310062235-4cbfbbf9b8b6?auto=format&fit=crop&w=800&q=80" },
    { id: 18, name: "Bananas", category: "Crop", quantity: 220, pricePerUnit: 1.5, listed: false, image: "https://images.unsplash.com/photo-1574226516831-e1dff420e42e?auto=format&fit=crop&w=800&q=80" },
  ]);

  const toggleListed = (id: number) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, listed: !item.listed } : item));
  };

  const itemsPerPage: number = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = Math.max(1, Math.ceil(inventory.length / itemsPerPage));
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const currentItems: InventoryItem[] = inventory.slice(startIndex, startIndex + itemsPerPage);

  const totalInventory: number = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalListed: number = inventory.filter(item => item.listed).length;
  const totalCrops: number = inventory.filter(item => item.category === "Crop").reduce((sum, item) => sum + item.quantity, 0);
  const totalLivestock: number = inventory.filter(item => item.category === "Livestock").reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <FaSeedling className="logo-icon" />
          <h2>FarmSmart</h2>
        </div>
        <ul className="sidebar-links">
          <li><FaChartLine /> Dashboard</li>
          <li className="active"><FaWarehouse /> Inventory</li>
          <li><FaPlusCircle /> Add Crops</li>
          <li><FaPlusCircle /> Add Livestock</li>
          <li><FaBell /> Notifications</li>
        </ul>
        <div className="sidebar-footer">
          <FaUserCircle className="profile-icon" />
          <p className="profile-name">David Phillipus</p>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <h1>Inventory</h1>
          <p>Manage your crops and livestock; toggle items to appear on listings.</p>
        </header>

        <section className="stats">
          <div className="stat-card blue">
            <h3>Total Items</h3>
            <h1>{totalInventory}</h1>
            <p>in inventory</p>
          </div>
          <div className="stat-card green">
            <h3>Items Listed</h3>
            <h1>{totalListed}</h1>
            <p>on marketplace</p>
          </div>
          <div className="stat-card orange">
            <h3>Total Crops</h3>
            <h1>{totalCrops}</h1>
          </div>
          <div className="stat-card red">
            <h3>Total Livestock</h3>
            <h1>{totalLivestock}</h1>
          </div>
        </section>

        <section className="inventory-grid">
          {currentItems.map(item => (
            <article className="inventory-card" key={item.id}>
              <div className="card-media">
                <img src={item.image || "https://via.placeholder.com/600x400?text=No+Image"} alt={item.name} />
              </div>
              <div className="inventory-info">
                <div className="info-top">
                  <h3>{item.name}</h3>
                  <span className={`badge ${item.listed ? "badge-listed" : "badge-unlisted"}`}>{item.listed ? "Listed" : "Not Listed"}</span>
                </div>
                <div className="meta">
                  <div><strong>Category</strong><div className="muted">{item.category}</div></div>
                  <div><strong>Qty</strong><div className="muted">{item.quantity}</div></div>
                  <div><strong>Price</strong><div className="muted">${item.pricePerUnit}</div></div>
                </div>
                <div className="card-actions">
                  <button className={`toggle-btn ${item.listed ? "unlist" : "list"}`} onClick={() => toggleListed(item.id)}>
                    {item.listed ? "Unlist Item" : "List Item"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="pagination">
          <button
            className="page-btn prev"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
          <div className="page-indicator">Page {currentPage} of {totalPages}</div>
          <button
            className="page-btn next"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default InventoryDashboard;