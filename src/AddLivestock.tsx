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
import "./AddLivestock.css";

type Unit = "kg" | "lbs" | "head";

const AddLivestock: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  // form state
  const [animalType, setAnimalType] = useState("");
  const [breed, setBreed] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [avgWeight, setAvgWeight] = useState<number | "">("");
  const [weightUnit, setWeightUnit] = useState<Unit>("kg");
  const [ageMonths, setAgeMonths] = useState<number | "">("");
  const [healthStatus, setHealthStatus] = useState("Healthy");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // close mobile menu when switching to desktop
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (!images.length) {
      setImagePreviews([]);
      return;
    }
    const readers = images.map(
      (file) =>
        new Promise<string>((resolve) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result));
          r.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((paths) => setImagePreviews(paths));
  }, [images]);

  const toggleMobile = () => setMobileOpen((s) => !s);
  const closeMobile = () => setMobileOpen(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!animalType.trim()) err.animalType = "Animal type is required.";
    if (!quantity || Number(quantity) <= 0) err.quantity = "Enter a valid quantity.";
    if (avgWeight !== "" && Number(avgWeight) < 0) err.avgWeight = "Enter a valid weight.";
    if (purchasePrice !== "" && Number(purchasePrice) < 0) err.purchasePrice = "Enter a valid price.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      animalType,
      breed,
      quantity: Number(quantity),
      avgWeight: avgWeight === "" ? null : Number(avgWeight),
      weightUnit,
      ageMonths: ageMonths === "" ? null : Number(ageMonths),
      healthStatus,
      purchaseDate,
      purchasePrice: purchasePrice === "" ? null : Number(purchasePrice),
      location,
      notes,
      images,
    };
    // Replace with real API call in your app
    // eslint-disable-next-line no-console
    console.log("Submitting livestock:", payload);
    alert("Livestock record submitted (check console).");

    // reset minimal fields
    setAnimalType("");
    setBreed("");
    setQuantity("");
    setAvgWeight("");
    setAgeMonths("");
    setPurchaseDate("");
    setPurchasePrice("");
    setLocation("");
    setNotes("");
    setImages([]);
    setImagePreviews([]);
    setErrors({});
  };

  return (
    <div className="dashboard-wrapper">
      {/* Mobile hamburger */}
      {isMobile && (
        <div className="mobile-header">
          <button
            className="hamburger-btn"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={toggleMobile}
            type="button"
          >
            {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      )}

      {/* overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? "show" : ""}`}
        onClick={closeMobile}
        role="presentation"
      />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`} role="navigation" aria-label="Main">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <FaSeedling className="logo-icon" />
            <h2>FarmSmart</h2>
          </div>

          <ul className="sidebar-links" role="menu">
            <li role="menuitem" tabIndex={0}><FaChartLine /> <span>Dashboard</span></li>
            <li role="menuitem" tabIndex={0}><FaPlusCircle /> <span>Add Crops</span></li>
            <li className="active" role="menuitem" tabIndex={0}><FaPlusCircle /> <span>Add Livestock</span></li>
            <li role="menuitem" tabIndex={0}><FaWarehouse /> <span>Inventory</span></li>
            <li role="menuitem" tabIndex={0}><FaBell /> <span>Notifications</span></li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <FaUserCircle className="profile-icon" />
          <p className="profile-name">David Phillipus</p>
        </div>
      </aside>

      {/* Main */}
      <main className="main" onClick={closeMobile}>
        <header className="header">
          <h1>Add Livestock</h1>
          <p>Register livestock entries — required fields marked with *</p>
        </header>

        <form className="add-livestock-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label className="form-field">
              <span className="label-text">Animal Type *</span>
              <input
                type="text"
                value={animalType}
                onChange={(e) => setAnimalType(e.target.value)}
                placeholder="e.g. Cattle, Goat"
                aria-invalid={!!errors.animalType}
              />
              {errors.animalType && <small className="error">{errors.animalType}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Breed</span>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g. Brahman, Boer"
              />
            </label>

            <label className="form-field">
              <span className="label-text">Quantity *</span>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 10"
                min={0}
                aria-invalid={!!errors.quantity}
              />
              {errors.quantity && <small className="error">{errors.quantity}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Avg Weight</span>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="number"
                  value={avgWeight}
                  onChange={(e) => setAvgWeight(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 250"
                  min={0}
                  style={{ flex: 1 }}
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as Unit)}
                  style={{ width: 90 }}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                  <option value="head">head</option>
                </select>
              </div>
              {errors.avgWeight && <small className="error">{errors.avgWeight}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Age (months)</span>
              <input
                type="number"
                value={ageMonths}
                onChange={(e) => setAgeMonths(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 12"
                min={0}
              />
            </label>

            <label className="form-field">
              <span className="label-text">Health Status</span>
              <select value={healthStatus} onChange={(e) => setHealthStatus(e.target.value)}>
                <option>Healthy</option>
                <option>Needs Attention</option>
                <option>Sick</option>
                <option>Quarantined</option>
              </select>
            </label>

            <label className="form-field">
              <span className="label-text">Purchase Date</span>
              <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            </label>

            <label className="form-field">
              <span className="label-text">Purchase Price</span>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 1200"
                min={0}
              />
              {errors.purchasePrice && <small className="error">{errors.purchasePrice}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Location</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Pasture A"
              />
            </label>

            <label className="form-field form-field-full">
              <span className="label-text">Notes</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Optional notes about health, feed, tags..."
              />
            </label>

            <label className="form-field form-field-full">
              <span className="label-text">Images (max 5)</span>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} />
              <div className="image-preview-row">
                {imagePreviews.length === 0 && <small className="hint">No images selected</small>}
                {imagePreviews.map((src, i) => (
                  <div className="image-preview" key={i}>
                    <img src={src} alt={`livestock-preview-${i}`} />
                  </div>
                ))}
              </div>
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="add-btn"><FaPlusCircle /> Save Livestock</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setAnimalType("");
                setBreed("");
                setQuantity("");
                setAvgWeight("");
                setAgeMonths("");
                setPurchaseDate("");
                setPurchasePrice("");
                setLocation("");
                setNotes("");
                setImages([]);
                setImagePreviews([]);
                setErrors({});
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddLivestock;
