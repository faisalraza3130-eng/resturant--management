import React from 'react';

const Staff = ({ staff, onToggleStaff, onAddStaff, onEditStaff }) => {
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
      <div className="card table-wrap scrollable-table">
        <table>
          <thead>
            <tr>
              <th>Team member</th>
              <th>Role</th>
              <th>Shift</th>
              <th>Hours this week</th>
              <th>Status</th>
              <th className="text-center">Edit</th>
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
                <td className="text-center">
                  <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                    <button className="mini-button" onClick={() => onToggleStaff(s.id)}>
                      {s.status === 'Clocked in' ? 'Clock out' : 'Clock in'}
                    </button>
                    <button className="mini-button" onClick={() => onEditStaff(s)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '12px', height: '12px' }}>
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  </div>
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
