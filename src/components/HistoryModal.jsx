import React, { useState } from 'react';
import Modal from './Modal';
import { money, getISODate } from '../utils';

const HistoryModal = ({ isOpen, onClose, orders, menu }) => {
  const [selectedDate, setSelectedDate] = useState(getISODate());
  const [filterType, setFilterType] = useState('business'); // 'business' or 'actual'

  const itemById = id => menu.find(item => item.id === id);
  const orderTotal = order => order.items.reduce((sum, line) => sum + (itemById(line.menuId)?.price || 0) * line.qty, 0);

  const dailyOrders = orders.filter(o =>
    filterType === 'business' ? o.businessDate === selectedDate : o.date === selectedDate
  );

  // Analytics should exclude Cancelled orders
  const validOrders = dailyOrders.filter(o => o.status !== 'Cancelled');
  const totalSales = validOrders.reduce((sum, o) => sum + orderTotal(o), 0);
  const totalCount = validOrders.length;
  const aov = totalCount > 0 ? totalSales / totalCount : 0;

  return (
    <Modal
      id="history-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Order History & Analytics"
      style={{ width: 'min(900px, 95%)', maxHeight: '90vh' }}
    >
      <div className="modal-body" style={{ overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', background: '#f8fafc', padding: '15px', borderRadius: '12px', flexWrap: 'wrap', gap: '15px' }}>
          <div className="field" style={{ margin: 0, flex: '1 1 200px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--navy)' }}>Filter by {filterType === 'business' ? 'Business Shift' : 'Calendar Date'}</label>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input
                type="date"
                className="input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ padding: '8px' }}
              />
              <button
                className="mini-button"
                type="button"
                onClick={() => setFilterType(prev => prev === 'business' ? 'actual' : 'business')}
                style={{ whiteSpace: 'nowrap', fontSize: '10px', padding: '0 10px' }}
              >
                Switch to {filterType === 'business' ? 'Calendar' : 'Business'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flex: '1 1 300px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <div className="stat-card" style={{ background: 'white', padding: '10px 10px', borderRadius: '12px', border: '1px solid var(--line)', textAlign: 'center', flex: '1', minWidth: '90px' }}>
              <div className="muted" style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Total Sales</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--accent)', whiteSpace: 'nowrap' }}>Rs. {totalSales}</div>
            </div>
            <div className="stat-card" style={{ background: 'white', padding: '10px 10px', borderRadius: '12px', border: '1px solid var(--line)', textAlign: 'center', flex: '1', minWidth: '70px' }}>
              <div className="muted" style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Orders</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--navy)', whiteSpace: 'nowrap' }}>{totalCount}</div>
            </div>
            <div className="stat-card" style={{ background: 'white', padding: '10px 10px', borderRadius: '12px', border: '1px solid var(--line)', textAlign: 'center', flex: '1', minWidth: '90px' }}>
              <div className="muted" style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Avg Value</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#059669', whiteSpace: 'nowrap' }}>Rs. {Math.round(aov)}</div>
            </div>
          </div>
        </div>

        <div className="card table-wrap scrollable-table" style={{ margin: 0 }}>
          <table style={{ fontSize: '13px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Time / Date</th>
                <th>Shift Date</th>
                <th>Type</th>
                <th>Table/Cust</th>
                <th>Items</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {dailyOrders.length > 0 ? (
                dailyOrders.map(o => (
                  <tr key={o.id}>
                    <td className="font-mono">{o.id}</td>
                    <td className="muted">
                      <div>{o.time}</div>
                      <div style={{ fontSize: '10px' }}>{o.date}</div>
                    </td>
                    <td className="font-medium" style={{ color: 'var(--accent)' }}>{o.businessDate}</td>
                    <td><span className="badge info" style={{ fontSize: '10px' }}>{o.type}</span></td>
                    <td>{o.label}</td>
                    <td>
                      <div className="muted" style={{ fontSize: '11px' }}>
                        {o.items.map((line, idx) => (
                          <div key={idx}>{line.qty} × {itemById(line.menuId)?.name}</div>
                        ))}
                      </div>
                    </td>
                    <td className="text-right font-medium">Rs. {orderTotal(o)}</td>
                    <td className="text-center"><span className={`badge ${o.status === 'Completed' ? 'ready' : 'info'}`} style={{ fontSize: '10px' }}>{o.status}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }} className="muted">
                    No orders found for this date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal-foot">
        <button className="button button-secondary" onClick={onClose}>Close History</button>
      </div>
    </Modal>
  );
};

export default HistoryModal;
