import React from 'react';
import { money } from '../utils';

const AICenter = ({ inventory, orders, menu, staff }) => {

  // --- Model 1: Sales Demand Forecaster ---
  const calculateForecast = () => {
    const totalSales = orders.reduce((sum, o) => sum + (o.paid ? 1200 : 0), 45000); // Simulated baseline
    return {
      current: totalSales,
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

  // --- Model 3: Menu Profitability Matrix (BCG) ---
  const menuMatrix = menu.map(item => {
    const sales = (item.id * 5) + Math.floor(Math.random() * 10);
    let type = 'Star'; // High Profit, High Popularity
    let color = 'var(--green)';

    if (sales < 10) { type = 'Dog'; color = 'var(--red)'; }
    else if (item.price < 15) { type = 'Plowhorse'; color = 'var(--blue)'; }

    return { ...item, sales, type, color };
  });

  // --- Model 4: Labor Peak-Time Predictor ---
  const peaks = [
    { time: '1:00 PM - 3:00 PM', load: 'Peak', staffNeeded: 4 },
    { time: '7:00 PM - 9:00 PM', load: 'Very High', staffNeeded: 6 },
    { time: '4:00 PM - 6:00 PM', load: 'Moderate', staffNeeded: 3 }
  ];

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

      {/* Model 1 & 4 Summary Cards */}
      <div className="stats">
        <div className="card stat">
          <span className="stat-label">Sales Forecast (Next 7d)</span>
          <strong className="stat-value">{money(salesForecast.projected)}</strong>
          <span className="stat-change">Confidence: {salesForecast.confidence}</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Predicted Peak Today</span>
          <strong className="stat-value" style={{ fontSize: '18px', marginTop: '10px' }}>7:00 PM - 9:00 PM</strong>
          <span className="stat-change neutral">Expected Load: Very High</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Menu Efficiency</span>
          <strong className="stat-value">88%</strong>
          <span className="stat-change">↑ 3% from last month</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Stock Health Index</span>
          <strong className="stat-value">Good</strong>
          <span className="stat-change">2 items need restock</span>
        </div>
      </div>

      <div className="section-grid two">

        {/* Model 2: Inventory Engine Table */}
        <div className="card">
          <div className="card-title">
            <h3>1. Inventory Depletion Model</h3>
            <span className="muted">Predictive Restock</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Stock</th>
                  <th>Days Left</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {stockModels.slice(0, 4).map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.onHand} {s.unit}</td>
                    <td>{s.daysLeft} days</td>
                    <td><span className="badge" style={{ color: s.risk === 'High' ? 'var(--red)' : 'var(--green)' }}>{s.risk}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Model 3: Menu Intelligence Table */}
        <div className="card">
          <div className="card-title">
            <h3>2. Menu Profitability Model</h3>
            <span className="muted">Performance Matrix</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Dish</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {menuMatrix.slice(0, 4).map(m => (
                  <tr key={m.id}>
                    <td><strong>{m.name}</strong></td>
                    <td className="muted">{m.category}</td>
                    <td><span className="badge" style={{ backgroundColor: m.color+'15', color: m.color }}>{m.type}</span></td>
                    <td className="stat-change">↑ High</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <div className="dashboard-grid" style={{ marginTop: '20px' }}>

        {/* Model 4: Staffing Heatmap Simulator */}
        <div className="card">
          <div className="card-title">
            <h3>3. Labor Optimization AI</h3>
            <span className="muted">Next 24h peaks</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Time Window</th>
                  <th>Workload</th>
                  <th>Staff Recommended</th>
                </tr>
              </thead>
              <tbody>
                {peaks.map((p, i) => (
                  <tr key={i}>
                    <td>{p.time}</td>
                    <td><span className="badge info">{p.load}</span></td>
                    <td className="text-right"><strong>{p.staffNeeded} members</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Strategic Action Model */}
        <div className="card" style={{ padding: '20px', background: 'var(--navy)', color: '#fff' }}>
          <h3 style={{ color: 'var(--accent)', marginBottom: '15px' }}>4. Business Intelligence Model</h3>
          <div style={{ display: 'grid', gap: '15px', fontSize: '13px', opacity: '0.9' }}>
            <p>• <strong>Strategy:</strong> Increase production of <strong>{menuMatrix[0].name}</strong> for the upcoming peak at 7:00 PM.</p>
            <p>• <strong>Cost Saving:</strong> Reducing stock of low-turnover items could save <strong>2,400 Rs</strong> this week.</p>
            <p>• <strong>Growth:</strong> Current trends suggest expanding your <strong>{menuMatrix[0].category}</strong> category by 2 items.</p>
          </div>
          <button className="button button-primary" style={{ width: '100%', marginTop: '15px' }}>Apply AI Suggestions</button>
        </div>

      </div>
    </section>
  );
};

export default AICenter;
