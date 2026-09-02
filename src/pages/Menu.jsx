import React, { useState } from 'react';
import { money } from '../utils';
import CustomSelect from '../components/CustomSelect';

const Menu = ({ menu, onToggleAvailability, onDeleteItem, onEditItem, onAddItem }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const filteredMenu = menu.filter(item => {
    const matchesSearch = `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesAvailability = availabilityFilter === 'all' || (availabilityFilter === 'available' ? item.available : !item.available);
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Tea', label: 'Tea' },
    { value: 'Fast Food', label: 'Fast Food' },
    { value: 'Fries', label: 'Fries' },
    { value: 'Drinks', label: 'Drinks' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Availability' },
    { value: 'available', label: 'Available' },
    { value: 'unavailable', label: 'Sold Out' }
  ];

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h2>Menu management</h2>
          <p>Keep the MuRsHiD KhAnA menu fresh and ready for orders.</p>
        </div>
        <div className="head-actions">
          <button className="button button-primary" onClick={onAddItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add menu item
          </button>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10.7" cy="10.7" r="6.7"/><path d="m16 16 5 5"/></svg>
          <input className="input" placeholder="Search tea, burgers, drinks..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <CustomSelect
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
        <CustomSelect
          options={availabilityOptions}
          value={availabilityFilter}
          onChange={setAvailabilityFilter}
        />
      </div>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Item Details</th>
              <th>Category</th>
              <th className="text-right">Price</th>
              <th className="text-center">Availability</th>
              <th className="text-right">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenu.length > 0 ? (
              filteredMenu.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="item-name-cell">
                      <div className="food-placeholder">{item.name.split(' ').map(x => x[0]).join('').slice(0, 2)}</div>
                      <div className="item-details">
                        <strong>{item.name}</strong>
                        <span>{item.description}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge info">{item.category}</span></td>
                  <td className="text-right font-medium tabular-nums">Rs. {item.price}</td>
                  <td className="text-center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <button className={`toggle ${item.available ? 'on' : ''}`} onClick={() => onToggleAvailability(item.id)}></button>
                      <span className="muted" style={{ fontSize: '11px', minWidth: '60px' }}>{item.available ? 'Available' : 'Sold Out'}</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button className="mini-button" onClick={() => onEditItem(item)}>Edit</button>
                      <button className="mini-button" style={{ color: 'var(--red)' }} onClick={() => onDeleteItem(item.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5"><div className="empty">No menu items match your filters.</div></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Menu;

