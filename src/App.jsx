// App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SubscriptionPage from './Pages/SubscriptionPage';

const App = () => {
  const [user, setUser] = useState(null); // State to manage user info
  const [packageDetails, setPackageDetails] = useState(null); // State to manage package details

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} setUser={setUser} packageDetails={packageDetails} />} />
        <Route path="/subscribe" element={<SubscriptionPage setPackageDetails={setPackageDetails} />} />
      </Routes>
    </Router>
  );
};

export default App;
