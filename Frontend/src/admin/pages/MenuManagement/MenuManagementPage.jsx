import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
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
  const [menuItems, setMenuItems] = useState([]);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('adminToken');

  const fetchMenu = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Failed to load menu", error);
    }
  };

  useEffect(() => { fetchMenu(); }, []);

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
      setSelectedImage(file);
      setHasChanges(true);
      if (errors.image) setErrors({ ...errors, image: null });
    }
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.dishName.trim()) newErrors.dishName = "Dish name is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Enter a valid price";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!selectedImage) newErrors.image = "Please upload an image";

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    try {
      // 1. Upload Image
      const imageFormData = new FormData();
      imageFormData.append('image', selectedImage);
      const imgUploadRes = await fetch('http://localhost:5000/api/images/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: imageFormData
      });
      const imgData = await imgUploadRes.json();
      if (!imgUploadRes.ok) throw new Error("Image upload failed");

      // 2. Save Menu Item
      const menuItemData = {
        name: formData.dishName,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
        image: imgData.url,
        available: true
      };

      const response = await fetch('http://localhost:5000/api/menu', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(menuItemData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create menu item");
      }

      alert("Dish added successfully!");
      setFormData({ dishName: '', price: '', category: 'Mains', description: '' });
      setSelectedImage(null);
      setHasChanges(false);
      fetchMenu(); // Refresh table
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteMenu = async (id, name) => {
    if (window.confirm(`Remove ${name} from the menu?`)) {
      try {
        await fetch(`http://localhost:5000/api/menu/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchMenu();
      } catch (error) {
        console.error("Failed to delete", error);
      }
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
            <Input label="Dish Name" value={formData.dishName} onChange={(e) => handleChange('dishName', e.target.value)} />
            {errors.dishName && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.dishName}</span>}
          </div>
          <div>
            <Input label="Price (Rs)" type="number" value={formData.price} onChange={(e) => handleChange('price', e.target.value)} />
            {errors.price && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.price}</span>}
          </div>
          <div>
            <Select label="Category" options={['Mains', 'Starters', 'Desserts']} value={formData.category} onChange={(e) => handleChange('category', e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <Input label="Description" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} />
          {errors.description && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.description}</span>}
        </div>

        <div className="field">
          <label>Image</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #d4d4d4', padding: '12px 16px', borderRadius: '6px' }}>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={handleImageChange} />
            <div style={{ color: selectedImage ? '#333' : '#888', fontSize: '0.95rem' }}>
              📷 {selectedImage ? selectedImage.name : 'Upload a dish photo'}
            </div>
            <Button variant="outline" onClick={() => fileInputRef.current.click()}>Upload</Button>
          </div>
          {errors.image && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.image}</span>}
        </div>
      </Card>

      <Card className="admin-card" style={{ padding: '32px' }}>
        <h2 className="admin-card-title">Current Menu Items</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Dish Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {menuItems.length > 0 ? menuItems.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.name}</strong></td>
                <td>{item.category}</td>
                <td>Rs. {item.price}</td>
                <td><span className="status-badge">{item.available ? 'Active' : 'Hidden'}</span></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link to={`/admin/menu/${item.id}/edit`} style={{ color: '#4b5563' }}><Edit size={18} /></Link>
                    <button onClick={() => handleDeleteMenu(item.id, item.name)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : <tr><td colSpan="5" style={{ textAlign: 'center', padding: '32px' }}>No dishes currently listed.</td></tr>}
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