import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { money } from '../utils';
import CustomSelect from './CustomSelect';

const OrderModal = ({ isOpen, onClose, onSave, menu, customers, editingOrder }) => {
  const [orderType, setOrderType] = useState('Dine-in');
  const [label, setLabel] = useState('');
  const [cart, setCart] = useState([]);
  const [itemSearch, setItemSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All');

  // Delivery details
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editingOrder) {
        setOrderType(editingOrder.type);
        setLabel(editingOrder.label);
        setCart(editingOrder.items);
        if (editingOrder.type === 'Delivery' && editingOrder.deliveryDetails) {
          setDeliveryName(editingOrder.deliveryDetails.name);
          setDeliveryPhone(editingOrder.deliveryDetails.phone);
          setDeliveryAddress(editingOrder.deliveryDetails.address);
        }
      } else {
        setOrderType('Dine-in');
        setLabel('Table ');
        setCart([]);
        setDeliveryName('');
        setDeliveryPhone('');
        setDeliveryAddress('');
      }
      setItemSearch('');
      setActiveCategory('All');
      setActiveBrand('All');
    }
  }, [isOpen, editingOrder]);

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

  const filteredMenu = menu.filter(i => {
    const matchesAvailability = i.available;
    const matchesCategory = activeCategory === 'All' || i.category === activeCategory;

    let matchesBrand = true;
    if (activeCategory === 'Drinks' && activeBrand !== 'All') {
      // Direct brand property check
      const brandMatch = i.brand === activeBrand;
      // Fallback: Check if brand name is in item name (e.g., "Coca Cola - 0.5L")
      const nameMatch = i.name.toLowerCase().includes(activeBrand.toLowerCase());
      matchesBrand = brandMatch || nameMatch;
    }

    const matchesSearch = i.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
                          i.code.toLowerCase().includes(itemSearch.toLowerCase());

    return matchesAvailability && matchesCategory && matchesBrand && matchesSearch;
  });

  const handleTypeChange = (newType) => {
    setOrderType(newType);
    if (newType === 'Dine-in' && !label.startsWith('Table ')) {
      setLabel('Table ');
    } else if (newType !== 'Dine-in' && label === 'Table ') {
      setLabel('');
    }
  };

  const handleLabelChange = (val) => {
    if (orderType === 'Dine-in') {
      // Prevent deleting "Table " prefix
      if (!val.startsWith('Table ')) {
        setLabel('Table ' + val.replace(/^Table\s*/i, ''));
      } else {
        setLabel(val);
      }
    } else {
      setLabel(val);
    }
  };

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

  const typeOptions = [
    { value: 'Dine-in', label: 'Dine-in' },
    { value: 'Takeout', label: 'Takeout' },
    { value: 'Delivery', label: 'Delivery' }
  ];

  const categories = ['All', 'Tea', 'Drinks', 'Fries', 'Fast Food'];
  const drinkBrands = ['All', 'Coca Cola', 'Pepsi', 'Sprite', 'Mountain Dew'];

  return (
    <Modal
      id="order-modal"
      isOpen={isOpen}
      onClose={onClose}
      title={editingOrder ? `Edit Order ${editingOrder.id}` : "Start new order"}
      style={{ width: 'min(780px, 100%)' }}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="modal-grid" style={{ marginBottom: '15px' }}>
            <div className="field">
              <label>Order type</label>
              <CustomSelect
                options={typeOptions}
                value={orderType}
                onChange={handleTypeChange}
              />
            </div>
            <div className="field">
              <label>{orderType === 'Delivery' ? 'Customer Phone' : 'Table No'}</label>
              <input
                className="input"
                placeholder={orderType === 'Delivery' ? 'e.g. 0300-1234567' : 'e.g. Table 05'}
                value={orderType === 'Delivery' ? deliveryPhone : label}
                onChange={(e) => orderType === 'Delivery' ? handlePhoneLookup(e.target.value) : handleLabelChange(e.target.value)}
              />
            </div>
            {orderType === 'Delivery' && (
              <>
                <div className="field">
                  <label>Customer Name</label>
                  <input
                    className="input"
                    placeholder="e.g. Ali Khan"
                    value={deliveryName}
                    onChange={(e) => setDeliveryName(e.target.value)}
                  />
                </div>
                <div className="field span-2">
                  <label>Delivery Address</label>
                  <input
                    className="input"
                    placeholder="e.g. House 12, Street 4, Sector G-10"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="category-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '15px', overflowX: 'auto', paddingBottom: '5px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`mini-button ${activeCategory === cat ? 'active' : ''}`}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: activeCategory === cat ? 'var(--accent)' : 'white',
                  color: activeCategory === cat ? 'white' : 'var(--muted)',
                  borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--line)',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveBrand('All');
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {activeCategory === 'Drinks' && (
            <div className="brand-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '15px', overflowX: 'auto', paddingBottom: '5px', background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
              {drinkBrands.map(brand => (
                <button
                  key={brand}
                  type="button"
                  className={`mini-button ${activeBrand === brand ? 'active' : ''}`}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    background: activeBrand === brand ? 'var(--navy)' : 'white',
                    color: activeBrand === brand ? 'white' : 'var(--muted)',
                    borderColor: activeBrand === brand ? 'var(--navy)' : 'var(--line)',
                    whiteSpace: 'nowrap'
                  }}
                  onClick={() => setActiveBrand(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}

          <div className="new-order-layout">
            <div className="menu-pick">
              <h4>
                {activeCategory === 'Drinks' && activeBrand !== 'All'
                  ? `Select ${activeBrand} sizes`
                  : `Select ${activeCategory !== 'All' ? activeCategory : 'MuRsHiD KhAnA'} items`}
              </h4>
              <div className="search" style={{ marginTop: '10px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="10.7" cy="10.7" r="6.7"/>
                  <path d="m16 16 5 5"/>
                </svg>
                <input
                  className="input"
                  placeholder="Search item name or code..."
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                />
              </div>
              <div className="pick-grid">
                {filteredMenu.length > 0 ? (
                  filteredMenu.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      className="pick"
                      onClick={() => addToCart(item)}
                    >
                      <strong>{item.name}</strong>
                      <span>Rs. {item.price}</span>
                    </button>
                  ))
                ) : (
                  <div className="empty" style={{ gridColumn: 'span 2', padding: '20px' }}>No items found.</div>
                )}
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
                        <span>Rs. {(i?.price || 0) * c.qty}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="cart-total">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="button button-primary" disabled={cart.length === 0}>
            {editingOrder ? 'Update order' : 'Save order'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default OrderModal;
