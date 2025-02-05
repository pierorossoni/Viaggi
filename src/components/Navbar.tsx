import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Hotel, Home } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link
              to="/registra-voli"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/registra-voli') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Plane size={20} />
              <span>Registra Voli</span>
            </Link>
            <Link
              to="/alberghi"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/alberghi') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Hotel size={20} />
              <span>Alberghi</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
