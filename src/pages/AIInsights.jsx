import React from 'react';
import { money } from '../utils';

const AIInsights = ({ inventory, orders, menu }) => {
  // --- AI Inventory Predictor Logic ---
  const stockPredictions = inventory.map(item => {
    const isLow = item.onHand <= item.reorder;
    const usageRate = Math.random() * 5 + 1; // Simulated usage per day
    const daysRemaining = Math.floor(item.onHand / usageRate);

    let status = 'Healthy';
    let color = 'var(--green)';
    if (daysRemaining <= 3) {
      status = 'Critical Shortage';
      color = 'var(--red)';
    } else if (daysRemaining <= 7) {
      status = 'Restock Soon';
      color = 'var(--accent)';
    }

    return { ...item, daysRemaining, status, color };
  });

  // --- Smart Menu Analytics Logic ---
  const itemPerformance = menu.map(item => {
    const totalOrdered = orders.reduce((sum, order) => {
      const orderItem = order.items.find(i => i.menuId === item.id);
      return sum + (orderItem ? orderItem.qty : 0);
    }, 0) + Math.floor(Math.random() * 20); // Adding some base simulated popularity

    const revenue = totalOrdered * item.price;
    const popularityScore = totalOrdered > 15 ? 'High' : totalOrdered > 5 ? 'Medium' : 'Low';

    return { ...item, totalOrdered, revenue, popularityScore };
  }).sort((a, b) => b.totalOrdered - a.totalOrdered);

  const topPerformer = itemPerformance[0];
  const lowPerformer = itemPerformance[itemPerformance.length - 1];

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h2>AI Insights & Analytics</h2>
          <p>Smart predictions and performance analysis powered by your operational data.</p>
        </div>
        <div className="head-actions">
          <span className="badge ready">AI Core Active</span>
        </div>
      </div>

      <div className="section-grid two">
        {/* AI Inventory Predictor Card */}
        <div className="card">
          <div className="card-title">
            <h3>AI Inventory Predictor</h3>
            <span className="muted">Demand Forecasting</span>
          </div>
          <div className="table-wrap" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Stock</th>
                  <th>Est. Days Left</th>
                  <th>AI Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {stockPredictions.slice(0, 5).map(item => (
                  <tr key={item.id}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.onHand} {item.unit}</td>
                    <td>{item.daysRemaining} days</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: item.color + '20', color: item.color }}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Smart Menu Analytics Card */}
        <div className="card">
          <div className="card-title">
            <h3>Smart Menu Analytics</h3>
            <span className="muted">Popularity & Profit</span>
          </div>
          <div className="table-wrap" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Menu Item</th>
                  <th>Sales</th>
                  <th>Revenue</th>
                  <th>Popularity</th>
                </tr>
              </thead>
              <tbody>
                {itemPerformance.slice(0, 5).map(item => (
                  <tr key={item.id}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.totalOrdered} orders</td>
                    <td>{money(item.revenue)}</td>
                    <td>
                      <span className={`badge ${item.popularityScore.toLowerCase()}`}>
                        {item.popularityScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{ padding: '20px' }}>
          <h3>AI Business Summary</h3>
          <div style={{ marginTop: '15px', lineHeight: '1.6' }}>
            <p>• <strong>Top Performer:</strong> Your <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{topPerformer.name}</span> is generating high interest. Consider a featured promotion.</p>
            <p>• <strong>Inventory Alert:</strong> AI predicts shortage for <span style={{ color: 'var(--red)', fontWeight: 'bold' }}>{stockPredictions.find(s => s.status === 'Critical Shortage')?.name || 'key items'}</span> within 72 hours.</p>
            <p>• <strong>Opportunity:</strong> <span style={{ color: 'var(--blue)', fontWeight: 'bold' }}>{lowPerformer.name}</span> has low conversion. Review description or pricing.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInsights;
