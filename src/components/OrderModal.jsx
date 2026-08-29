import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { money } from '../utils';

const OrderModal = ({ isOpen, onClose, onSave, menu, customers }) => {
  const [orderType, setOrderType] = useState('Dine-in');
  const [label, setLabel] = useState('');
  const [cart, setCart] = useState([]);
  const [itemSearch, setItemSearch] = useState('');

  // Delivery details
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    if (isOpen) {
      setOrderType('Dine-in');
      setLabel('');
      setCart([]);
      setItemSearch('');
      setDeliveryName('');
      setDeliveryPhone('');
      setDeliveryAddress('');
    }
  }, [isOpen]);

  const handlePhoneLookup = (phone) => {
    setDeliveryPhone(phone);
    const existing = customers.find(c => c.phone === phone);
    if (existing) {
      setDeliveryName(existing.name);
      setDeliveryAddress(existing.address || '');
    }
  };

  const addToCart = (item) => {
    const existing = cart.find(c => c.menuId === item.id);
    if (existing) {
      setCart(cart.map(c => c.menuId === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { menuId: item.id, qty: 1 }]);
    }
  };

  const adjustCart = (menuId, delta) => {
    setCart(cart.map(c => {
      if (c.menuId === menuId) {
        const newQty = c.qty + delta;
        return newQty > 0 ? { ...c, qty: newQty } : null;
      }
      return c;
    }).filter(Boolean));
  };

  const itemById = id => menu.find(item => item.id === id);
  const subtotal = cart.reduce((sum, c) => sum + (itemById(c.menuId)?.price || 0) * c.qty, 0);

  const filteredMenu = menu.filter(i =>
    i.available &&
    (i.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
     i.code.toLowerCase().includes(itemSearch.toLowerCase()))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    onSave({
      type: orderType,
      label: orderType === 'Delivery' ? deliveryName : (label.trim() || 'Unassigned'),
      items: cart,
      deliveryDetails: orderType === 'Delivery' ? {
        name: deliveryName,
        phone: deliveryPhone,
        address: deliveryAddress
      } : null
    });
  };

  return (
    <Modal
      id="order-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Start new order"
      style={{ width: 'min(780px, 100%)' }}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="modal-grid" style={{ marginBottom: '15px' }}>
            <div className="field">
              <label>Order type</label>
              <select
                className="input"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
              >
                <option>Dine-in</option>
                <option>Takeout</option>
                <option>Delivery</option>
              </select>
            </div>
            <div className="field">
              <label>{orderType === 'Delivery' ? 'Customer Phone' : 'Table or customer label'}</label>
              <input
                className="input"
                placeholder={orderType === 'Delivery' ? 'e.g. 555-0123' : 'e.g. Table 12'}
                value={orderType === 'Delivery' ? deliveryPhone : label}
                onChange={(e) => orderType === 'Delivery' ? handlePhoneLookup(e.target.value) : setLabel(e.target.value)}
              />
            </div>
            {orderType === 'Delivery' && (
              <>
                <div className="field">
                  <label>Customer Name</label>
                  <input
                    className="input"
                    placeholder="e.g. Jordan Reed"
                    value={deliveryName}
                    onChange={(e) => setDeliveryName(e.target.value)}
                  />
                </div>
                <div className="field span-2">
                  <label>Delivery Address</label>
                  <input
                    className="input"
                    placeholder="e.g. 123 Harbor Way, Apt 4B"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <div className="new-order-layout">
            <div className="menu-pick">
              <h4>Select available menu items</h4>
              <div className="search" style={{ marginTop: '10px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="10.7" cy="10.7" r="6.7"/>
                  <path d="m16 16 5 5"/>
                </svg>
                <input
                  className="input"
                  placeholder="Search by item name or code..."
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                />
              </div>
              <div className="pick-grid">
                {filteredMenu.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className="pick"
                    onClick={() => addToCart(item)}
                  >
                    <strong>{item.name}</strong>
                    <span>{money(item.price)}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="cart">
              <h4>Current order</h4>
              {cart.length === 0 ? (
                <div className="empty" style={{ padding: '25px 5px' }}>
                  Select items to add them here.
                </div>
              ) : (
                <div id="cart-lines">
                  {cart.map(c => {
                    const i = itemById(c.menuId);
                    return (
                      <div className="cart-line" key={c.menuId}>
                        <strong>{i?.name}</strong>
                        <div className="qty">
                          <button type="button" onClick={() => adjustCart(c.menuId, -1)}>−</button>
                          <span>{c.qty}</span>
                          <button type="button" onClick={() => adjustCart(c.menuId, 1)}>+</button>
                        </div>
                        <span>{money((i?.price || 0) * c.qty)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="cart-total">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button type="button" class="button button-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" class="button button-primary" disabled={cart.length === 0}>Save order</button>
        </div>
      </form>
    </Modal>
  );
};

export default OrderModal;
