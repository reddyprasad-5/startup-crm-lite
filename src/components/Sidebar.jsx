// Import React library
import React from 'react';
// Import NavLink from React Router DOM to enable active link styling
import { NavLink } from 'react-router-dom';

// Define the Sidebar component
const Sidebar = () => {
  // Define a helper function to dynamically apply Tailwind classes based on active state
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded mb-2 transition-colors duration-200 ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-300 hover:bg-gray-800'
    }`;

  return (
    <div className="w-64 bg-gray-900 h-screen p-4 text-white flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-center border-b border-gray-700 pb-4">
        CRM Lite
      </h2>
      <nav className="flex-1">
        <NavLink to="/" end className={linkClasses}>
          Dashboard
        </NavLink>
        <NavLink to="/leads" className={linkClasses}>
          Lead Management
        </NavLink>
        <NavLink to="/analytics" className={linkClasses}>
          Analytics
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
