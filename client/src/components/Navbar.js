import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { name: 'Tasks', icon: '✅', path: '/tasks' },
    { name: 'Notes', icon: '📝', path: '/notes' },
    { name: 'Hours', icon: '⏰', path: '/hours' },
    { name: 'Calendar', icon: '📅', path: '/calendar' },
    { name: 'Chart', icon: '📈', path: '/chart' },
    { name: 'User Profile', icon: '👤', path: '/user-profile' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md p-4">
      {/* Top Row: Logo + Hamburger */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Quick Desk
          </h2>
          <p className="text-gray-400 text-sm hidden sm:block">Your productivity hub</p>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 transition-all duration-300`}>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-2 w-full px-4 py-2 rounded-md transition ${
                    isActive ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-700 hover:text-blue-300'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Menu */}
      <nav className="hidden md:flex md:items-center md:justify-between mt-4">
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                    isActive ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-700 hover:text-blue-300'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Progress Bar */}
        <div className="hidden lg:flex items-center space-x-2">
          <div className="text-sm text-gray-300">Today's Progress</div>
          <div className="w-40 bg-gray-600 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2" style={{ width: '68%' }}></div>
          </div>
          <div className="text-xs text-gray-400">68%</div>
        </div>
      </nav>
    </header>
  );
}
