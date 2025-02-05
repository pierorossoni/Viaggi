import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plane, Hotel, Home, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
