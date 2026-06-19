import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-5xl font-bold text-red-500 dark:text-red-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Page Not Found</h2>
      <Link to="/" className="text-blue-500 hover:underline">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
