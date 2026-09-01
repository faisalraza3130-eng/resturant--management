import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import CustomSelect from './CustomSelect';

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

  const inventoryOptions = inventory.map(i => ({
    value: i.id,
    label: `${i.name} (${i.onHand} ${i.unit} on hand)`
  }));

  return (
    <Modal id="stock-modal" isOpen={isOpen} onClose={onClose} title="Receive inventory stock">
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="modal-grid">
            <div className="field span-2">
              <label>Inventory item</label>
              <CustomSelect
                options={inventoryOptions}
                value={Number(formData.itemId)}
                onChange={(val) => setFormData({ ...formData, itemId: val })}
              />
            </div>
            <div className="field">
              <label>Quantity received</label>
              <input
                className="input"
                required
                type="number"
                min="0.1"
                step="0.1"
                placeholder="e.g. 10"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Received from</label>
              <input
                className="input"
                placeholder="e.g. Local Dairy"
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

