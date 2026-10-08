import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import Select from '../../../components/common/Select';
import Textarea from '../../../components/common/Textarea';
import Button from '../../../components/common/Button';
import './MenuAdmin.css';

export default function EditMenuPage() {
  const { id } = useParams();
  
  // Initialize with mock data for the edit screen
  const [formData, setFormData] = useState({
    dishName: 'Fire-roasted Sea Bass',
    price: '3500',
    category: 'Mains',
    description: 'Fresh catch served with local herbs, handmade daily by our chefs over open fire.',
    isActive: true
  });
  
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setHasChanges(true);
    }
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.dishName.trim()) newErrors.dishName = "Dish name cannot be empty";
    if (!formData.price || formData.price <= 0) newErrors.price = "Enter a valid price";
    if (!formData.description.trim()) newErrors.description = "Description cannot be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Updates validated and ready to save!");
    setErrors({});
    setHasChanges(false);
  };

  return (
    <div className="menu-admin-page">
      <Link to="/admin/menu" style={{ color: '#888', fontSize: '0.9rem', display: 'inline-block', marginBottom: '16px', textDecoration: 'none', fontWeight: '500' }}>
        ← Back to Menu
      </Link>
      
      <div className="admin-page-header">
        <h1>Edit Menu Item</h1>
        <p>Update details for {formData.dishName}.</p>
      </div>

      <Card className="admin-card" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 className="admin-card-title">Basic Information</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', marginBottom: '32px' }}>
          <div>
            <Input label="Dish Name" value={formData.dishName} onChange={(e) => handleChange('dishName', e.target.value)} />
            {errors.dishName && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.dishName}</span>}
          </div>
          <div>
            <Input label="Price (Rs)" type="number" value={formData.price} onChange={(e) => handleChange('price', e.target.value)} />
            {errors.price && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.price}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          <Select label="Category" options={['Mains', 'Starters', 'Desserts']} value={formData.category} onChange={(e) => handleChange('category', e.target.value)} />
          
          <div className="toggle-wrapper" style={{ marginTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '4px', color: '#888' }}>Availability Status</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
              <label className="switch">
                <input type="checkbox" checked={formData.isActive} onChange={(e) => handleChange('isActive', e.target.checked)} />
                <span className="slider"></span>
              </label>
              <span className="toggle-label" style={{ color: formData.isActive ? '#4ade80' : '#888', fontSize: '0.85rem', fontWeight: '500' }}>
                {formData.isActive ? 'Active on Menu' : 'Hidden from Menu'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="admin-card" style={{ padding: '32px' }}>
        <h2 className="admin-card-title">Description & Media</h2>
        
        <div className="form-grid-2-col">
          <div>
            <Textarea label="Menu Description" rows={6} value={formData.description} onChange={(e) => handleChange('description', e.target.value)} />
            {errors.description && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.description}</span>}
          </div>
          
          <div className="field">
            <label>Dish Image</label>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={handleImageChange} />
            <div className="image-upload-box" style={{ padding: '30px', minHeight: '180px' }} onClick={() => fileInputRef.current.click()}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '16px' }} />
              ) : (
                <div style={{ width: '80px', height: '80px', backgroundColor: '#f1f3f5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', marginBottom: '16px', color: '#adb5bd', fontSize: '0.8rem' }}>120 × 120</div>
              )}
              <span style={{ fontWeight: '500', color: '#333', fontSize: '0.95rem' }}>+ Replace Image</span>
              <small style={{ marginTop: '6px', fontSize: '0.75rem', color: '#888' }}>PNG, JPG up to 2MB</small>
            </div>
          </div>
        </div>
      </Card>

      {hasChanges && (
        <div className="sticky-bottom-bar">
          <span>You have unsaved changes</span>
          <div className="sticky-actions">
            <Button variant="outline" onClick={() => setHasChanges(false)} style={{ color: 'var(--ink)', backgroundColor: '#fff', borderColor: '#e9ecef' }}>Discard changes</Button>
            <Button variant="primary" onClick={handleSave}>Save & update dish</Button>
          </div>
        </div>
      )}
    </div>
  );
}