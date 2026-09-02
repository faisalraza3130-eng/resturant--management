import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import CustomSelect from './CustomSelect';

const StockModal = ({ isOpen, onClose, onSave, inventory, initialItemId, editingItem }) => {
  const [formData, setFormData] = useState({
    itemId: '',
    amount: '',
    vendor: '',
    name: '',
    unit: '',
    reorder: '',
    cost: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        setFormData({
          itemId: editingItem.id,
          name: editingItem.name,
          category: editingItem.category,
          unit: editingItem.unit,
          reorder: editingItem.reorder,
          cost: editingItem.cost,
          onHand: editingItem.onHand
        });
      } else {
        setFormData({
          itemId: initialItemId || (inventory.length > 0 ? inventory[0].id : ''),
          amount: '',
          vendor: ''
        });
      }
    }
  }, [isOpen, initialItemId, inventory, editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      onSave({
        ...editingItem,
        name: formData.name,
        category: formData.category,
        unit: formData.unit,
        reorder: Number(formData.reorder),
        cost: Number(formData.cost)
      });
    } else {
      onSave({
        itemId: Number(formData.itemId),
        amount: Number(formData.amount),
        vendor: formData.vendor.trim() || 'Manual entry'
      });
    }
  };

  const inventoryOptions = inventory.map(i => ({
    value: i.id,
    label: `${i.name} (${i.onHand} ${i.unit} on hand)`
  }));

  const categoryOptions = [
    { value: 'Dry goods', label: 'Dry goods' },
    { value: 'Produce', label: 'Produce' },
    { value: 'Bakery', label: 'Bakery' },
    { value: 'Proteins', label: 'Proteins' },
    { value: 'Dairy', label: 'Dairy' },
    { value: 'Packaging', label: 'Packaging' }
  ];

  return (
    <Modal id="stock-modal" isOpen={isOpen} onClose={onClose} title={editingItem ? "Edit item details" : "Receive inventory stock"}>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="modal-grid">
            {editingItem ? (
              <>
                <div className="field span-2">
                  <label>Item name</label>
                  <input
                    className="input"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Category</label>
                  <CustomSelect
                    options={categoryOptions}
                    value={formData.category}
                    onChange={(val) => setFormData({ ...formData, category: val })}
                  />
                </div>
                <div className="field">
                  <label>Unit (e.g. kg, pcs)</label>
                  <input
                    className="input"
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Reorder at</label>
                  <input
                    className="input"
                    required
                    type="number"
                    value={formData.reorder}
                    onChange={(e) => setFormData({ ...formData, reorder: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Cost per unit</label>
                  <input
                    className="input"
                    required
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  />
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="modal-foot">
          <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="button button-primary">
            {editingItem ? "Update item" : "Update stock"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StockModal;

