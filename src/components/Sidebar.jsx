import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants/navigation';

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 min-h-11 rounded-xl mb-1 transition-colors duration-200 ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-800/80 hover:text-white'
    }`;

  return (
    <aside className="hidden md:flex flex-col shrink-0 w-56 lg:w-72 bg-slate-900 dark:bg-slate-950 border-r border-slate-800 h-screen transition-colors duration-200">
      <div className="p-4 lg:p-6 border-b border-slate-800">
        <h2 className="text-xl lg:text-2xl font-bold text-white text-center lg:text-left">
          CRM Lite
        </h2>
        <p className="hidden lg:block text-xs text-slate-400 mt-1">Startup Sales Platform</p>
      </div>

      <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
        {NAV_ITEMS.map(({ to, label, sublabel, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClasses}>
            <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
            <div className="min-w-0">
              <span className="text-sm font-medium block truncate">{label}</span>
              <span className="hidden lg:block text-xs text-slate-400 truncate">{sublabel}</span>
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="hidden lg:block p-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">© 2026 CRM Lite</p>
      </div>
    </aside>
  );
};

export default Sidebar;
