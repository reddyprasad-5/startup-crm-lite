// Import NavLink from react-router-dom to handle active route linking and route changes
import { NavLink } from 'react-router-dom';
// Import beautiful icon vectors from lucide-react
import { LayoutDashboard, Users2, BarChart2, Lightbulb, Bell, User } from 'lucide-react';

// Define the Navbar functional component
export default function Navbar() {
  // Define standard styling classes for navigation links
  const baseLinkStyle = "flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200";
  
  // Define active link classes
  const activeLinkStyle = "text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm border-b-2 border-indigo-500/80";
  
  // Define inactive link classes
  const inactiveLinkStyle = "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/40";

  // Render the header layout
  return (
    // Sticky outer container with glassmorphic classes (glass-panel is defined in index.css)
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4">
      {/* Centered container keeping content bound within standard width limits */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo area linking to dashboard home */}
        <NavLink to="/" className="flex items-center gap-2.5 text-slate-900 dark:text-white hover:opacity-90 transition-opacity no-underline">
          {/* Logo badge with purple/indigo gradient */}
          <div className="flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-2 text-white shadow-md shadow-indigo-500/20">
            <Lightbulb className="h-5 w-5 animate-pulse" />
          </div>
          {/* Brand Name Title */}
          <span className="font-extrabold text-lg tracking-tight select-none">
            Startup CRM <span className="text-indigo-600 dark:text-indigo-400">Lite</span>
          </span>
        </NavLink>

        {/* Center: Main Navigation List */}
        <nav className="flex items-center gap-1.5">
          {/* NavLink to Dashboard Root Route (/) */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>

          {/* NavLink to Lead Management Route (/leads) */}
          <NavLink
            to="/leads"
            className={({ isActive }) =>
              `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
            }
          >
            <Users2 className="h-4 w-4" />
            <span>Leads</span>
          </NavLink>

          {/* NavLink to Analytics Route (/analytics) */}
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`
            }
          >
            <BarChart2 className="h-4 w-4" />
            <span>Analytics</span>
          </NavLink>
        </nav>

        {/* Right Side: Mock Profile & Alerts Actions */}
        <div className="flex items-center gap-3">
          {/* Bell Icon for Alerts indicator */}
          <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer">
            <Bell className="h-5 w-5" />
            {/* Red dot badge indicating mock alert notification */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>
          
          {/* User Profile Avatar block */}
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 cursor-pointer hover:ring-2 hover:ring-indigo-500/50 transition-all">
            <User className="h-5 w-5" />
          </div>
        </div>

      </div>
    </header>
  );
}
