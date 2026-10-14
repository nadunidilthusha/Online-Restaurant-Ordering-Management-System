import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react'; // Imported icons
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/Button';
import './MenuAdmin.css';

export default function MenuManagementPage() {
  const [formData, setFormData] = useState({ dishName: '', price: '', category: 'Mains', description: '' });
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Added dynamic state for the menu table
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Fire-roasted Sea Bass', category: 'Mains', price: 'Rs. 3,500.00', status: 'Active' }
  ]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size must be less than 5MB" });
        e.target.value = null; 
        return;
      }

      setSelectedImage(file);
      setHasChanges(true);
      if (errors.image) setErrors({ ...errors, image: null });
    }
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.dishName.trim()) newErrors.dishName = "Dish name is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Enter a valid price";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!selectedImage) newErrors.image = "Please upload an image";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Dish validated and ready to save!");
    setErrors({});
    setHasChanges(false);
  };

  // Function to handle the remove action with a confirmation prompt
  const handleDeleteMenu = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the menu?`)) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  return (
    <div className="menu-admin-page">
      <div className="admin-page-header">
        <h1>Menu management</h1>
        <p>Add or edit restaurant dishes, prices, and categories</p>
      </div>

      <Card className="admin-card" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 className="admin-card-title">Add New Dish</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div>
            <Input label="Dish Name" placeholder="e.g. Fire-roasted Sea Bass" value={formData.dishName} onChange={(e) => handleChange('dishName', e.target.value)} />
            {errors.dishName && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.dishName}</span>}
          </div>
          <div>
            <Input label="Price (Rs)" type="number" placeholder="e.g. 3500" value={formData.price} onChange={(e) => handleChange('price', e.target.value)} />
            {errors.price && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.price}</span>}
          </div>
          <div>
            <Select label="Category" options={['Mains', 'Starters', 'Desserts']} value={formData.category} onChange={(e) => handleChange('category', e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <Input label="Description" placeholder="Short description of the dish..." value={formData.description} onChange={(e) => handleChange('description', e.target.value)} />
          {errors.description && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.description}</span>}
        </div>

        <div className="field">
          <label>Image</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: errors.image ? '1px solid #ef4444' : '1px solid #d4d4d4', padding: '12px 16px', borderRadius: '6px', background: '#ffffff' }}>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={handleImageChange} />
            <div style={{ color: selectedImage ? '#333' : '#888', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem' }}>📷</span> 
              {selectedImage ? selectedImage.name : 'Upload a dish photo (PNG, JPG up to 5MB)'}
            </div>
            <Button variant="outline" onClick={() => fileInputRef.current.click()} style={{ padding: '6px 16px', fontSize: '0.85rem', backgroundColor: '#f5f3f0', borderColor: '#d4d4d4', color: '#333' }}>
              {selectedImage ? 'Change' : 'Upload'}
            </Button>
          </div>
          {errors.image && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.image}</span>}
        </div>
      </Card>

      <Card className="admin-card" style={{ padding: '32px' }}>
        <h2 className="admin-card-title">Current Menu Items</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Dish Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td><span className="status-badge">{item.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Link to={`/admin/menu/${item.id}/edit`} title="Edit Dish" style={{ color: '#4b5563', display: 'flex', alignItems: 'center' }}>
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDeleteMenu(item.id, item.name)} 
                        title="Remove Dish"
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#888' }}>
                  No dishes currently listed.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {hasChanges && (
        <div className="sticky-bottom-bar">
          <span>You have unsaved changes</span>
          <div className="sticky-actions">
            <Button variant="outline" onClick={() => setHasChanges(false)} style={{ color: 'var(--ink)', backgroundColor: '#fff', borderColor: '#e9ecef' }}>Discard</Button>
            <Button variant="primary" onClick={handleSave}>Save & publish</Button>
          </div>
        </div>
      )}
    </div>
  );
}