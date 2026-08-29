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
        <div className="card mini-stat">
          <span className="stat-label">Team members</span>
          <strong className="stat-value">{staff.length}</strong>
          <small>Across all roles</small>
        </div>
        <div className="card mini-stat">
          <span className="stat-label">Clocked in</span>
          <strong className="stat-value">{activeCount}</strong>
          <small>Currently on shift</small>
        </div>
        <div className="card mini-stat">
          <span className="stat-label">Scheduled today</span>
          <strong className="stat-value">9</strong>
          <small>Planned coverage</small>
        </div>
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Team Member</th>
              <th>Role</th>
              <th>Shift Schedule</th>
              <th className="text-center">Weekly Hours</th>
              <th className="text-center">Status</th>
              <th className="text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="item-name-cell">
                    <div className="person-initials">{initials(s.name)}</div>
                    <strong style={{ color: '#fff' }}>{s.name}</strong>
                  </div>
                </td>
                <td><span className="badge info">{s.role}</span></td>
                <td className="muted">{s.shift}</td>
                <td className="text-center tabular-nums font-medium">{s.hours}h</td>
                <td className="text-center">
                  <div className="status-line" style={{ justifyContent: 'center' }}>
                    <span className={`status-dot ${s.status === 'Scheduled' ? 'off' : ''}`}></span>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{s.status}</span>
                  </div>
                </td>
                <td className="text-right">
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
