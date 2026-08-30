import React from 'react';
import { money } from '../utils';

const Inventory = ({ inventory, onOpenStockModal }) => {
  const lowStock = inventory.filter(i => i.onHand <= i.reorder);
  const inventoryValue = inventory.reduce((s, i) => s + i.onHand * i.cost, 0);

  return (
    <section className="page active" id="inventory-page">
      <div className="page-head">
        <div>
          <h2>Inventory</h2>
          <p>Monitor ingredients and keep service-ready stock on hand.</p>
        </div>
        <div className="head-actions">
          <button className="button button-primary" onClick={() => onOpenStockModal()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Receive stock
          </button>
        </div>
      </div>
      <div className="section-grid">
        <div className="card mini-stat" style={{ borderTop: '4px solid var(--blue)' }}>
          <span className="stat-label">Tracked items</span>
          <strong className="stat-value" id="inventory-count">{inventory.length}</strong>
          <small>Across active ingredients</small>
        </div>
        <div className="card mini-stat" style={{ borderTop: '4px solid var(--red)' }}>
          <span className="stat-label">Low stock</span>
          <strong className="stat-value" id="inventory-low">{lowStock.length}</strong>
          <small>Needs attention today</small>
        </div>
        <div className="card mini-stat" style={{ borderTop: '4px solid var(--accent)' }}>
          <span className="stat-label">Inventory value</span>
          <strong className="stat-value" id="inventory-value">{money(inventoryValue)}</strong>
          <small>Estimated current value</small>
        </div>
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>On hand</th>
              <th>Reorder at</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(i => {
              const isLow = i.onHand <= i.reorder;
              return (
                <tr key={i.id}>
                  <td><b>{i.name}</b></td>
                  <td>{i.category}</td>
                  <td><b>{i.onHand}</b> <span className="muted">{i.unit}</span></td>
                  <td>{i.reorder} {i.unit}</td>
                  <td>
                    {isLow ? (
                      <span className="badge cancelled">Low stock</span>
                    ) : (
                      <span className="badge completed">Healthy</span>
                    )}
                  </td>
                  <td>
                    <button className="mini-button" onClick={() => onOpenStockModal(i.id)}>
                      Add stock
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Inventory;
