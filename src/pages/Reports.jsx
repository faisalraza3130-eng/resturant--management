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
          <div className="report-bar">
            <label>Entrees</label>
            <div className="progress-track"><div className="progress-fill" style={{ width: '84%' }}></div></div>
            <strong>$12,492</strong>
          </div>
          <div className="report-bar">
            <label>Burgers</label>
            <div className="progress-track"><div className="progress-fill" style={{ width: '67%' }}></div></div>
            <strong>$8,218</strong>
          </div>
          <div className="report-bar">
            <label>Beverages</label>
            <div className="progress-track"><div className="progress-fill" style={{ width: '43%' }}></div></div>
            <strong>$5,104</strong>
          </div>
          <div className="report-bar">
            <label>Desserts</label>
            <div className="progress-track"><div className="progress-fill" style={{ width: '31%' }}></div></div>
            <strong>$3,702</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reports;
