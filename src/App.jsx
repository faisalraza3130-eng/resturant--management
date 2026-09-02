// MuRsHiD KhAnA - Operational Dashboard (v1.1.0)
import React, { useState, useEffect } from 'react';
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
import AlertModal from './components/AlertModal';
import HistoryModal from './components/HistoryModal';
import ConfirmationModal from './components/ConfirmationModal';
import { App as CapacitorApp } from '@capacitor/app';

import {
  getFormattedDate, getFormattedTime, getISODate
} from './utils';

import {
  initialMenu, initialOrders, initialInventory,
  initialCustomers, initialExpenses, initialStaff
} from './data';

const pageInfo = {
  dashboard: { title: 'Dashboard', subtitle: 'MuRsHiD KhAnA Overview' },
  menu: { title: 'Menu', subtitle: 'MuRsHiD KhAnA Menu' },
  orders: { title: 'Orders', subtitle: 'Active Orders' },
  billing: { title: 'Billing', subtitle: 'Payments & Receipts' },
  inventory: { title: 'Inventory', subtitle: 'Stock Control' },
  expenses: { title: 'Expenses', subtitle: 'Stall Expenses' },
  staff: { title: 'Staff', subtitle: 'Team MuRsHiD KhAnA' },
  settings: { title: 'Settings & access', subtitle: 'Workspace Controls' },
};

