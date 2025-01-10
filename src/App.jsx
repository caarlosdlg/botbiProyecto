import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Login from './components/login';
import MainPage from './components/mainPage';
import Clients from './components/clients';
import Dashboard from './components/dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/clients" element={user ? <Clients /> : <Navigate to="/login" />} />
        <Route path="/clients/edit/:id" element={user ? <Clients /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;