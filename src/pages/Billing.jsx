import React, { useState } from 'react';
import { money, badge } from '../utils';

const Billing = ({ orders, menu, onMarkPaid }) => {
  const [selectedOrderId, setSelectedOrderId] = useState(
    orders.find(o => !o.paid && o.status !== 'Cancelled')?.id || (orders.length > 0 ? orders[0].id : null)
  );
  const [discount, setDiscount] = useState(0);

  const itemById = id => menu.find(item => item.id === id);
  const orderTotal = order => order.items.reduce((sum, line) => sum + (itemById(line.menuId)?.price || 0) * line.qty, 0);

  const openOrders = orders.filter(o => !o.paid && o.status !== 'Cancelled');
  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const renderBillDetail = (o) => {
    if (!o) return <div className="empty">Select an order to review its bill.</div>;

    const subtotal = orderTotal(o);
    const tax = Math.max(0, (subtotal - discount) * 0.0825);
    const total = subtotal - discount + tax;

    const printReceipt = () => {
      const w = window.open('', '_blank', 'width=800,height=900');
      if (!w) {
        alert('Please allow popups to print receipts');
        return;
      }

      const receiptHtml = `
        <html>
          <head>
            <title>Receipt ${o.id}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              /* Adaptive Reset for all Printer Types */
              * { box-sizing: border-box; }
              body {
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                margin: 0;
                padding: 20px;
                color: #17263b;
                line-height: 1.5;
                background: #fff;
                width: 100%;
              }

              /* Container for responsiveness */
              .receipt-container {
                max-width: 500px; /* Standard wide receipt, scales down for thermal */
                margin: 0 auto;
                position: relative;
                overflow: hidden;
              }

              h2 { text-align: center; margin: 0 0 5px; font-size: 28px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
              .center { text-align: center; color: #555; font-size: 14px; margin-bottom: 25px; }

              /* Table styling for any width */
              table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 16px; }
              th { text-align: left; font-size: 12px; text-transform: uppercase; color: #718096; border-bottom: 2px solid #17263b; padding-bottom: 8px; }
              td { padding: 12px 0; border-bottom: 1px solid #eee; }
              .right { text-align: right; }

              .summary { margin-top: 20px; border-top: 2px solid #17263b; padding-top: 15px; }
              .summary-row { display: flex; justify-content: space-between; margin: 6px 0; font-size: 15px; }
              .total { font-size: 24px; font-weight: 900; margin-top: 15px; padding-top: 15px; border-top: 2px dashed #000; }

              /* Professional Paid Stamp */
              .paid-stamp {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-25deg);
                border: 6px solid #c45252;
                color: #c45252;
                font-size: 64px;
                font-weight: 900;
                padding: 10px 30px;
                text-transform: uppercase;
                opacity: 0.15;
                border-radius: 12px;
                pointer-events: none;
                z-index: 10;
                display: ${o.paid ? 'block' : 'none'};
              }

              .footer { text-align: center; margin-top: 40px; font-size: 13px; color: #718096; border-top: 1px solid #eee; padding-top: 20px; }

              @media print {
                body { padding: 0; }
                .receipt-container { width: 100%; max-width: 100%; }
                @page { margin: 10mm; }
              }

              /* Handling Small Thermal Printers (80mm / 58mm) */
              @media (max-width: 400px) {
                body { padding: 5px; font-size: 12px; }
                h2 { font-size: 20px; }
                .total { font-size: 18px; }
                .paid-stamp { font-size: 36px; border-width: 4px; }
                td, .summary-row { font-size: 12px; }
              }
            </style>
          </head>
          <body>
            <div class="receipt-container">
              <div class="paid-stamp">PAID</div>

              <h2>Harbor & Hearth</h2>
              <div class="center">
                125 Harbor Avenue · New York, NY<br>
                <b>RECEIPT: ${o.id}</b><br>
                ${o.time} · ${o.type}<br>
                ${o.label}
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th class="right">Qty</th>
                    <th class="right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${o.items.map(x => {
                    const i = itemById(x.menuId);
                    return `
                      <tr>
                        <td>${i?.name || 'Unknown'}</td>
                        <td class="right">${x.qty}</td>
                        <td class="right">${money((i?.price || 0) * x.qty)}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>

              <div class="summary">
                <div class="summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
                ${discount > 0 ? `<div class="summary-row"><span>Discount</span><span>-${money(discount)}</span></div>` : ''}
                <div class="summary-row"><span>Sales Tax (8.25%)</span><span>${money(tax)}</span></div>
                <div class="summary-row total"><span>TOTAL</span><span>${money(total)}</span></div>
              </div>

              <div class="footer">
                Thank you for your visit!<br>
                Questions? Call: (555) 012-3456<br>
                www.harborhearth.com
              </div>
            </div>

            <script>
              window.onload = () => {
                window.print();
              };
            </script>
          </body>
        </html>
      `;

      w.document.write(receiptHtml);
      w.document.close();
    };

    return (
      <>
        <div className="bill-detail-head">
          <div>
            <h3>Bill {o.id}</h3>
            <p>{o.label} · {o.type} · {o.time}</p>
          </div>
          {o.paid ? badge('Paid') : badge(o.status)}
        </div>
        <table className="bill-items">
          <tbody>
            {o.items.map((x, idx) => {
              const i = itemById(x.menuId);
              return (
                <tr key={idx}>
                  <td>{x.qty} × {i?.name || 'Unknown Item'}</td>
                  <td>{money((i?.price || 0) * x.qty)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="bill-summary">
          <div className="summary-line">
            <span>Subtotal</span>
            <b>{money(subtotal)}</b>
          </div>
          <div className="billing-controls">
            <div className="field">
              <label>Discount (USD)</label>
              <input
                className="input"
                type="number"
                min="0"
                step=".01"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label>Payment method</label>
              <select className="input">
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Cash</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="summary-line">
            <span>Sales tax (8.25%)</span>
            <b>{money(tax)}</b>
          </div>
          <div className="summary-line total">
            <span>Grand total</span>
            <span>{money(total)}</span>
          </div>
        </div>
        <div className="bill-actions">
          <button className="button button-secondary" onClick={printReceipt}>Print preview</button>
          {o.paid ? (
            <button className="button button-secondary" disabled>Payment complete</button>
          ) : (
            <button className="button button-primary" onClick={() => onMarkPaid(o.id)}>
              Mark as paid
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <section className="page active" id="billing-page">
      <div className="page-head">
        <div>
          <h2>Billing</h2>
          <p>Review totals, take payment, and prepare a clean receipt.</p>
        </div>
      </div>
      <div className="billing-layout">
        <div className="card bill-list">
          <div className="card-title">
            <h3>Open orders</h3>
            <span className="muted">{openOrders.length} open</span>
          </div>
          <div id="bill-list">
            {openOrders.length > 0 ? (
              openOrders.map(o => (
                <button
                  key={o.id}
                  className={`bill-select ${o.id === selectedOrderId ? 'active' : ''}`}
                  onClick={() => setSelectedOrderId(o.id)}
                >
                  <b>{money(orderTotal(o))}</b>
                  <strong>{o.id} · {o.label}</strong>
                  <span>{o.type} · {o.time} · {o.status}</span>
                </button>
              ))
            ) : (
              <div className="empty">All current orders are paid.</div>
            )}
          </div>
        </div>
        <div className="card bill-detail">
          {renderBillDetail(selectedOrder)}
        </div>
      </div>
    </section>
  );
};

export default Billing;
