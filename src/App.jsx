import React, { useState, useCallback } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import MobileNavDrawer from './components/MobileNavDrawer';
import AppRoutes from './routes';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/leads': 'Leads',
  '/analytics': 'Analytics',
};

const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || 'CRM Lite';

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar onMenuToggle={toggleMenu} pageTitle={pageTitle} />
        <main className="flex-1 overflow-y-auto relative pb-16 md:pb-0">
          <AppRoutes />
        </main>
      </div>

      <MobileBottomNav />
      <MobileNavDrawer isOpen={mobileMenuOpen} onClose={closeMenu} />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
