// MuRsHiD KhAnA - Operational Dashboard (v1.1.0)
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import Staff from './pages/Staff';
import Expenses from './pages/Expenses';
import Settings from './pages/Settings';
import Welcome from './pages/Welcome';

import MenuModal from './components/MenuModal';
import OrderModal from './components/OrderModal';
import StaffModal from './components/StaffModal';
import ExpenseModal from './components/ExpenseModal';
import StockModal from './components/StockModal';

import {
  initialMenu, initialOrders, initialInventory,
  initialCustomers, initialExpenses, initialStaff
} from './data';

const pageInfo = {
  dashboard: { title: 'Dashboard', subtitle: 'Tuesday, September 1, 2026 · MuRsHiD KhAnA Overview' },
  menu: { title: 'Menu', subtitle: 'Tuesday, September 1, 2026 · MuRsHiD KhAnA Menu' },
  orders: { title: 'Orders', subtitle: 'Tuesday, September 1, 2026 · Active Orders' },
  billing: { title: 'Billing', subtitle: 'Tuesday, September 1, 2026 · Payments & Receipts' },
  inventory: { title: 'Inventory', subtitle: 'Tuesday, September 1, 2026 · Stock Control' },
  expenses: { title: 'Expenses', subtitle: 'Tuesday, September 1, 2026 · Stall Expenses' },
  staff: { title: 'Staff', subtitle: 'Tuesday, September 1, 2026 · Team MuRsHiD KhAnA' },
  settings: { title: 'Settings & access', subtitle: 'Tuesday, September 1, 2026 · Workspace Controls' },
};

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menu, setMenu] = useState(initialMenu);
  const [orders, setOrders] = useState(initialOrders);
  const [inventory, setInventory] = useState(initialInventory);
  const [customers, setCustomers] = useState(initialCustomers);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [staff, setStaff] = useState(initialStaff);
  const [activeRole, setActiveRole] = useState('Manager');

  const [toast, setToast] = useState({ show: false, message: '' });

  // Modal State
  const [modals, setModals] = useState({
    menu: false,
    order: false,
    staff: false,
    expense: false,
    stock: false
  });
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [stockInitialItemId, setStockInitialItemId] = useState(null);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2600);
  };

  const toggleModal = (modal, isOpen, data = null) => {
    setModals(prev => ({ ...prev, [modal]: isOpen }));
    if (modal === 'menu' && !isOpen) setEditingMenuItem(null);
    if (modal === 'stock' && isOpen) setStockInitialItemId(data);
  };

  const { title, subtitle } = pageInfo[currentPage];

  // Handlers
  const handleToggleAvailability = (id) => {
    setMenu(menu.map(i => i.id === id ? { ...i, available: !i.available } : i));
    const item = menu.find(i => i.id === id);
    showToast(`${item.name} availability updated.`);
  };

  const handleDeleteMenuItem = (id) => {
    if (window.confirm(`Delete item?`)) {
      setMenu(menu.filter(i => i.id !== id));
      showToast('Item deleted.');
    }
  };

  const handleSaveMenuItem = (data) => {
    if (editingMenuItem) setMenu(menu.map(i => i.id === editingMenuItem.id ? { ...i, ...data } : i));
    else setMenu([{ id: Date.now(), ...data }, ...menu]);
    toggleModal('menu', false);
    showToast('Menu item saved.');
  };

  const handleSaveOrder = (data) => {
    const newOrderId = `#${1049 + orders.length}`;
    setOrders([{ id: newOrderId, ...data, status: 'Preparing', time: 'Just now', paid: false }, ...orders]);

    // Save/Update customer history if it's a delivery
    if (data.type === 'Delivery' && data.deliveryDetails) {
      const { phone, name, address } = data.deliveryDetails;
      const existingIndex = customers.findIndex(c => c.phone === phone);

      if (existingIndex !== -1) {
        // Update existing customer
        const updatedCustomers = [...customers];
        updatedCustomers[existingIndex] = {
          ...updatedCustomers[existingIndex],
          name: name, // In case name changed
          address: address,
          visits: updatedCustomers[existingIndex].visits + 1,
          last: 'Aug 29, 2026'
        };
        setCustomers(updatedCustomers);
      } else {
        // Add new customer
        setCustomers([{
          id: Date.now(),
          name,
          phone,
          address,
          email: 'No email provided',
          visits: 1,
          last: 'Aug 29, 2026',
          spent: 0,
          segment: 'New'
        }, ...customers]);
      }
    }

    toggleModal('order', false);
    setCurrentPage('orders');
    showToast(`Order ${newOrderId} created.`);
  };

  const handleStatusChange = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    showToast(`${id} updated.`);
  };

  const handleMarkPaid = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, paid: true, status: 'Completed' } : o));
    showToast(`${id} marked as paid.`);
  };

  const handleSaveStaff = (data) => {
    setStaff([...staff, { id: Date.now(), ...data, hours: 0 }]);
    toggleModal('staff', false);
    showToast('Staff added.');
  };

  const handleToggleStaff = (id) => {
    setStaff(staff.map(s => s.id === id ? { ...s, status: s.status === 'Clocked in' ? 'Scheduled' : 'Clocked in' } : s));
    showToast('Status updated.');
  };

  const handleSaveExpense = (data) => {
    setExpenses([{ id: Date.now(), date: 'Aug 29, 2026', ...data }, ...expenses]);
    toggleModal('expense', false);
    showToast('Expense recorded.');
  };

  const handleSaveStock = (data) => {
    setInventory(inventory.map(i => i.id === data.itemId ? { ...i, onHand: i.onHand + data.amount } : i));
    toggleModal('stock', false);
    showToast('Inventory updated.');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard orders={orders} menu={menu} onNewOrder={() => toggleModal('order', true)} onNavigate={navigate} />;
      case 'menu': return <Menu menu={menu} onToggleAvailability={handleToggleAvailability} onDeleteItem={handleDeleteMenuItem} onEditItem={(item) => { setEditingMenuItem(item); toggleModal('menu', true); }} onAddItem={() => toggleModal('menu', true)} />;
      case 'orders': return <Orders orders={orders} menu={menu} onStatusChange={handleStatusChange} onNewOrder={() => toggleModal('order', true)} />;
      case 'billing': return <Billing orders={orders} menu={menu} onMarkPaid={handleMarkPaid} />;
      case 'inventory': return <Inventory inventory={inventory} onOpenStockModal={(id) => toggleModal('stock', true, id)} />;
      case 'staff': return <Staff staff={staff} onToggleStaff={handleToggleStaff} onAddStaff={() => toggleModal('staff', true)} />;
      case 'expenses': return <Expenses expenses={expenses} onAddExpense={() => toggleModal('expense', true)} />;
      case 'settings': return <Settings activeRole={activeRole} onChangeRole={setActiveRole} />;
      default: return null;
    }
  };

  const navigate = (page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  if (showWelcome) {
    return <Welcome onEnter={() => setShowWelcome(false)} />;
  }

  return (
    <div className="app">
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <Sidebar currentPage={currentPage} onPageChange={navigate} isOpen={isSidebarOpen} />
      <main className="main">
        <Topbar title={title} subtitle={subtitle} onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="content">
          {renderContent()}
        </div>
      </main>
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.message}</div>

      <MenuModal isOpen={modals.menu} onClose={() => toggleModal('menu', false)} onSave={handleSaveMenuItem} editingItem={editingMenuItem} />
      <OrderModal isOpen={modals.order} onClose={() => toggleModal('order', false)} onSave={handleSaveOrder} menu={menu} customers={customers} />
      <StaffModal isOpen={modals.staff} onClose={() => toggleModal('staff', false)} onSave={handleSaveStaff} />
      <ExpenseModal isOpen={modals.expense} onClose={() => toggleModal('expense', false)} onSave={handleSaveExpense} />
      <StockModal isOpen={modals.stock} onClose={() => toggleModal('stock', false)} onSave={handleSaveStock} inventory={inventory} initialItemId={stockInitialItemId} />
    </div>
  );
}
