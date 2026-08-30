import React from 'react';
import { money } from '../utils';

const Reports = ({ expenses }) => {
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const sales = 31842.6;
  const net = sales - totalExpenses;
  const margin = Math.round((net / sales) * 100);

  return (
    <section className="page active" id="reports-page">
      <div className="page-head">
        <div>
          <h2>Reports</h2>
          <p>Turn daily activity into clear operating decisions.</p>
        </div>
        <div className="head-actions">
          <select className="input select-small">
            <option>This month</option>
            <option>This week</option>
            <option>Last month</option>
          </select>
          <button className="button button-secondary">Export report</button>
        </div>
      </div>
      <div className="stats">
        <div className="card stat">
          <span className="stat-label">Gross sales</span>
          <strong className="stat-value">$31,842.60</strong>
          <span className="stat-change">↑ 9.6% vs prior period</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Total expenses</span>
          <strong className="stat-value">{money(totalExpenses)}</strong>
          <span className="stat-change neutral">Operating costs</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Net operating income</span>
          <strong className="stat-value">{money(net)}</strong>
          <span className="stat-change">Before tax and owner draws</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Profit margin</span>
          <strong className="stat-value">{margin}%</strong>
          <span className="stat-change">Current period</span>
        </div>
      </div>
      <div className="section-grid two">
        <div className="card">
          <div className="card-title">
            <h3>Revenue by week</h3>
            <span className="muted">USD</span>
          </div>
          <div className="chart-wrap">
            <div className="chart" style={{ height: '220px' }}>
              <div className="bar-group"><i className="bar alt" style={{ height: '52%' }}></i><span className="bar-day">Wk 1</span></div>
              <div className="bar-group"><i className="bar alt" style={{ height: '66%' }}></i><span className="bar-day">Wk 2</span></div>
              <div className="bar-group"><i className="bar alt" style={{ height: '59%' }}></i><span className="bar-day">Wk 3</span></div>
              <div className="bar-group"><i className="bar" style={{ height: '82%' }}></i><span className="bar-day">Wk 4</span></div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-title">
            <h3>Sales by category</h3>
            <span className="muted">This month</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th className="text-right">Performance</th>
                  <th className="text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Entrees', share: '84%', value: '$12,492' },
                  { name: 'Burgers', share: '67%', value: '$8,218' },
                  { name: 'Beverages', share: '43%', value: '$5,104' },
                  { name: 'Desserts', share: '31%', value: '$3,702' }
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td className="font-medium">{item.name}</td>
                    <td className="text-right">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                        <div className="progress-track" style={{ width: '60px', height: '6px', margin: 0 }}>
                          <div className="progress-fill" style={{ width: item.share }}></div>
                        </div>
                        <span className="muted" style={{ fontSize: '11px' }}>{item.share}</span>
                      </div>
                    </td>
                    <td className="text-right font-medium tabular-nums">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reports;
