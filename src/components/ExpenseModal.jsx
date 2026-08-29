import React, { useState } from 'react';
import Modal from './Modal';

const ExpenseModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food supplies',
    vendor: '',
    status: 'Pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, amount: Number(formData.amount) });
    setFormData({ description: '', amount: '', category: 'Food supplies', vendor: '', status: 'Pending' });
  };

  return (
    <Modal id="expense-modal" isOpen={isOpen} onClose={onClose} title="Record expense">
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="modal-grid">
            <div className="field span-2">
              <label>Description</label>
              <input
                className="input"
                required
                placeholder="e.g. Weekly produce delivery"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Amount (USD)</label>
              <input
                className="input"
                required
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Category</label>
              <select
                className="input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Food supplies</option>
                <option>Labor</option>
                <option>Utilities</option>
                <option>Marketing</option>
                <option>Maintenance</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label>Vendor</label>
              <input
                className="input"
                placeholder="e.g. Metro Foods"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Status</label>
              <select
                className="input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>Pending</option>
                <option>Paid</option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="button button-primary">Record expense</button>
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseModal;
