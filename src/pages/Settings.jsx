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
          <span className="badge info">Phase 3</span>
        </div>
      </div>
      <div className="settings-grid">
        <div>
          <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '15px' }}>Access &amp; roles</h3>
            <p className="muted" style={{ fontSize: '12px', marginBottom: '15px' }}>Choose the active workspace role and review permissions.</p>
            <div className="field" style={{ marginBottom: '20px' }}>
              <label className="muted" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Current workspace role</label>
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
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--line)' }}>
                <div><strong>Manager</strong><div className="muted" style={{ fontSize: '11px' }}>Full operations and reporting access</div></div>
                <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: '11px' }}>Full access</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--line)' }}>
                <div><strong>Cashier</strong><div className="muted" style={{ fontSize: '11px' }}>Orders, billing, and menu availability</div></div>
                <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: '11px' }}>Operational</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--line)' }}>
                <div><strong>Server</strong><div className="muted" style={{ fontSize: '11px' }}>Orders and table service workflow</div></div>
                <span style={{ color: 'var(--muted)', fontWeight: 600, fontSize: '11px' }}>Limited</span>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '15px' }}>Receipt printer</h3>
            <p className="muted" style={{ fontSize: '12px', marginBottom: '15px' }}>Use your browser's print dialog to send receipts to a printer.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--line)' }}>
              <div><strong>Printer connection</strong><div className="muted" style={{ fontSize: '11px' }}>Browser print ready</div></div>
              <button className="button button-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Test print</button>
            </div>
          </div>
        </div>
        <div>
          <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '15px' }}>Data &amp; backups</h3>
            <p className="muted" style={{ fontSize: '12px', marginBottom: '15px' }}>Your current demo data is saved in this browser.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--line)' }}>
              <div><strong>Local database</strong><div className="muted" style={{ fontSize: '11px' }}>Browser storage is active</div></div>
              <span className="badge ready">Connected</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--line)' }}>
              <div><strong>Backup workspace</strong><div className="muted" style={{ fontSize: '11px' }}>Download operations data</div></div>
              <button className="button button-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Download</button>
            </div>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '15px' }}>Exports</h3>
            <p className="muted" style={{ fontSize: '12px', marginBottom: '15px' }}>Share operational data with management tools.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--line)' }}>
              <div><strong>Sales CSV</strong><div className="muted" style={{ fontSize: '11px' }}>Orders and totals for analysis</div></div>
              <button className="button button-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Download CSV</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--line)' }}>
              <div><strong>Report printout</strong><div className="muted" style={{ fontSize: '11px' }}>Print performance summary</div></div>
              <button className="button button-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => window.print()}>Print report</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
