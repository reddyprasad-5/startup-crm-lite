import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants/navigation';

const MobileBottomNav = () => {
  const linkClasses = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-0.5 flex-1 min-h-11 min-w-11 py-2 transition-colors ${
      isActive
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
    }`;

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
      aria-label="Main navigation"
    >
      <div className="flex items-stretch justify-around h-16 max-w-lg mx-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClasses} aria-label={label}>
            <Icon className="h-6 w-6" strokeWidth={2} />
            <span className="sr-only">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
