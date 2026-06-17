// Import React library
import React from 'react';
// Import BrowserRouter from React Router DOM to enable routing for the application
import { BrowserRouter } from 'react-router-dom';
// Import the Sidebar component to display navigation
import Sidebar from './components/Sidebar';
// Import the routes definition component
import AppRoutes from './routes';

// Define the main App component
function App() {
  // Return the main application layout
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-slate-50 text-gray-900 font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

// Export the App component as default
export default App;
