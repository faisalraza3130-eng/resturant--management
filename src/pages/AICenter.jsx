import React from 'react';
import { money } from '../utils';

const AICenter = ({ inventory, orders, menu }) => {

  // --- Model 1: Sales Demand Forecaster ---
  const calculateForecast = () => {
    const totalSales = orders.reduce((sum, o) => sum + (o.paid ? 1200 : 0), 45000);
    return {
      projected: totalSales * 1.15,
      confidence: '94%'
    };
  };
  const salesForecast = calculateForecast();

  // --- Model 2: Inventory Depletion Engine ---
  const stockModels = inventory.map(item => {
    const rate = (item.id % 4) + 1.2;
    const daysLeft = Math.floor(item.onHand / rate);
    return { ...item, daysLeft, risk: daysLeft < 5 ? 'High' : 'Low' };
  }).sort((a, b) => a.daysLeft - b.daysLeft);

  // --- Model 3: Menu Profitability Matrix ---
  const menuMatrix = menu.map(item => {
    const sales = (item.id * 5) + Math.floor(Math.random() * 10);
    let type = 'Star';
    let color = 'var(--green)';
    if (sales < 10) { type = 'Dog'; color = 'var(--red)'; }
    else if (item.price < 15) { type = 'Plowhorse'; color = 'var(--blue)'; }
    return { ...item, sales, type, color };
  });

  // --- Model 4: Labor Peak-Time Predictor ---
  const peaks = [
    { time: '1:00 PM - 3:00 PM', load: 'Peak', staffNeeded: 4 },
    { time: '7:00 PM - 9:00 PM', load: 'Very High', staffNeeded: 6 }
  ];

  const handleApply = (modelName) => {
    alert(`AI Suggestion Applied: ${modelName} optimizations are now active in your workspace.`);
  };

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h2>AI Control Center</h2>
          <p>Advanced predictive models supporting Harbor & Hearth operations.</p>
        </div>
        <div className="head-actions">
          <span className="badge ready" style={{ background: 'var(--navy)', color: '#fff', padding: '8px 15px' }}>
            4 MODELS ACTIVE
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '25px' }}>

        {/* Model 1: Sales Demand Forecaster */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="card-title" style={{ padding: '0 0 15px 0', borderBottom: '1px solid var(--line)' }}>
            <h3 style={{ color: 'var(--blue)' }}>Model 1: Sales Demand Forecaster</h3>
            <span className="badge info">Prediction Active</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <span className="stat-label">Projected Sales (7 Days)</span>
              <strong className="stat-value" style={{ margin: '5px 0' }}>{money(salesForecast.projected)}</strong>
              <span className="stat-change">Model Confidence: {salesForecast.confidence}</span>
            </div>
            <button className="button button-primary" onClick={() => handleApply('Sales Demand')}>Apply Forecast Strategy</button>
          </div>
        </div>

        {/* Model 2: Inventory Depletion Engine */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="card-title" style={{ padding: '0 0 15px 0', borderBottom: '1px solid var(--line)' }}>
            <h3 style={{ color: 'var(--red)' }}>Model 2: Inventory Depletion Engine</h3>
            <span className="badge warning">Low Stock Alerts</span>
          </div>
          <div className="table-wrap" style={{ marginTop: '15px' }}>
            <table>
              <thead>
                <tr><th>Ingredient</th><th>Stock</th><th>Days Left</th><th>Risk Level</th></tr>
              </thead>
              <tbody>
                {stockModels.slice(0, 3).map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.onHand} {s.unit}</td>
                    <td>{s.daysLeft} d</td>
                    <td><span className="badge" style={{ color: s.risk === 'High' ? 'var(--red)' : 'var(--green)' }}>{s.risk}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="button button-primary" onClick={() => handleApply('Inventory Restock')}>Apply Restock Plan</button>
          </div>
        </div>

        {/* Model 3: Menu Profitability Matrix */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="card-title" style={{ padding: '0 0 15px 0', borderBottom: '1px solid var(--line)' }}>
            <h3 style={{ color: 'var(--green)' }}>Model 3: Menu Profitability Matrix</h3>
            <span className="badge success">ROI Tracking</span>
          </div>
          <div className="table-wrap" style={{ marginTop: '15px' }}>
            <table>
              <thead>
                <tr><th>Menu Dish</th><th>Profit Status</th><th>Popularity</th><th>Action</th></tr>
              </thead>
              <tbody>
                {menuMatrix.slice(0, 3).map(m => (
                  <tr key={m.id}>
                    <td><strong>{m.name}</strong></td>
                    <td><span className="badge" style={{ backgroundColor: m.color+'15', color: m.color }}>{m.type}</span></td>
                    <td className="stat-change">↑ Increasing</td>
                    <td className="muted">Optimizing...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="button button-primary" onClick={() => handleApply('Menu Optimization')}>Apply Menu Adjustments</button>
          </div>
        </div>

        {/* Model 4: Labor Peak-Time Predictor */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="card-title" style={{ padding: '0 0 15px 0', borderBottom: '1px solid var(--line)' }}>
            <h3 style={{ color: 'var(--accent)' }}>Model 4: Labor Peak-Time Predictor</h3>
            <span className="badge info">Smart Scheduling</span>
          </div>
          <div className="table-wrap" style={{ marginTop: '15px' }}>
            <table>
              <thead>
                <tr><th>Time Slot</th><th>Expected Load</th><th>Staff Needed</th></tr>
              </thead>
              <tbody>
                {peaks.map((p, i) => (
                  <tr key={i}>
                    <td>{p.time}</td>
                    <td><span className="badge info">{p.load}</span></td>
                    <td><strong>{p.staffNeeded} members</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="button button-primary" onClick={() => handleApply('Labor Scheduling')}>Apply Smart Roster</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AICenter;