export default function App() {
  const getStoredData = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`mk_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const [showWelcome, setShowWelcome] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [menu, setMenu] = useState(() => getStoredData('menu', initialMenu));
  const [orders, setOrders] = useState(() => getStoredData('orders', initialOrders));
  const [allOrders, setAllOrders] = useState(() => getStoredData('allOrders', initialOrders));
  const [currentBusinessDate, setCurrentBusinessDate] = useState(() => getStoredData('businessDate', getISODate()));
  const [inventory, setInventory] = useState(() => getStoredData('inventory', initialInventory));
  const [customers, setCustomers] = useState(() => getStoredData('customers', initialCustomers));
  const [expenses, setExpenses] = useState(() => getStoredData('expenses', initialExpenses));
  const [staff, setStaff] = useState(() => getStoredData('staff', initialStaff));
  const [activeRole, setActiveRole] = useState('Manager');

  useEffect(() => {
    localStorage.setItem('mk_menu', JSON.stringify(menu));
    localStorage.setItem('mk_orders', JSON.stringify(orders));
    localStorage.setItem('mk_allOrders', JSON.stringify(allOrders));
    localStorage.setItem('mk_businessDate', JSON.stringify(currentBusinessDate));
    localStorage.setItem('mk_inventory', JSON.stringify(inventory));
    localStorage.setItem('mk_customers', JSON.stringify(customers));
    localStorage.setItem('mk_expenses', JSON.stringify(expenses));
    localStorage.setItem('mk_staff', JSON.stringify(staff));
  }, [menu, orders, allOrders, currentBusinessDate, inventory, customers, expenses, staff]);

  const [toast, setToast] = useState({ show: false, message: '' });
  const [alert, setAlert] = useState({ show: false, title: '', message: '' });
  const [showExitModal, setShowExitModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const backListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      // Sub-page logic
      if (navigationHistory.length > 0) {
        handleBack();
      }
      // Dashboard logic
      else if (currentPage === 'dashboard') {
        setShowExitModal(true);
      }
    });

    return () => {
      backListener.then(l => l.remove());
    };
  }, [navigationHistory, currentPage]);

  const normalizeLabel = (label) => {
    return label
      .toLowerCase()
      .replace(/^table\s*/, '') // Remove "table " from start
      .replace(/^0+/, '')       // Remove leading zeros (e.g., "01" -> "1")
      .trim();
  };

  // Modal State
  const [modals, setModals] = useState({
    menu: false,
    order: false,
    staff: false,
    expense: false,
    stock: false,
    history: false
  });
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [stockInitialItemId, setStockInitialItemId] = useState(null);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2600);
  };

  const toggleModal = (modal, isOpen, data = null) => {
    setModals(prev => ({ ...prev, [modal]: isOpen }));
    if (modal === 'menu' && !isOpen) setEditingMenuItem(null);
    if (modal === 'order') {
      if (!isOpen) setEditingOrder(null);
      else if (data) setEditingOrder(data);
    }
    if (modal === 'stock' && isOpen) setStockInitialItemId(data);
  };

  const todayDisplay = getFormattedDate();
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
    // Validation: Check if table is occupied (only for Dine-in)
    if (data.type === 'Dine-in') {
      const activeOrder = orders.find(o =>
        normalizeLabel(o.label) === normalizeLabel(data.label) &&
        o.status !== 'Completed' &&
        o.status !== 'Cancelled' &&
        (!editingOrder || o.id !== editingOrder.id)
      );

      if (activeOrder) {
        setAlert({
          show: true,
          title: "Table Occupied!",
          message: `${data.label} is currently occupied with an active order (#${activeOrder.id}). Please complete or cancel the existing order before starting a new one.`
        });
        return;
      }
    }

    if (editingOrder) {
      // Update existing order
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...o, ...data } : o));
      showToast(`Order ${editingOrder.id} updated.`);
    } else {
      // Create new order
      const newOrderId = `#${String(orders.length + 1).padStart(2, '0')}`;
      const today = getISODate();
      const now = getFormattedTime();
      const newOrder = {
        id: newOrderId,
        ...data,
        date: today,
        businessDate: currentBusinessDate,
        status: 'Preparing',
        time: now,
        paid: false
      };

      setOrders([newOrder, ...orders]);
      setAllOrders([newOrder, ...allOrders]);
      showToast(`Order ${newOrderId} created.`);
    }

    // Save/Update customer history if it's a delivery
    if (data.type === 'Delivery' && data.deliveryDetails) {
      const { phone, name, address } = data.deliveryDetails;
      const existingIndex = customers.findIndex(c => c.phone === phone);

      if (existingIndex !== -1) {
        // Update existing customer
        const updatedCustomers = [...customers];
        updatedCustomers[existingIndex] = {
          ...updatedCustomers[existingIndex],
          name: name,
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

  const resetData = () => {
    if (window.confirm('Reset all application data? This will clear all orders and restore default settings.')) {
      setMenu(initialMenu);
      setOrders([]);
      setAllOrders([]);
      setCurrentBusinessDate(getISODate());
      setInventory(initialInventory);
      setCustomers(initialCustomers);
      setExpenses(initialExpenses);
      setStaff(initialStaff);
      showToast('System data reset to defaults.');
    }
  };

  const handleStartNewDay = () => {
    setShowResetConfirm(true);
  };

  const executeStartNewDay = () => {
    // Sync any missing orders to allOrders just in case
    const updatedAll = [...allOrders];
    orders.forEach(o => {
      if (!updatedAll.find(ao => ao.id === o.id && ao.date === o.date)) {
        updatedAll.push(o);
      }
    });

    setAllOrders(updatedAll);
    setOrders([]); // Clear active orders
    setExpenses([]); // Clear active expenses
    setCurrentBusinessDate(getISODate());
    setShowResetConfirm(false);
    showToast(`Shift ended. New Business Day: ${getISODate()}`);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard orders={orders} menu={menu} onNewOrder={() => toggleModal('order', true)} onNavigate={navigate} currentBusinessDate={currentBusinessDate} />;
      case 'menu': return <Menu menu={menu} onToggleAvailability={handleToggleAvailability} onDeleteItem={handleDeleteMenuItem} onEditItem={(item) => { setEditingMenuItem(item); toggleModal('menu', true); }} onAddItem={() => toggleModal('menu', true)} />;
      case 'orders': return <Orders orders={orders} menu={menu} onStatusChange={handleStatusChange} onNewOrder={() => toggleModal('order', true)} onEditOrder={(order) => toggleModal('order', true, order)} onOpenHistory={() => toggleModal('history', true)} />;
      case 'billing': return <Billing orders={orders} menu={menu} onMarkPaid={handleMarkPaid} />;
      case 'inventory': return <Inventory inventory={inventory} onOpenStockModal={(id) => toggleModal('stock', true, id)} />;
      case 'staff': return <Staff staff={staff} onToggleStaff={handleToggleStaff} onAddStaff={() => toggleModal('staff', true)} />;
      case 'expenses': return <Expenses expenses={expenses} onAddExpense={() => toggleModal('expense', true)} />;
      case 'settings': return <Settings activeRole={activeRole} onChangeRole={setActiveRole} onResetData={resetData} />;
      default: return null;
    }
  };

  const navigate = (page) => {
    if (page !== currentPage) {
      setNavigationHistory(prev => [...prev, currentPage]);
      setCurrentPage(page);
    }
    setIsSidebarOpen(false);
  };

  const handleBack = () => {
    if (navigationHistory.length > 0) {
      const prevPage = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentPage(prevPage);
    } else if (currentPage !== 'dashboard') {
      setCurrentPage('dashboard');
    }
  };

  if (showWelcome) {
    return <Welcome onEnter={() => setShowWelcome(false)} />;
  }

  return (
    <div className="app">
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <Sidebar currentPage={currentPage} onPageChange={navigate} isOpen={isSidebarOpen} onStartNewDay={handleStartNewDay} />
      <main className="main">
        <Topbar
          title={title}
          subtitle={`${todayDisplay} · ${subtitle}`}
          onMenuClick={() => setIsSidebarOpen(true)}
          showBack={navigationHistory.length > 0}
          onBack={handleBack}
        />
        <div className="content">
          {renderContent()}
        </div>
      </main>
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.message}</div>

      <MenuModal isOpen={modals.menu} onClose={() => toggleModal('menu', false)} onSave={handleSaveMenuItem} editingItem={editingMenuItem} />
      <OrderModal isOpen={modals.order} onClose={() => toggleModal('order', false)} onSave={handleSaveOrder} menu={menu} customers={customers} editingOrder={editingOrder} />
      <StaffModal isOpen={modals.staff} onClose={() => toggleModal('staff', false)} onSave={handleSaveStaff} />
      <ExpenseModal isOpen={modals.expense} onClose={() => toggleModal('expense', false)} onSave={handleSaveExpense} />
      <StockModal isOpen={modals.stock} onClose={() => toggleModal('stock', false)} onSave={handleSaveStock} inventory={inventory} initialItemId={stockInitialItemId} />
      <HistoryModal isOpen={modals.history} onClose={() => toggleModal('history', false)} orders={allOrders} menu={menu} />
      <AlertModal
        isOpen={alert.show}
        onClose={() => setAlert({ ...alert, show: false })}
        title={alert.title}
        message={alert.message}
      />
      <ConfirmationModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={() => CapacitorApp.exitApp()}
        title="Exit App"
        message="Do you want to exit this app?"
      />
      <ConfirmationModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={executeStartNewDay}
        title="End Current Shift?"
        message={`This will archive all orders for ${currentBusinessDate} and reset your dashboard. This action cannot be undone.`}
      />
    </div>
  );
}
