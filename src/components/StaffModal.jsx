import React, { useState } from 'react';
import Modal from './Modal';
import CustomSelect from './CustomSelect';

const StaffModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Server',
    status: 'Scheduled',
    shift: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', role: 'Server', status: 'Scheduled', shift: '' });
  };

  const roleOptions = [
    { value: 'Chai Master', label: 'Chai Master' },
    { value: 'Chef (Fast Food)', label: 'Chef (Fast Food)' },
    { value: 'Server', label: 'Server' },
    { value: 'Cashier', label: 'Cashier' },
    { value: 'Manager', label: 'Manager' }
  ];

  const statusOptions = [
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Clocked in', label: 'Clocked in' },
    { value: 'On break', label: 'On break' }
  ];

  return (
    <Modal id="staff-modal" isOpen={isOpen} onClose={onClose} title="Add team member">
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="modal-grid">
            <div className="field span-2">
              <label>Full name</label>
              <input
                className="input"
                required
                placeholder="e.g. Aslam Bhai"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Role</label>
              <CustomSelect
                options={roleOptions}
                value={formData.role}
                onChange={(val) => setFormData({ ...formData, role: val })}
              />
            </div>
            <div className="field">
              <label>Starting status</label>
              <CustomSelect
                options={statusOptions}
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
              />
            </div>
            <div className="field span-2">
              <label>Shift</label>
              <input
                className="input"
                placeholder="e.g. 8:00 AM – 4:00 PM"
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="button button-primary">Add team member</button>
        </div>
      </form>
    </Modal>
  );
};

export default StaffModal;

