import React from 'react';

const Staff = ({ staff, onToggleStaff, onAddStaff }) => {
  const initials = (name) => name.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();
  const activeCount = staff.filter(s => s.status === 'Clocked in').length;

  return (
    <section className="page active" id="staff-page">
      <div className="page-head">
        <div>
          <h2>Staff</h2>
          <p>See who is on the team and ready for today's service.</p>
        </div>
        <div className="head-actions">
          <button className="button button-primary" onClick={onAddStaff}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Add team member
          </button>
        </div>
      </div>
      <div className="section-grid">
        <div className="card mini-stat" style={{ borderTop: '4px solid var(--blue)' }}>
          <span className="stat-label">Team members</span>
          <strong className="stat-value">{staff.length}</strong>
          <small>Across all roles</small>
        </div>
        <div className="card mini-stat" style={{ borderTop: '4px solid var(--green)' }}>
          <span className="stat-label">Clocked in</span>
          <strong className="stat-value">{activeCount}</strong>
          <small>Currently on shift</small>
        </div>
        <div className="card mini-stat" style={{ borderTop: '4px solid var(--accent)' }}>
          <span className="stat-label">Scheduled today</span>
          <strong className="stat-value">9</strong>
          <small>Planned coverage</small>
        </div>
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Team member</th>
              <th>Role</th>
              <th>Shift</th>
              <th>Hours this week</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="item-name">
                    <div className="person-initials">{initials(s.name)}</div>
                    <strong>{s.name}</strong>
                  </div>
                </td>
                <td>{s.role}</td>
                <td className="muted">{s.shift}</td>
                <td>{s.hours} hrs</td>
                <td>
                  <div className="status-line">
                    <span className={`status-dot ${s.status === 'Scheduled' ? 'off' : ''}`}></span>
                    {s.status}
                  </div>
                </td>
                <td>
                  <button className="mini-button" onClick={() => onToggleStaff(s.id)}>
                    {s.status === 'Clocked in' ? 'Clock out' : 'Clock in'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Staff;
