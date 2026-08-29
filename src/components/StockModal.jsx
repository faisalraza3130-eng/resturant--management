import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const StockModal = ({ isOpen, onClose, onSave, inventory, initialItemId }) => {
  const [formData, setFormData] = useState({
    itemId: '',
    amount: '',
    vendor: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        itemId: initialItemId || (inventory.length > 0 ? inventory[0].id : ''),
        amount: '',
        vendor: ''
      });
    }
  }, [isOpen, initialItemId, inventory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      itemId: Number(formData.itemId),
      amount: Number(formData.amount),
      vendor: formData.vendor.trim() || 'Manual entry'
    });
  };

  return (
    <Modal id="stock-modal" isOpen={isOpen} onClose={onClose} title="Receive inventory stock">
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="modal-grid">
            <div className="field span-2">
              <label>Inventory item</label>
              <select
                className="input"
                value={formData.itemId}
                onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
              >
                {inventory.map(i => (
                  <option key={i.id} value={i.id}>{i.name} · {i.onHand} {i.unit} on hand</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Quantity received</label>
              <input
                className="input"
                required
                type="number"
                min="0.01"
                step="0.01"
                placeholder="e.g. 10"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Received from</label>
              <input
                className="input"
                placeholder="e.g. Metro Foods"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="button button-primary">Update inventory</button>
        </div>
      </form>
    </Modal>
  );
};

export default StockModal;
