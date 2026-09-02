import React from 'react';
import { money } from '../utils';

const Inventory = ({ inventory, onOpenStockModal, onEditItem }) => {
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
      <div className="card table-wrap scrollable-table">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>On hand</th>
              <th>Reorder at</th>
              <th>Status</th>
              <th className="text-center">Action</th>
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
                  <td className="text-center">
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                      <button className="mini-button" onClick={() => onOpenStockModal(i.id)} title="Add Stock">
                        Add
                      </button>
                      <button className="mini-button" onClick={() => onEditItem(i)} title="Edit Item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '12px', height: '12px' }}>
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                    </div>
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
