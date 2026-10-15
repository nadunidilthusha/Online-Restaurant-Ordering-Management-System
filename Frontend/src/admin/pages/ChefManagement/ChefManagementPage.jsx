import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react'; // Importing icons for actions
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
  const fileInputRef = useRef(null);

  // Added state to make the table dynamic and allow deletions
  const [chefs, setChefs] = useState([
    { id: 1, name: 'Kamal Perera', title: 'Executive Chef', specialty: 'Clay Pot Feasts' }
  ]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // VALIDATION: Check if file size is strictly greater than 5MB (5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size must be less than 5MB" });
        e.target.value = null; 
        return;
      }

      setPreviewUrl(URL.createObjectURL(file));
      setHasChanges(true);
      if (errors.image) setErrors({ ...errors, image: null });
    }
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.specialty.trim()) newErrors.specialty = "Specialty is required";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (!previewUrl) newErrors.image = "Please upload a profile photo";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Chef profile validated and ready to save!");
    setErrors({});
    setHasChanges(false);
  };

  // New function to handle the remove action with a confirmation prompt
  const handleDeleteChef = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the culinary team?`)) {
      setChefs(chefs.filter(chef => chef.id !== id));
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
        
        {/* ROW 1: 3-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '32px' }}>
          <div>
            <Input label="Full Name" placeholder="e.g. Kamal Perera" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} />
            {errors.fullName && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.fullName}</span>}
          </div>
          <div>
            <Input label="Title / Designation" placeholder="e.g. Executive Chef" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
            {errors.title && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.title}</span>}
          </div>
          <div>
            <Input label="Specialty" placeholder="e.g. Clay Pot Feasts" value={formData.specialty} onChange={(e) => handleChange('specialty', e.target.value)} />
            {errors.specialty && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.specialty}</span>}
          </div>
        </div>

        {/* ROW 2: Bio and Image Upload */}
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
            {chefs.length > 0 ? (
              chefs.map((chef) => (
                <tr key={chef.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e5e0d8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {chef.name.charAt(0)}
                    </div>
                    <strong>{chef.name}</strong>
                  </td>
                  <td>{chef.title}</td>
                  <td>{chef.specialty}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Link to={`/admin/chefs/${chef.id}/edit`} title="Edit Chef" style={{ color: '#4b5563', display: 'flex', alignItems: 'center' }}>
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDeleteChef(chef.id, chef.name)} 
                        title="Remove Chef"
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
                <td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: '#888' }}>
                  No chefs currently listed.
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
            <Button variant="outline" onClick={() => setHasChanges(false)}>Discard</Button>
            <Button variant="primary" onClick={handleSave}>Save & publish</Button>
          </div>
        </div>
      )}
    </div>
  );
}