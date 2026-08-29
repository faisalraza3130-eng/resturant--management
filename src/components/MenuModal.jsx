import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const MenuModal = ({ isOpen, onClose, onSave, editingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'Entrees',
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
        price: editingItem.price,
        available: String(editingItem.available),
        description: editingItem.description
      });
    } else {
      setFormData({
        name: '',
        code: '',
        category: 'Entrees',
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
                placeholder="e.g. Harbor Burger"
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
                placeholder="e.g. BUR-001"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Category</label>
              <select
                className="input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Entrees</option>
                <option>Burgers</option>
                <option>Salads</option>
                <option>Desserts</option>
                <option>Beverages</option>
              </select>
            </div>
            <div className="field">
              <label>Price (USD)</label>
              <input
                className="input"
                required
                type="number"
                min="0"
                step=".01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Availability</label>
              <select
                className="input"
                value={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.value })}
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
            <div className="field span-2">
              <label>Description</label>
              <textarea
                className="input"
                rows="3"
                placeholder="Short description for the team"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button type="button" class="button button-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" class="button button-primary">Save item</button>
        </div>
      </form>
    </Modal>
  );
};

export default MenuModal;
