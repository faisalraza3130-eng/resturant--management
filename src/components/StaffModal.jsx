import React, { useState } from 'react';
import Modal from './Modal';

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
                placeholder="e.g. Taylor Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Role</label>
              <select
                className="input"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option>Server</option>
                <option>Cashier</option>
                <option>Line cook</option>
                <option>Head chef</option>
                <option>Manager</option>
              </select>
            </div>
            <div className="field">
              <label>Starting status</label>
              <select
                className="input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>Scheduled</option>
                <option>Clocked in</option>
              </select>
            </div>
            <div className="field span-2">
              <label>Shift</label>
              <input
                className="input"
                placeholder="e.g. 4:00 PM – 10:00 PM"
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
