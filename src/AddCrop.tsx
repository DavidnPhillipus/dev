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
import "./AddCrop.css";

type Unit = "kg" | "bags" | "units" | "litres";

const AddCrop: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  // form state
  const [cropName, setCropName] = useState("");
  const [variety, setVariety] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [unit, setUnit] = useState<Unit>("kg");
  const [harvestDate, setHarvestDate] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState<number | "">("");
  const [category, setCategory] = useState("Vegetable");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  // image previews
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
    const files = Array.from(e.target.files).slice(0, 5); // limit 5 files
    setImages(files);
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!cropName.trim()) err.cropName = "Crop name is required.";
    if (!quantity || Number(quantity) <= 0) err.quantity = "Enter a valid quantity.";
    if (!harvestDate) err.harvestDate = "Select harvest date.";
    if (!pricePerUnit || Number(pricePerUnit) < 0) err.pricePerUnit = "Enter price (0 or more).";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Build payload — in a real app you'd send to API
    const payload = {
      cropName,
      variety,
      quantity: Number(quantity),
      unit,
      harvestDate,
      pricePerUnit: Number(pricePerUnit),
      category,
      location,
      description,
      images,
    };
    // For now just log and show a simple success (replace with API call)
    // eslint-disable-next-line no-console
    console.log("Submitting crop:", payload);
    alert("Crop submitted (check console).");
    // reset minimal fields
    setCropName("");
    setVariety("");
    setQuantity("");
    setPricePerUnit("");
    setHarvestDate("");
    setDescription("");
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
            <li className="active" role="menuitem" tabIndex={0}><FaPlusCircle /> <span>Add Crops</span></li>
            <li role="menuitem" tabIndex={0}><FaPlusCircle /> <span>Add Livestock</span></li>
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
          <h1>Add New Crop</h1>
          <p>Register a harvest or inventory item. Fill required fields and save.</p>
        </header>

        <form className="add-crop-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label className="form-field">
              <span className="label-text">Crop Name *</span>
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="e.g. Maize"
                aria-invalid={!!errors.cropName}
              />
              {errors.cropName && <small className="error">{errors.cropName}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Variety</span>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Yellow dent"
              />
            </label>

            <label className="form-field">
              <span className="label-text">Quantity *</span>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 50"
                min={0}
                aria-invalid={!!errors.quantity}
              />
              {errors.quantity && <small className="error">{errors.quantity}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Unit</span>
              <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
                <option value="kg">kg</option>
                <option value="bags">bags</option>
                <option value="units">units</option>
                <option value="litres">litres</option>
              </select>
            </label>

            <label className="form-field">
              <span className="label-text">Harvest Date *</span>
              <input
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                aria-invalid={!!errors.harvestDate}
              />
              {errors.harvestDate && <small className="error">{errors.harvestDate}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Price per unit (optional)</span>
              <input
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 12.50"
                min={0}
              />
              {errors.pricePerUnit && <small className="error">{errors.pricePerUnit}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Vegetable</option>
                <option>Fruit</option>
                <option>Grain</option>
                <option>Legume</option>
                <option>Other</option>
              </select>
            </label>

            <label className="form-field">
              <span className="label-text">Location</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Field A - Plot 3"
              />
            </label>

            <label className="form-field form-field-full">
              <span className="label-text">Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Optional notes about the crop, quality, storage..."
              />
            </label>

            <label className="form-field form-field-full">
              <span className="label-text">Images (max 5)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <div className="image-preview-row">
                {imagePreviews.length === 0 && <small className="hint">No images selected</small>}
                {imagePreviews.map((src, i) => (
                  <div className="image-preview" key={i}>
                    <img src={src} alt={`preview-${i}`} />
                  </div>
                ))}
              </div>
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="add-btn"><FaPlusCircle /> Save Crop</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                // reset form quickly
                setCropName("");
                setVariety("");
                setQuantity("");
                setUnit("kg");
                setHarvestDate("");
                setPricePerUnit("");
                setCategory("Vegetable");
                setLocation("");
                setDescription("");
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

export default AddCrop;
