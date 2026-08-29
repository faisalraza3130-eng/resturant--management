import React, { useState } from 'react';
import { money } from '../utils';

const Expenses = ({ expenses, onAddExpense }) => {
  const [filter, setFilter] = useState('all');

  const filteredExpenses = expenses.filter(e => filter === 'all' || e.category === filter);
  const totalThisMonth = expenses.reduce((s, e) => s + e.amount, 0);

  const groups = {};
  expenses.forEach(e => groups[e.category] = (groups[e.category] || 0) + e.amount);
  const largestCategory = Object.entries(groups).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  return (
    <section className="page active" id="expenses-page">
      <div className="page-head">
        <div>
          <h2>Expenses</h2>
          <p>Keep operating costs visible alongside daily sales.</p>
        </div>
        <div className="head-actions">
          <button className="button button-primary" onClick={onAddExpense}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Record expense
          </button>
        </div>
      </div>
      <div className="section-grid">
        <div className="card mini-stat">
          <span className="stat-label">This month's expenses</span>
          <strong className="stat-value">{money(totalThisMonth)}</strong>
          <small>Across all categories</small>
        </div>
        <div className="card mini-stat">
          <span className="stat-label">Largest category</span>
          <strong className="stat-value" style={{ fontSize: '18px' }}>{largestCategory}</strong>
          <small>By total spend</small>
        </div>
        <div className="card mini-stat">
          <span className="stat-label">Expense entries</span>
          <strong className="stat-value">{expenses.length}</strong>
          <small>Recorded this month</small>
        </div>
      </div>
      <div className="toolbar">
        <select
          className="input select-small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All categories</option>
          <option>Food supplies</option>
          <option>Labor</option>
          <option>Utilities</option>
          <option>Marketing</option>
          <option>Maintenance</option>
        </select>
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Vendor</th>
              <th className="text-right">Amount</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map(e => (
                <tr key={e.id}>
                  <td className="muted font-mono" style={{ fontSize: '12px' }}>{e.date}</td>
                  <td><strong style={{ color: '#fff' }}>{e.description}</strong></td>
                  <td><span className="badge info">{e.category}</span></td>
                  <td className="muted">{e.vendor}</td>
                  <td className="text-right font-medium tabular-nums">{money(e.amount)}</td>
                  <td className="text-center">
                    {e.status === 'Paid' ? (
                      <span className="badge paid">Paid</span>
                    ) : (
                      <span className="badge preparing">Pending</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className="empty">No expenses in this category.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Expenses;
