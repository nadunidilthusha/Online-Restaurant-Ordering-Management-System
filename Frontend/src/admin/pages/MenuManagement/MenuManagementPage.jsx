import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
    // Clear error when user starts typing
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

    // Success - Ready to send to API
    alert("Dish validated and ready to save!");
    setErrors({});
    setHasChanges(false);
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
            <tr>
              <td><strong>Fire-roasted Sea Bass</strong></td><td>Mains</td><td>Rs. 3,500.00</td>
              <td><span className="status-badge">Active</span></td>
              <td><Link to="/admin/menu/1/edit" className="action-link">Edit</Link></td>
            </tr>
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