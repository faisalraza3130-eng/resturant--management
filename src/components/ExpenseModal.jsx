import React, { useState } from 'react';
import Modal from './Modal';
import CustomSelect from './CustomSelect';

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

  const categoryOptions = [
    { value: 'Food supplies', label: 'Food supplies' },
    { value: 'Labor', label: 'Labor' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Paid', label: 'Paid' }
  ];

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
                placeholder="e.g. Milk supply for the week"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Amount (Rs.)</label>
              <input
                className="input"
                required
                type="number"
                min="1"
                step="1"
                placeholder="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
              <label>Vendor</label>
              <input
                className="input"
                placeholder="e.g. Local Dairy"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Status</label>
              <CustomSelect
                options={statusOptions}
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
              />
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

