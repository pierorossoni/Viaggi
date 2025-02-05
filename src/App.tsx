import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistraVoli from './pages/RegistraVoli';
import Alberghi from './pages/Alberghi';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
