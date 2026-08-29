import React, { useState } from 'react';
import { money, badge } from '../utils';

const Orders = ({ orders, menu, onStatusChange, onNewOrder }) => {
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

  return (
    <section className="page active" id="orders-page">
      <div className="page-head">
        <div>
          <h2>Orders</h2>
          <p>Track every order from the first ticket to completion.</p>
        </div>
        <div className="head-actions">
          <button className="button button-primary" onClick={onNewOrder}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New order
          </button>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="10.7" cy="10.7" r="6.7"/>
            <path d="m16 16 5 5"/>
          </svg>
          <input
            className="input"
            placeholder="Search order number or table..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input select-small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option>New</option>
          <option>Preparing</option>
          <option>Ready</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
        <select
          className="input select-small"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All types</option>
          <option>Dine-in</option>
          <option>Takeout</option>
          <option>Delivery</option>
        </select>
      </div>

      <div className="orders-grid">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(o => (
            <div className="card order-card" key={o.id}>
              <div className="order-card-head">
                <div>
                  <h3>{o.id}</h3>
                  <span className="order-time">{o.time} · {o.type}</span>
                </div>
                {badge(o.status)}
              </div>
              <div className="order-meta">
                <div>
                  <span>{o.type === 'Delivery' ? 'Customer' : 'Location'}</span>
                  <strong>{o.label}</strong>
                  {o.type === 'Delivery' && o.deliveryDetails && (
                    <div className="muted" style={{ fontSize: '10px', marginTop: '2px' }}>
                      {o.deliveryDetails.phone}<br/>
                      {o.deliveryDetails.address}
                    </div>
                  )}
                </div>
                <div>
                  <span>Items</span>
                  <strong>{o.items.reduce((s, x) => s + x.qty, 0)} items</strong>
                </div>
              </div>
              <div className="order-card-bottom">
                <span className="order-total">{money(orderTotal(o))}</span>
                <select
                  className="input"
                  style={{ width: 'auto', padding: '7px 8px', fontSize: '11px' }}
                  value={o.status}
                  onChange={(e) => onStatusChange(o.id, e.target.value)}
                >
                  {['New', 'Preparing', 'Ready', 'Completed', 'Cancelled'].map(x => (
                    <option key={x} value={x}>{x}</option>
                  ))}
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="card empty" style={{ gridColumn: '1/-1' }}>
            No orders match your filters.
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
