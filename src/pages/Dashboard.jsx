import React, { useState } from 'react';
import { money, badge } from '../utils';
import CustomSelect from '../components/CustomSelect';

const Dashboard = ({ orders, menu, onNewOrder, onNavigate, currentBusinessDate }) => {
  const [timeFilter, setTimeFilter] = useState('Today');

  const itemById = id => menu.find(item => item.id === id);
  const orderTotal = order => order.items.reduce((sum, line) => sum + (itemById(line.menuId)?.price || 0) * line.qty, 0);

  const getStats = () => {
    let salesMultiplier = 1;
    let orderOffset = 0;

    if (timeFilter === 'Yesterday') { salesMultiplier = 0.85; orderOffset = 0; }
    else if (timeFilter === 'This week') { salesMultiplier = 5.2; orderOffset = 0; }
    else if (timeFilter === 'This month') { salesMultiplier = 22.4; orderOffset = 0; }

    const totalSales = orders.filter(o => o.paid && o.businessDate === currentBusinessDate).reduce((s, o) => s + orderTotal(o), 0) * salesMultiplier;
    const totalOrdersCount = (orderOffset + orders.filter(o => o.status !== 'Cancelled' && o.businessDate === currentBusinessDate).length) * (timeFilter === 'Today' ? 1 : salesMultiplier);
    const pendingOrdersCount = orders.filter(o => ['New', 'Preparing', 'Ready'].includes(o.status) && o.businessDate === currentBusinessDate).length;
    const averageOrderValue = totalSales / Math.max(1, totalOrdersCount);

    return { totalSales, totalOrdersCount, pendingOrdersCount, averageOrderValue };
  };

  const stats = getStats();

  const timeOptions = [
    { value: 'Today', label: 'Today' },
    { value: 'Yesterday', label: 'Yesterday' },
    { value: 'This week', label: 'This week' },
    { value: 'This month', label: 'This month' }
  ];

  return (
    <section className="page active" id="dashboard-page">
      <div className="page-head">
        <div>
          <h2>Operational Dashboard</h2>
          <p>Here is what is happening at MuRsHiD KhAnA today.</p>
        </div>
        <div className="head-actions">
          <CustomSelect
            options={timeOptions}
            value={timeFilter}
            onChange={setTimeFilter}
            className="select-small"
          />
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
          <strong className="stat-value">Rs. {Math.round(stats.totalSales)}</strong>
          <span className="stat-change">Live updates</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Total orders</span>
          <strong className="stat-value">{Math.round(stats.totalOrdersCount)}</strong>
          <span className="stat-change">Real-time tracking</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Pending orders</span>
          <strong className="stat-value">{stats.pendingOrdersCount}</strong>
          <span className="stat-change neutral">Active in kitchen</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Average order value</span>
          <strong className="stat-value">Rs. {Math.round(stats.averageOrderValue)}</strong>
          <span className="stat-change">Based on sales</span>
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
            <a className="text-link" onClick={() => onNavigate('menu')}>View menu</a>
          </div>
          <div className="table-wrap" style={{ border: 'none' }}>
          <table>
            <tbody>
              {menu.slice(0, 4).map(item => (
                <tr key={item.id}>
                  <td>
                      <div className="item-name-cell">
                        <div className="food-placeholder">{item.name.split(' ').map(x => x[0]).join('').slice(0, 2)}</div>
                        <div className="item-details">
                          <strong>{item.name}</strong>
                          <span>Popular choice</span>
                        </div>
                      </div>
                    </td>
                    <td data-label="Price" className="text-right font-medium tabular-nums">Rs. {item.price}</td>
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
          <a className="text-link" onClick={() => onNavigate('orders')}>View all orders</a>
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
                  <td className="font-mono font-medium">{o.id}</td>
                  <td>
                    <div className="font-medium">{o.type}</div>
                    <span className="muted" style={{ fontSize: '11px' }}>{o.label}</span>
                  </td>
                  <td className="text-center">
                    <div className="item-details" style={{ alignItems: 'center' }}>
                      {o.items.slice(0, 2).map((line, idx) => (
                        <span key={idx} style={{ fontSize: '10px' }}>{line.qty} × {itemById(line.menuId)?.name}</span>
                      ))}
                      {o.items.length > 2 && <span className="muted" style={{ fontSize: '9px' }}>+{o.items.length - 2} more</span>}
                    </div>
                  </td>
                  <td className="text-right font-medium tabular-nums">Rs. {orderTotal(o)}</td>
                  <td className="text-center">{badge(o.status)}</td>
                  <td className="text-right muted font-mono" style={{ fontSize: '11px' }}>{o.time}</td>
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

