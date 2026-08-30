import React from 'react';

const Sidebar = ({ currentPage, onPageChange, isOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>
    )},
    { id: 'menu', label: 'Menu', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    )},
    { id: 'orders', label: 'Orders', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 4h12v17H6zM9 8h6M9 12h6M9 16h4"/></svg>
    )},
    { id: 'billing', label: 'Billing', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h3M14 15h2"/></svg>
    )},
    { id: 'inventory', label: 'Inventory', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 7h16M4 12h16M4 17h16"/><path d="M7 4v16M17 4v16"/></svg>
    )},
    { id: 'expenses', label: 'Expenses', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 5h14v14H5z"/><path d="M8 9h8M8 13h5"/></svg>
    )},
    { id: 'staff', label: 'Staff', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c.7-3.6 2.7-5 6-5s5.3 1.4 6 5M15 15c2.9 0 4.5 1.2 5 4"/></svg>
    )},
    { id: 'reports', label: 'Reports', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 19V9M12 19V5M19 19v-7"/><path d="M3 19h18"/></svg>
    )},
    { id: 'settings', label: 'Settings', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6.7v-2.4h.1a1.7 1.7 0 0 0 1.6-1A1.7 1.7 0 0 0 8.1 9L8 8.9l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1h2.4V6a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 9l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.4H21a1.7 1.7 0 0 0-1.6.6Z"/></svg>
    )}
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M8 3v7M5 3v7a3 3 0 0 0 6 0V3M8 13v8M16 3v18M16 3c3 2 3 7 0 9"/>
          </svg>
        </div>
        <div>
          <div className="brand-name">Harbor &amp; Hearth</div>
          <span className="brand-sub">Operations</span>
        </div>
      </div>
      <div className="nav-label">Workspace</div>
      <nav className="nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={currentPage === item.id ? 'active' : ''}
            onClick={() => onPageChange(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <span className="status-dot"></span>Demo workspace<br/>
        <span style={{ paddingLeft: '14px' }}>All systems ready</span>
      </div>
    </aside>
  );
};

export default Sidebar;
