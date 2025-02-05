import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistraVoli from './pages/RegistraVoli';
import Alberghi from './pages/Alberghi';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <div className="container mx-auto px-4 py-8">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/registra-voli" element={<RegistraVoli />} />
                      <Route path="/alberghi" element={<Alberghi />} />
                    </Routes>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
