import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import Textarea from '../../../components/common/Textarea';
import Button from '../../../components/common/Button';
import '../MenuManagement/MenuAdmin.css';

export default function EditChefPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ fullName: '', title: '', specialty: '', bio: '', isActive: true });
  const [existingImage, setExistingImage] = useState('');
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chefs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch chef details");
        const data = await response.json();
        
        setFormData({
          fullName: data.name,
          title: data.title,
          specialty: data.specialty,
          bio: data.bio,
          isActive: data.active
        });
        setExistingImage(data.image);
        setPreviewUrl(data.image);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChef();
  }, [id]);

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
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setHasChanges(true);
      if (errors.image) setErrors({ ...errors, image: null });
    }
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.specialty.trim()) newErrors.specialty = "Specialty is required";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    try {
      let imageUrl = existingImage;

      // Only upload a new image if the user selected one
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', selectedFile);
        const imgUploadRes = await fetch('http://localhost:5000/api/images/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: imageFormData
        });
        const imgData = await imgUploadRes.json();
        if (!imgUploadRes.ok) throw new Error("Image upload failed");
        imageUrl = imgData.url;
      }

      const chefData = {
        name: formData.fullName,
        title: formData.title,
        specialty: formData.specialty,
        bio: formData.bio,
        image: imageUrl,
        active: formData.isActive
      };

      const response = await fetch(`http://localhost:5000/api/chefs/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(chefData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update chef");
      }

      alert("Chef updated successfully!");
      setHasChanges(false);
      navigate('/admin/chefs');
    } catch (error) {
      alert(error.message);
    }
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
            <div className="image-upload-box" style={{ padding: '30px', minHeight: '180px', borderColor: errors.image ? '#ef4444' : '#e5e0d8', borderWidth: '2px', borderStyle: 'dashed', cursor: 'pointer', textAlign: 'center', borderRadius: '8px' }} onClick={() => fileInputRef.current.click()}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '16px' }} />
              ) : (
                <div style={{ width: '100px', height: '100px', backgroundColor: '#e5e0d8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: '0 auto 16px', color: '#888', fontSize: '0.8rem' }}>500 × 500</div>
              )}
              <div style={{ fontWeight: '500', color: '#333', fontSize: '0.95rem' }}>+ Replace photo</div>
              <small style={{ marginTop: '6px', fontSize: '0.75rem', color: '#888', display: 'block' }}>PNG, JPG up to 5MB</small>
            </div>
            {errors.image && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '8px', display: 'block' }}>{errors.image}</span>}
          </div>
        </div>
      </Card>

      {hasChanges && (
        <div className="sticky-bottom-bar">
          <span>You have unsaved changes</span>
          <div className="sticky-actions">
            <Button variant="outline" onClick={() => navigate('/admin/chefs')}>Discard changes</Button>
            <Button variant="primary" onClick={handleSave}>Save & update profile</Button>
          </div>
        </div>
      )}
    </div>
  );
}