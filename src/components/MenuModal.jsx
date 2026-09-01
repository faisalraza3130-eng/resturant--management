import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import CustomSelect from './CustomSelect';

const MenuModal = ({ isOpen, onClose, onSave, editingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'Tea',
    brand: 'None',
    price: '',
    available: 'true',
    description: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        code: editingItem.code || '',
        category: editingItem.category,
        brand: editingItem.brand || 'None',
        price: editingItem.price,
        available: String(editingItem.available),
        description: editingItem.description
      });
    } else {
      setFormData({
        name: '',
        code: '',
        category: 'Tea',
        brand: 'None',
        price: '',
        available: 'true',
        description: ''
      });
    }
  }, [editingItem, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: Number(formData.price),
      available: formData.available === 'true'
    });
  };

  const categoryOptions = [
    { value: 'Tea', label: 'Tea' },
    { value: 'Fast Food', label: 'Fast Food' },
    { value: 'Fries', label: 'Fries' },
    { value: 'Drinks', label: 'Drinks' }
  ];

  const availabilityOptions = [
    { value: 'true', label: 'Available' },
    { value: 'false', label: 'Sold Out' }
  ];

  const brandOptions = [
    { value: 'None', label: 'No Brand' },
    { value: 'Coca Cola', label: 'Coca Cola' },
    { value: 'Pepsi', label: 'Pepsi' },
    { value: 'Sprite', label: 'Sprite' },
    { value: 'Mountain Dew', label: 'Mountain Dew' }
  ];

  return (
    <Modal
      id="menu-modal"
      isOpen={isOpen}
      onClose={onClose}
      title={editingItem ? 'Edit menu item' : 'Add menu item'}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="modal-grid">
            <div className="field">
              <label>Item name</label>
              <input
                className="input"
                required
                placeholder="e.g. Doodh Patti"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Item code</label>
              <input
                className="input"
                required
                maxLength="20"
                placeholder="e.g. TEA-001"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Category</label>
              <CustomSelect
                options={categoryOptions}
                value={formData.category}
                onChange={(val) => {
                  setFormData({
                    ...formData,
                    category: val,
                    brand: val === 'Drinks' ? formData.brand : 'None'
                  });
                }}
              />
            </div>
            {formData.category === 'Drinks' && (
              <div className="field">
                <label>Brand</label>
                <CustomSelect
                  options={brandOptions}
                  value={formData.brand}
                  onChange={(val) => setFormData({ ...formData, brand: val })}
                />
              </div>
            )}
            <div className="field">
              <label>Price (Rs.)</label>
              <input
                className="input"
                required
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Availability</label>
              <CustomSelect
                options={availabilityOptions}
                value={formData.available}
                onChange={(val) => setFormData({ ...formData, available: val })}
              />
            </div>
            <div className="field span-2">
              <label>Description</label>
              <textarea
                className="input"
                rows="3"
                placeholder="Short description (e.g. Strong tea with pure milk)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="button button-primary">Save item</button>
        </div>
      </form>
    </Modal>
  );
};

export default MenuModal;

