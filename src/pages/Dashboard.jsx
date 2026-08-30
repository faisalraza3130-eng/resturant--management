import React, { useState } from 'react';
import { money, badge } from '../utils';

const Dashboard = ({ orders, menu, onNewOrder }) => {
  const [timeFilter, setTimeFilter] = useState('Today');

  const itemById = id => menu.find(item => item.id === id);
  const orderTotal = order => order.items.reduce((sum, line) => sum + (itemById(line.menuId)?.price || 0) * line.qty, 0);

  const getStats = () => {
    let salesMultiplier = 1;
    let orderOffset = 32;

    if (timeFilter === 'Yesterday') { salesMultiplier = 0.85; orderOffset = 28; }
    else if (timeFilter === 'This week') { salesMultiplier = 5.2; orderOffset = 150; }
    else if (timeFilter === 'This month') { salesMultiplier = 22.4; orderOffset = 680; }

    const totalSales = orders.filter(o => o.paid).reduce((s, o) => s + orderTotal(o), 4286.5) * salesMultiplier;
    const totalOrdersCount = (orderOffset + orders.filter(o => o.status !== 'Cancelled').length) * (timeFilter === 'Today' ? 1 : salesMultiplier);
    const pendingOrdersCount = orders.filter(o => ['New', 'Preparing', 'Ready'].includes(o.status)).length;
    const averageOrderValue = totalSales / Math.max(1, totalOrdersCount);

    return { totalSales, totalOrdersCount, pendingOrdersCount, averageOrderValue };
  };

  const stats = getStats();

  return (
    <section className="page active" id="dashboard-page">
      <div className="page-head">
        <div>
          <h2>Good morning, Jordan</h2>
          <p>Here is what is happening at Harbor & Hearth today.</p>
        </div>
        <div className="head-actions">
          <select
            className="select-small input"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>This week</option>
            <option>This month</option>
          </select>
          <button className="button button-primary" onClick={onNewOrder}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New order
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="card stat">
          <span className="stat-label">{timeFilter}'s sales</span>
          <strong className="stat-value">{money(stats.totalSales)}</strong>
          <span className="stat-change">↑ 12.8% from last Saturday</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Total orders</span>
          <strong className="stat-value">{Math.round(stats.totalOrdersCount)}</strong>
          <span className="stat-change">↑ 8.4% from last Saturday</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Pending orders</span>
          <strong className="stat-value">{stats.pendingOrdersCount}</strong>
          <span className="stat-change neutral">Across all service types</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Average order value</span>
          <strong className="stat-value">{money(stats.averageOrderValue)}</strong>
          <span className="stat-change">↑ 4.1% from last Saturday</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-title">
            <h3>Sales performance</h3>
            <a className="text-link">Last 7 days</a>
          </div>
          <div className="chart-wrap">
            <div className="chart">
              <div className="bar-group"><i className="bar alt" style={{ height: '42%' }}></i><span className="bar-day">Sun</span></div>
              <div className="bar-group"><i className="bar alt" style={{ height: '56%' }}></i><span className="bar-day">Mon</span></div>
              <div className="bar-group"><i className="bar alt" style={{ height: '49%' }}></i><span className="bar-day">Tue</span></div>
              <div className="bar-group"><i className="bar alt" style={{ height: '67%' }}></i><span className="bar-day">Wed</span></div>
              <div className="bar-group"><i className="bar alt" style={{ height: '60%' }}></i><span className="bar-day">Thu</span></div>
              <div className="bar-group"><i className="bar alt" style={{ height: '78%' }}></i><span className="bar-day">Fri</span></div>
              <div className="bar-group"><i className="bar" style={{ height: '91%' }}></i><span className="bar-day">Sat</span></div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-title">
            <h3>Popular menu items</h3>
            <a className="text-link">View menu</a>
          </div>
          <div className="table-wrap" style={{ border: 'none' }}>
          <table>
            <tbody>
              {menu.slice(0, 4).map(item => (
                <tr key={item.id}>
                    <td data-label="Item">
                      <div className="item-name-cell">
                        <div className="food-placeholder">{item.name.split(' ').map(x => x[0]).join('').slice(0, 2)}</div>
                        <div className="item-details">
                          <strong>{item.name}</strong>
                          <span>Popular choice</span>
                        </div>
                      </div>
                    </td>
                    <td data-label="Price" className="text-right font-medium tabular-nums">{money(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-title">
          <h3>Recent orders</h3>
          <a className="text-link">View all orders</a>
        </div>
        <div className="table-wrap" style={{ border: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Service Type</th>
                <th className="text-center">Items</th>
                <th className="text-right">Total</th>
                <th className="text-center">Status</th>
                <th className="text-right">Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(o => (
                <tr key={o.id}>
                  <td data-label="Order ID" className="font-mono font-medium">{o.id}</td>
                  <td data-label="Type">
                    <div className="font-medium">{o.type}</div>
                    <span className="muted" style={{ fontSize: '11px' }}>{o.label}</span>
                  </td>
                  <td data-label="Items" className="text-center">
                    <div className="item-details" style={{ alignItems: 'center' }}>
                      {o.items.slice(0, 2).map((line, idx) => (
                        <span key={idx} style={{ fontSize: '10px' }}>{line.qty} × {itemById(line.menuId)?.name}</span>
                      ))}
                      {o.items.length > 2 && <span className="muted" style={{ fontSize: '9px' }}>+{o.items.length - 2} more</span>}
                    </div>
                  </td>
                  <td data-label="Total" className="text-right font-medium tabular-nums">{money(orderTotal(o))}</td>
                  <td data-label="Status" className="text-center">{badge(o.status)}</td>
                  <td data-label="Time" className="text-right muted font-mono" style={{ fontSize: '11px' }}>{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
