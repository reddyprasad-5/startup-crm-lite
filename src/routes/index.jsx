// Import React and standard hooks/utilities
import React, { lazy, Suspense } from 'react';
// Import routing components from React Router DOM v6
import { Routes, Route } from 'react-router-dom';

// Use React.lazy to dynamically import components for code-splitting
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Define the main AppRoutes component
const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading page...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
