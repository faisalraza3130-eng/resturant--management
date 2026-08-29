import React from 'react';

const Settings = ({ activeRole, onChangeRole }) => {
  return (
    <section className="page active" id="settings-page">
      <div className="page-head">
        <div>
          <h2>Settings &amp; access</h2>
          <p>Control team access, data portability, and restaurant operations.</p>
        </div>
        <div className="head-actions">
          <span className="code-chip">Phase 3</span>
        </div>
      </div>
      <div className="section-grid two">
        <div>
          <div className="card feature-card">
            <h3>Access &amp; roles</h3>
            <p>Choose the active workspace role for this demo and review what each role can access.</p>
            <div className="field" style={{ marginBottom: '13px' }}>
              <label>Current workspace role</label>
              <select
                className="input"
                value={activeRole}
                onChange={(e) => onChangeRole(e.target.value)}
              >
                <option>Manager</option>
                <option>Cashier</option>
                <option>Server</option>
              </select>
            </div>
            <div className="feature-row">
              <div><strong>Manager</strong><span>Full operations and reporting access</span></div>
              <span className="permission">Full access</span>
            </div>
            <div className="feature-row">
              <div><strong>Cashier</strong><span>Orders, billing, and menu availability</span></div>
              <span className="permission">Operational</span>
            </div>
            <div className="feature-row">
              <div><strong>Server</strong><span>Orders and table service workflow</span></div>
              <span className="permission restricted">Limited</span>
            </div>
          </div>
          <div className="card feature-card">
            <h3>Receipt printer</h3>
            <p>Use your browser's print dialog to send receipts to a connected thermal or standard printer.</p>
            <div className="feature-row">
              <div><strong>Printer connection</strong><span>Browser print ready</span></div>
              <button className="button button-secondary">Test print</button>
            </div>
          </div>
        </div>
        <div>
          <div className="card feature-card">
            <h3>Data &amp; backups</h3>
            <p>Your current demo data is saved in this browser. Download a backup before moving devices or resetting the workspace.</p>
            <div className="feature-row">
              <div><strong>Local database</strong><span>Browser storage is active</span></div>
              <span className="badge completed">Connected</span>
            </div>
            <div className="feature-row">
              <div><strong>Backup workspace</strong><span>Download menu, orders, customers, and operations data</span></div>
              <button className="button button-secondary">Download backup</button>
            </div>
            <div className="feature-row">
              <div><strong>Restore workspace</strong><span>Load a previously exported JSON backup</span></div>
              <label className="button button-secondary" style={{ cursor: 'pointer' }}>
                Choose file
                <input type="file" accept=".json,application/json" hidden />
              </label>
            </div>
          </div>
          <div className="card feature-card">
            <h3>Exports</h3>
            <p>Share operational data with accounting or management tools.</p>
            <div className="feature-row">
              <div><strong>Sales CSV</strong><span>Orders and totals for spreadsheet analysis</span></div>
              <button className="button button-secondary">Download CSV</button>
            </div>
            <div className="feature-row">
              <div><strong>Report printout</strong><span>Print the current performance summary to PDF</span></div>
              <button className="button button-secondary" onClick={() => window.print()}>Print report</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
