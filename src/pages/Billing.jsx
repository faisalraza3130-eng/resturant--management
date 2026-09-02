import React, { useState } from 'react';
import { money, badge } from '../utils';
import CustomSelect from '../components/CustomSelect';

const Billing = ({ orders, menu, onMarkPaid }) => {
  const [selectedOrderId, setSelectedOrderId] = useState(
    orders.find(o => !o.paid && o.status !== 'Cancelled')?.id || (orders.length > 0 ? orders[0].id : null)
  );
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const itemById = id => menu.find(item => item.id === id);
  const orderTotal = order => order.items.reduce((sum, line) => sum + (itemById(line.menuId)?.price || 0) * line.qty, 0);

  const openOrders = orders.filter(o => !o.paid && o.status !== 'Cancelled');
  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const paymentOptions = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Easypaisa', label: 'Easypaisa' },
    { value: 'JazzCash', label: 'JazzCash' },
    { value: 'Card', label: 'Card' }
  ];

  const renderBillDetail = (o) => {
    if (!o) return <div className="empty">Select an order to review its bill.</div>;

    const subtotal = orderTotal(o);
    const total = subtotal - discount;

    return (
      <>
        <div className="bill-detail-head">
          <div><h3>Bill {o.id}</h3><p>{o.label} · {o.type} · {o.time}</p></div>
          {o.paid ? badge('Paid') : badge(o.status)}
        </div>
        <div className="table-wrap" style={{ border: 'none' }}>
          <table>
            <thead><tr><th>Description</th><th className="text-right">Price</th></tr></thead>
            <tbody>
              {o.items.map((x, idx) => {
                const i = itemById(x.menuId);
                return (
                  <tr key={idx}>
                    <td data-label="Description"><div className="font-medium">{x.qty} × {i?.name}</div></td>
                    <td data-label="Price" className="text-right tabular-nums">Rs. {(i?.price || 0) * x.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bill-summary">
          <div className="summary-line"><span>Subtotal</span><b className="tabular-nums">Rs. {subtotal}</b></div>
          <div className="billing-controls">
            <div className="field">
              <label>Discount</label>
              <input className="input" type="number" min="0" step="1" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
            </div>
            <div className="field">
              <label>Payment Method</label>
              <CustomSelect
                options={paymentOptions}
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>
          </div>
          <div className="summary-line total"><span>Grand total</span><span className="tabular-nums">Rs. {total.toFixed(0)}</span></div>
        </div>
        <div className="bill-actions">
          {!o.paid && <button className="button button-primary" onClick={() => onMarkPaid(o.id)}>Mark as paid</button>}
        </div>
      </>
    );
  };

  return (
    <section className="page active">
      <div className="page-head">
        <div><h2>Billing management</h2><p>Review totals, take payment, and prepare a clean receipt.</p></div>
      </div>
      <div className="billing-layout">
        <div className="card bill-list">
          <div className="card-title"><h3>Open checks</h3><span className="badge info">{openOrders.length} checks</span></div>
          <div className="table-wrap" style={{ border: 'none' }}>
            <table>
              <thead><tr><th>Order</th><th className="text-right">Balance</th></tr></thead>
              <tbody>
                {openOrders.length > 0 ? (
                  openOrders.map(o => (
                    <tr key={o.id} className={o.id === selectedOrderId ? 'active' : ''} onClick={() => setSelectedOrderId(o.id)} style={{ cursor: 'pointer' }}>
                      <td data-label="Order"><div className="font-medium">{o.id}</div><div className="muted" style={{ fontSize: '10px' }}>{o.label} · {o.time}</div></td>
                      <td data-label="Balance" className="text-right tabular-nums font-medium">Rs. {orderTotal(o)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="2" className="empty">All checks paid.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card bill-detail">{renderBillDetail(selectedOrder)}</div>
      </div>
    </section>
  );
};

export default Billing;

