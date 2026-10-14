import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import Textarea from '../../../components/common/Textarea';
import Button from '../../../components/common/Button';
import '../MenuManagement/MenuAdmin.css';

export default function EditChefPage() {
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    fullName: 'Kamal Perera',
    title: 'Executive Chef',
    specialty: 'Clay Pot Feasts',
    bio: 'With 20 years of experience in heritage Sri Lankan cuisine, bringing traditional village recipes to the modern table.',
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
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.specialty.trim()) newErrors.specialty = "Specialty is required";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";

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
      <Link to="/admin/chefs" style={{ color: '#888', fontSize: '0.9rem', display: 'inline-block', marginBottom: '16px', textDecoration: 'none', fontWeight: '500' }}>
        ← Back to Chef Management
      </Link>
      
      <div className="admin-page-header">
        <h1>Edit Chef Profile</h1>
        <p>Update details for {formData.fullName}.</p>
      </div>

      <Card className="admin-card">
        <h2 className="admin-card-title">Personal Information</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          <div>
            <Input label="Full Name" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} />
            {errors.fullName && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.fullName}</span>}
          </div>
          <div>
            <Input label="Title / Designation" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
            {errors.title && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.title}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <Input label="Specialty Cuisine" value={formData.specialty} onChange={(e) => handleChange('specialty', e.target.value)} />
            {errors.specialty && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.specialty}</span>}
          </div>
          
          <div className="toggle-wrapper" style={{ marginTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '4px', color: '#888' }}>Profile Visibility</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
              <label className="switch">
                <input type="checkbox" checked={formData.isActive} onChange={(e) => handleChange('isActive', e.target.checked)} />
                <span className="slider"></span>
              </label>
              <span className="toggle-label" style={{ color: formData.isActive ? '#4ade80' : '#888', fontSize: '0.85rem', fontWeight: '500' }}>
                {formData.isActive ? 'Active on Website' : 'Hidden'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="admin-card">
        <h2 className="admin-card-title">Biography & Media</h2>
        
        <div className="form-grid-2-col">
          <div>
            <Textarea label="Short Bio" rows={6} value={formData.bio} onChange={(e) => handleChange('bio', e.target.value)} />
            {errors.bio && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.bio}</span>}
          </div>
          
          <div className="field">
            <label>Profile Image</label>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={handleImageChange} />
            <div className="image-upload-box" style={{ padding: '30px', minHeight: '180px' }} onClick={() => fileInputRef.current.click()}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '16px' }} />
              ) : (
                <div style={{ width: '100px', height: '100px', backgroundColor: '#e5e0d8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', marginBottom: '16px', color: '#888', fontSize: '0.8rem' }}>500 × 500</div>
              )}
              <span style={{ fontWeight: '500', color: '#333', fontSize: '0.95rem' }}>+ Replace photo</span>
              <small style={{ marginTop: '6px', fontSize: '0.75rem', color: '#888' }}>PNG, JPG up to 2MB</small>
            </div>
          </div>
        </div>
      </Card>

      {hasChanges && (
        <div className="sticky-bottom-bar">
          <span>You have unsaved changes</span>
          <div className="sticky-actions">
            <Button variant="outline" onClick={() => setHasChanges(false)}>Discard changes</Button>
            <Button variant="primary" onClick={handleSave}>Save & update profile</Button>
          </div>
        </div>
      )}
    </div>
  );
}