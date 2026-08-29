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
        <div className="card mini-stat">
          <span className="stat-label">Tracked items</span>
          <strong className="stat-value">{inventory.length}</strong>
          <small>Across active ingredients</small>
        </div>
        <div className="card mini-stat">
          <span className="stat-label">Low stock</span>
          <strong className="stat-value">{lowStock.length}</strong>
          <small>Needs attention today</small>
        </div>
        <div className="card mini-stat">
          <span className="stat-label">Inventory value</span>
          <strong className="stat-value">{money(inventoryValue)}</strong>
          <small>Estimated current value</small>
        </div>
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Category</th>
              <th className="text-right">On Hand</th>
              <th className="text-right">Reorder Level</th>
              <th className="text-center">Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(i => {
              const isLow = i.onHand <= i.reorder;
              return (
                <tr key={i.id}>
                  <td><strong style={{ color: '#fff' }}>{i.name}</strong></td>
                  <td><span className="badge info">{i.category}</span></td>
                  <td className="text-right tabular-nums">
                    <span className={isLow ? 'font-medium' : ''} style={isLow ? { color: 'var(--error)' } : {}}>
                      {i.onHand}
                    </span>
                    <span className="muted" style={{ marginLeft: '6px', fontSize: '11px' }}>{i.unit}</span>
                  </td>
                  <td className="text-right tabular-nums muted">{i.reorder} {i.unit}</td>
                  <td className="text-center">
                    {isLow ? (
                      <span className="badge cancelled">Low stock</span>
                    ) : (
                      <span className="badge completed">Healthy</span>
                    )}
                  </td>
                  <td className="text-right">
                    <button className="mini-button" onClick={() => onOpenStockModal(i.id)}>
                      Update Stock
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
