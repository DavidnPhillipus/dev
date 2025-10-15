import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./farmer.css";

type Listing = {
  id: string;
  farmer_id: string;
  type: "crop" | "livestock";
  title: string;
  description?: string;
  category?: string;
  unit?: string;
  available_qty: number;
  price_per_unit: number;
  status?: string;
  images?: string[];
  created_at?: string;
};

type Transaction = {
  id: string;
  listing_id: string;
  buyer_id: string;
  farmer_id: string;
  unit_price: number;
  quantity: number;
  total_amount: number;
  status: "requested" | "confirmed" | "rejected" | "completed";
  created_at?: string;
  buyer_instructions?: string;
};

// keys used in localStorage (same as other pages)
const LISTINGS_KEY = "farmsmart_listings";
const TX_KEY = "farmsmart_transactions";

function readListings(): Listing[] {
  const raw = localStorage.getItem(LISTINGS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeListings(listings: Listing[]) {
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
}

function readTransactions(): Transaction[] {
  const raw = localStorage.getItem(TX_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeTransactions(txs: Transaction[]) {
  localStorage.setItem(TX_KEY, JSON.stringify(txs));
}

const FarmerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [listings, setListings] = useState<Listing[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedEdit, setSelectedEdit] = useState<Listing | null>(null);
  const [filter, setFilter] = useState<"all" | "available" | "low">("all");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const all = readListings().filter((l) => l.farmer_id === user.id);
    setListings(all);
    const tx = readTransactions().filter((t) => t.farmer_id === user.id).sort((a,b)=> (b.created_at||"").localeCompare(a.created_at||""));
    setTransactions(tx);
  }, [user, navigate]);

  // derived metrics
  const totals = useMemo(() => {
    const totalListings = listings.length;
    const totalQty = listings.reduce((s, l) => s + (Number(l.available_qty) || 0), 0);
    const revenue = transactions.reduce((s, t) => s + (Number(t.total_amount) || 0), 0);
    return { totalListings, totalQty, revenue };
  }, [listings, transactions]);

  // filters
  const lowThreshold = 5;
  const visibleListings = listings.filter((l) => {
    if (filter === "available") return (l.status ?? "available") === "available";
    if (filter === "low") return l.available_qty <= lowThreshold;
    if (search.trim()) return l.title.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  // actions
  const handleDelete = (id: string) => {
    if (!confirm("Delete listing? This cannot be undone.")) return;
    const remaining = listings.filter((l) => l.id !== id);
    writeListings([...readListings().filter((x) => x.id !== id)]);
    setListings(remaining);
  };

  const openEdit = (l: Listing) => setSelectedEdit(l);

  const saveEdit = (payload: Listing) => {
    const all = readListings();
    const idx = all.findIndex((x) => x.id === payload.id);
    if (idx >= 0) all[idx] = payload;
    else all.push(payload);
    writeListings(all);
    setListings(all.filter((x) => x.farmer_id === user?.id));
    setSelectedEdit(null);
  };

  const handleConfirmOrder = (txId: string) => {
    setBusyId(txId);
    // atomic-ish update
    setTimeout(() => {
      const allTx = readTransactions();
      const tx = allTx.find((t) => t.id === txId);
      if (!tx) { setBusyId(null); return; }
      // check stock
      const allListings = readListings();
      const listing = allListings.find((l) => l.id === tx.listing_id);
      if (!listing || listing.available_qty < tx.quantity) {
        alert("Insufficient stock to confirm this order.");
        setBusyId(null);
        return;
      }
      listing.available_qty = listing.available_qty - tx.quantity;
      if (listing.available_qty <= 0) listing.status = "sold_out";
      // update tx
      const idx = allTx.findIndex((t) => t.id === txId);
      allTx[idx] = { ...allTx[idx], status: "confirmed", created_at: new Date().toISOString() };
      writeListings(allListings);
      writeTransactions(allTx);
      // reload local state
      setListings(allListings.filter((l) => l.farmer_id === user?.id));
      setTransactions(allTx.filter((t) => t.farmer_id === user?.id));
      setBusyId(null);
    }, 450);
  };

  const handleRejectOrder = (txId: string) => {
    if (!confirm("Reject this order?")) return;
    const allTx = readTransactions();
    const idx = allTx.findIndex((t) => t.id === txId);
    if (idx >= 0) {
      allTx[idx] = { ...allTx[idx], status: "rejected" };
      writeTransactions(allTx);
      setTransactions(allTx.filter((t) => t.farmer_id === user?.id));
    }
  };

  const quickAddSample = (kind: "crop" | "livestock") => {
    const id = "l_" + Date.now();
    const newL: Listing = {
      id,
      farmer_id: user!.id,
      type: kind,
      title: kind === "crop" ? "Sample Maize - 25kg bag" : "Sample Cow",
      category: kind === "crop" ? "grains" : "livestock",
      unit: kind === "crop" ? "bag" : "head",
      available_qty: kind === "crop" ? 50 : 5,
      price_per_unit: kind === "crop" ? 12.5 : 250,
      status: "available",
      images: [],
      created_at: new Date().toISOString(),
    };
    const all = readListings();
    all.push(newL);
    writeListings(all);
    setListings(all.filter((l) => l.farmer_id === user!.id));
  };

  return (
    <div className="fd-root">
      <aside className="fd-sidebar">
        <div className="fd-brand">
          <svg width="36" height="36" viewBox="0 0 24 24"><path d="M12 2C8 6 4 12 4 16c0 4 3 6 8 6s8-2 8-6c0-4-4-10-8-14z" fill="var(--farm-green)"/></svg>
          <div>
            <div className="brand-name">FarmSmart</div>
            <div className="brand-sub muted">Farmer Portal</div>
          </div>
        </div>

        <nav className="fd-nav">
          <Link to="/farmer" className="fd-nav-link">Dashboard</Link>
          <Link to="/add-crop" className="fd-nav-link">Add Crop</Link>
          <Link to="/add-livestock" className="fd-nav-link">Add Livestock</Link>
          <Link to="/" className="fd-nav-link">Marketplace</Link>
        </nav>

        <div className="fd-sidebar-actions">
          <button className="btn small" onClick={() => quickAddSample("crop")}>+ Sample Crop</button>
          <button className="btn small outline" onClick={() => quickAddSample("livestock")}>+ Sample Livestock</button>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 12 }}>
          <div className="muted" style={{ marginBottom: 8 }}>Signed in as</div>
          <div style={{ fontWeight: 700 }}>{user?.name}</div>
          <button className="btn small outline" style={{ marginTop: 10 }} onClick={() => { logout(); navigate("/"); }}>Logout</button>
        </div>
      </aside>

      <main className="fd-main">
        <header className="fd-header">
          <h1>Dashboard</h1>
          <div className="fd-header-actions">
            <input className="fd-search" placeholder="Search listings..." value={search} onChange={(e)=>setSearch(e.target.value)} />
            <select value={filter} onChange={(e)=>setFilter(e.target.value as any)} className="fd-filter">
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="low">Low stock</option>
            </select>
          </div>
        </header>

        <section className="fd-stats">
          <div className="stat">
            <div className="stat-title">Listings</div>
            <div className="stat-value">{totals.totalListings}</div>
            <div className="stat-meta muted">Active listings</div>
          </div>

          <div className="stat">
            <div className="stat-title">Available Qty</div>
            <div className="stat-value">{totals.totalQty}</div>
            <div className="stat-meta muted">Units in stock</div>
          </div>

          <div className="stat">
            <div className="stat-title">Revenue</div>
            <div className="stat-value">${totals.revenue.toFixed(2)}</div>
            <div className="stat-meta muted">Total (all time)</div>
          </div>
        </section>

        <section className="fd-section">
          <div className="fd-section-head">
            <h2>Your Listings</h2>
            <div>
              <Link to="/add-crop" className="btn small">+ Add Crop</Link>
              <Link to="/add-livestock" className="btn small outline" style={{ marginLeft: 8 }}>+ Add Livestock</Link>
            </div>
          </div>

          {visibleListings.length === 0 ? (
            <div className="fd-empty">No listings match your filters.</div>
          ) : (
            <div className="fd-listings-grid">
              {visibleListings.map((l) => (
                <div key={l.id} className="fd-listing-card">
                  <div className="fd-listing-main">
                    <div className="fd-listing-title">{l.title}</div>
                    <div className="muted">{l.type} • {l.category ?? "—"}</div>
                    <div className="fd-listing-desc muted">{l.description ?? ""}</div>
                  </div>

                  <div className="fd-listing-meta">
                    <div className="meta-row"><strong>{l.available_qty}</strong> <span className="muted"> {l.unit ?? ""}</span></div>
                    <div className="meta-row muted">${l.price_per_unit.toFixed(2)} / unit</div>
                  </div>

                  <div className="fd-listing-actions">
                    <button className="btn small" onClick={()=>openEdit(l)}>Edit</button>
                    <button className="btn small outline" onClick={()=>handleDelete(l.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="fd-section">
          <h2>Recent Orders</h2>
          {transactions.length === 0 ? (
            <div className="fd-empty">No recent orders.</div>
          ) : (
            <table className="fd-table">
              <thead>
                <tr><th>Order</th><th>Listing</th><th>Qty</th><th>Total</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {transactions.slice(0, 12).map((tx) => {
                  const listing = readListings().find(l => l.id === tx.listing_id);
                  return (
                    <tr key={tx.id}>
                      <td>{tx.id}</td>
                      <td>{listing?.title ?? "—"}</td>
                      <td>{tx.quantity}</td>
                      <td>${tx.total_amount.toFixed(2)}</td>
                      <td className="muted">{tx.status}</td>
                      <td>
                        {tx.status === "requested" ? (
                          <>
                            <button className="btn small" disabled={busyId===tx.id} onClick={()=>handleConfirmOrder(tx.id)}>{busyId===tx.id ? "Confirming..." : "Confirm"}</button>
                            <button className="btn small outline" style={{ marginLeft:8 }} onClick={()=>handleRejectOrder(tx.id)}>Reject</button>
                          </>
                        ) : (
                          <span className="muted">{tx.status}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </main>

      {/* Edit Modal */}
      {selectedEdit && (
        <div className="fd-modal" role="dialog" aria-modal>
          <div className="fd-modal-card">
            <h3>Edit Listing</h3>
            <EditForm listing={selectedEdit} onCancel={() => setSelectedEdit(null)} onSave={(p)=>saveEdit(p)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;

/* ---------- Inline EditForm component (keeps file self-contained) ---------- */

function EditForm({ listing, onCancel, onSave } : { listing: Listing; onCancel: ()=>void; onSave: (payload: Listing)=>void }) {
  const [title, setTitle] = useState(listing.title);
  const [qty, setQty] = useState<number | "">(listing.available_qty);
  const [price, setPrice] = useState<number | "">(listing.price_per_unit);
  const [desc, setDesc] = useState(listing.description ?? "");
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      onSave({ ...listing, title, available_qty: Number(qty), price_per_unit: Number(price), description: desc });
    }}>
      <label className="ef-label">Title</label>
      <input className="ef-input" value={title} onChange={(e)=>setTitle(e.target.value)} />

      <label className="ef-label">Available Qty</label>
      <input className="ef-input" type="number" value={qty as any} onChange={(e)=>setQty(e.target.value === "" ? "" : Number(e.target.value))} />

      <label className="ef-label">Price per unit</label>
      <input className="ef-input" type="number" step="0.01" value={price as any} onChange={(e)=>setPrice(e.target.value === "" ? "" : Number(e.target.value))} />

      <label className="ef-label">Description</label>
      <textarea className="ef-input" value={desc} onChange={(e)=>setDesc(e.target.value)} rows={3} />

      <div style={{ display:"flex", gap:8, marginTop:12 }}>
        <button className="btn small" type="submit">Save</button>
        <button className="btn small outline" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
