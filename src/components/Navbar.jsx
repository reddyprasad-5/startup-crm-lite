import { Bell, User, Menu } from 'lucide-react';
import DarkModeToggle from './common/DarkModeToggle';

export default function Navbar({ onMenuToggle, pageTitle }) {
  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-200/50 dark:border-slate-800/50 px-4 md:px-6 py-3 md:py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onMenuToggle}
            className="md:hidden min-h-11 min-w-11 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {pageTitle && (
            <h1 className="md:hidden text-base font-semibold text-slate-900 dark:text-white truncate">
              {pageTitle}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-3 ml-auto">
          <DarkModeToggle />

          <button
            type="button"
            className="relative min-h-11 min-w-11 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <button
            type="button"
            className="min-h-11 min-w-11 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:ring-2 hover:ring-indigo-500/50 transition-all"
            aria-label="User profile"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
