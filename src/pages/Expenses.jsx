import React, { useState } from 'react';
import { money } from '../utils';
import CustomSelect from '../components/CustomSelect';

const Expenses = ({ expenses, onAddExpense }) => {
  const [filter, setFilter] = useState('all');

  const filteredExpenses = expenses.filter(e => filter === 'all' || e.category === filter);
  const totalThisMonth = expenses.reduce((s, e) => s + e.amount, 0);

  const groups = {};
  expenses.forEach(e => groups[e.category] = (groups[e.category] || 0) + e.amount);
  const largestCategory = Object.entries(groups).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Food supplies', label: 'Food supplies' },
    { value: 'Labor', label: 'Labor' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Maintenance', label: 'Maintenance' }
  ];

  return (
    <section className="page active" id="expenses-page">
      <div className="page-head">
        <div>
          <h2>Expenses</h2>
          <p>Keep your tea stall operating costs visible alongside daily sales.</p>
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
        <div className="card mini-stat" style={{ borderTop: '4px solid var(--blue)' }}>
          <span className="stat-label">This month's expenses</span>
          <strong className="stat-value" id="expense-total">Rs. {totalThisMonth}</strong>
          <small>Across all categories</small>
        </div>
        <div className="card mini-stat" style={{ borderTop: '4px solid var(--accent)' }}>
          <span className="stat-label">Largest category</span>
          <strong className="stat-value" style={{ fontSize: '18px' }} id="expense-largest">{largestCategory}</strong>
          <small>By total spend</small>
        </div>
        <div className="card mini-stat" style={{ borderTop: '4px solid var(--green)' }}>
          <span className="stat-label">Expense entries</span>
          <strong className="stat-value" id="expense-count">{expenses.length}</strong>
          <small>Recorded this month</small>
        </div>
      </div>
      <div className="toolbar">
        <CustomSelect
          options={categoryOptions}
          value={filter}
          onChange={setFilter}
          className="select-small"
        />
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map(e => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td><b>{e.description}</b></td>
                  <td>{e.category}</td>
                  <td className="muted">{e.vendor}</td>
                  <td><b>Rs. {e.amount}</b></td>
                  <td>
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

