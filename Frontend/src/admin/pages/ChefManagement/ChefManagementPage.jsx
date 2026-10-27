import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import Textarea from '../../../components/common/Textarea';
import Button from '../../../components/common/Button';
import '../MenuManagement/MenuAdmin.css'; 

export default function ChefManagementPage() {
  const [formData, setFormData] = useState({ fullName: '', title: '', specialty: '', bio: '' });
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [chefs, setChefs] = useState([]);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('adminToken');

  const fetchChefs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chefs');
      const data = await response.json();
      setChefs(data);
    } catch (error) {
      console.error("Failed to load chefs", error);
    }
  };

  useEffect(() => { fetchChefs(); }, []);

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
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.specialty.trim()) newErrors.specialty = "Specialty is required";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (!selectedFile) newErrors.image = "Please upload a profile photo";

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    try {
      // 1. Upload Image First
      const imageFormData = new FormData();
      imageFormData.append('image', selectedFile);
      const imgUploadRes = await fetch('http://localhost:5000/api/images/upload', {
        method: 'POST',
        body: imageFormData
      });
      const imgData = await imgUploadRes.json();
      if (!imgUploadRes.ok) throw new Error(imgData.message || "Image upload failed");

      // 2. Save Chef Data
      const chefData = {
        name: formData.fullName,
        title: formData.title,
        specialty: formData.specialty,
        bio: formData.bio,
        image: `http://localhost:5000${imgData.url}`,
        active: true
      };

      const response = await fetch('http://localhost:5000/api/chefs', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(chefData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create chef");
      }

      alert("Chef added successfully!");
      setFormData({ fullName: '', title: '', specialty: '', bio: '' });
      setSelectedFile(null);
      setPreviewUrl(null);
      setHasChanges(false);
      fetchChefs(); // Refresh table
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteChef = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      try {
        await fetch(`http://localhost:5000/api/chefs/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchChefs(); // Refresh table
      } catch (error) {
        console.error("Failed to delete", error);
      }
    }
  };

  return (
    <div className="menu-admin-page">
      <div className="admin-page-header">
        <h1>Chef management</h1>
        <p>Add or edit chef profiles, designations, and their specialties.</p>
      </div>

      <Card className="admin-card">
        <h2 className="admin-card-title">Add New Chef</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '32px' }}>
          <div>
            <Input label="Full Name" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} />
            {errors.fullName && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.fullName}</span>}
          </div>
          <div>
            <Input label="Title / Designation" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
            {errors.title && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.title}</span>}
          </div>
          <div>
            <Input label="Specialty" value={formData.specialty} onChange={(e) => handleChange('specialty', e.target.value)} />
            {errors.specialty && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.specialty}</span>}
          </div>
        </div>

        <div className="form-grid-2-col">
          <div>
            <Textarea label="Short Bio" rows={6} value={formData.bio} onChange={(e) => handleChange('bio', e.target.value)} />
            {errors.bio && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.bio}</span>}
          </div>
          <div className="field">
            <label>Profile Image</label>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={handleImageChange} />
            <div className="image-upload-box" style={{ padding: '30px', minHeight: '180px', borderColor: errors.image ? '#ef4444' : '#b8b8b8' }} onClick={() => fileInputRef.current.click()}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', marginBottom: '12px' }} />
              ) : (
                <div style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#888' }}>📷</div>
              )}
              <span style={{ fontWeight: '500', color: '#333', fontSize: '0.95rem' }}>{previewUrl ? 'Replace Photo' : 'Upload Photo'}</span>
            </div>
            {errors.image && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.image}</span>}
          </div>
        </div>
      </Card>

      <Card className="admin-card">
        <h2 className="admin-card-title">Current Culinary Team</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Chef Profile</th><th>Title</th><th>Specialty</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {chefs.length > 0 ? chefs.map((chef) => (
              <tr key={chef.id}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {chef.image ? (
                    <img 
                      src={chef.image} 
                      alt={chef.name} 
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e5e0d8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {chef.name ? chef.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  <strong>{chef.name}</strong>
                </td>
                <td>{chef.title}</td>
                <td>{chef.specialty}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link to={`/admin/chefs/${chef.id}/edit`} style={{ color: '#4b5563' }}><Edit size={18} /></Link>
                    <button onClick={() => handleDeleteChef(chef.id, chef.name)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : <tr><td colSpan="4" style={{ textAlign: 'center', padding: '32px' }}>No chefs listed.</td></tr>}
          </tbody>
        </table>
      </Card>

      {hasChanges && (
        <div className="sticky-bottom-bar">
          <span>You have unsaved changes</span>
          <div className="sticky-actions">
            <Button variant="outline" onClick={() => setHasChanges(false)}>Discard</Button>
            <Button variant="primary" onClick={handleSave}>Save & publish</Button>
          </div>
        </div>
      )}
    </div>
  );
}