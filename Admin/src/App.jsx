import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLogin from './pages/Admin/AdminLogin';
import Admin1 from './pages/Admin/Admin1';

const App = () => {
  useEffect(() => {
    const storedToken = localStorage.getItem('auto-token');
    if (!storedToken) {
      console.log("Token not found in localStorage.");
      // Redirect user to admin login page if token doesn't exist
      // You may replace the console.log with a redirection logic
    }
  }, []);

  const storedToken = localStorage.getItem('auto-token');

  return (
    <div>
      <Routes>
        {/* Route to AdminLogin if no token exists */}
        {!storedToken && <Route path='*' element={<AdminLogin />} />}
        
        {/* Route to Admin1 if token exists */}
        {storedToken && <Route path='*' element={<Admin1 />} />}
        
        {/* Define other routes as needed */}
        {/* <Route path='/other-route' element={<OtherComponent />} /> */}
        
        {/* Redirect all other paths to Admin1 or AdminLogin */}
        <Route path='*' element={<Navigate to={storedToken ? "/admin1" : "/adminlogin"} />} />
      </Routes>
    </div>
  );
};

export default App;
