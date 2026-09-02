import React, { useState } from 'react';
import { money, badge } from '../utils';
import CustomSelect from '../components/CustomSelect';

const Orders = ({ orders, menu, onStatusChange, onNewOrder, onEditOrder, onOpenHistory }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const itemById = id => menu.find(item => item.id === id);
  const orderTotal = order => order.items.reduce((sum, line) => sum + (itemById(line.menuId)?.price || 0) * line.qty, 0);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = `${o.id} ${o.label}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesType = typeFilter === 'all' || o.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'New', label: 'New' },
    { value: 'Preparing', label: 'Preparing' },
    { value: 'Ready', label: 'Ready' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Dine-in', label: 'Dine-in' },
    { value: 'Takeout', label: 'Takeout' },
    { value: 'Delivery', label: 'Delivery' }
  ];

  const inlineStatusOptions = [
    { value: 'New', label: 'New' },
    { value: 'Preparing', label: 'Preparing' },
    { value: 'Ready', label: 'Ready' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h2>Orders tracking</h2>
          <p>Track every tea and burger order from ticket to completion.</p>
        </div>
        <div className="head-actions">
          <button className="button button-secondary" onClick={onOpenHistory} style={{ marginRight: '10px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Order history
          </button>
          <button className="button button-primary" onClick={onNewOrder}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            New order
          </button>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10.7" cy="10.7" r="6.7"/><path d="m16 16 5 5"/></svg>
          <input className="input" placeholder="Search order number or table..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <CustomSelect
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          className="select-small"
        />
        <CustomSelect
          options={typeOptions}
          value={typeFilter}
          onChange={setTypeFilter}
          className="select-small"
        />
      </div>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Time / Date</th>
              <th>Service Type</th>
              <th>Table No</th>
              <th>Items Ordered</th>
              <th className="text-right">Total Amount</th>
              <th className="text-center">Order Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(o => (
                <tr key={o.id}>
                  <td className="font-mono font-medium">{o.id}</td>
                  <td className="font-mono" style={{ fontSize: '11px' }}>
                    <div className="font-medium">{o.time}</div>
                    <div className="muted">{o.date}</div>
                  </td>
                  <td><span className="badge info">{o.type}</span></td>
                  <td>
                    <div className="font-medium">{o.label}</div>
                  </td>
                  <td>
                    <div className="item-details">
                      {o.items.map((line, idx) => (
                        <span key={idx} style={{ fontSize: '11px' }}>{line.qty} × {itemById(line.menuId)?.name}</span>
                      ))}
                    </div>
                  </td>
                  <td className="text-right font-medium tabular-nums">Rs. {orderTotal(o)}</td>
                  <td className="text-center">
                    <div className={`status-badge-wrap ${o.status.toLowerCase()}`}>
                      <CustomSelect
                        options={inlineStatusOptions}
                        value={o.status}
                        onChange={(val) => onStatusChange(o.id, val)}
                        className="select-small"
                      />
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="mini-button"
                      onClick={() => onEditOrder(o)}
                      title="Edit Order"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}>
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7"><div className="empty">No orders match your filters.</div></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;

