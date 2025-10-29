// src/components/AnimatedNavbar.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Menu, X } from 'lucide-react';
import PropTypes from 'prop-types';

const AnimatedNavLink = ({ to, children, onClick }) => {
  return (
    <button
      onClick={() => onClick(to)}
      className="group relative inline-block overflow-hidden h-5 flex items-center text-sm"
    >
      <motion.div 
        className="flex flex-col"
        whileHover={{ y: "-50%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <span className="text-gray-300 px-1">{children}</span>
        <span className="text-white px-1">{children}</span>
      </motion.div>
    </button>
  );
};

AnimatedNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function AnimatedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <button
      onClick={() => handleNavigation('/')}
      className="relative flex items-center gap-2 group"
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, -20, 0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Plane className="w-5 h-5 text-[#2563EB]" />
        </motion.div>
        <div className="absolute inset-0 bg-[#2563EB] rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
      </div>
      <span className="text-lg font-medium tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        ONWINGS
      </span>
    </button>
  );

  const navLinksData = [
    { label: 'Search Flights', to: '/search' },
    { label: 'My Trips', to: '/dashboard' },
    { label: 'Explore', to: '/' },
  ];

  const loginButtonElement = (
    <button
      className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-all duration-200 w-full sm:w-auto hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
    >
      Log In
    </button>
  );

  const signupButtonElement = (
    <div className="relative group w-full sm:w-auto">
      <div className="absolute inset-0 -m-2 rounded-full hidden sm:block bg-gradient-to-r from-[#2563EB] to-[#1E40AF] opacity-40 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3" />
      <button className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white rounded-full hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-200 w-full sm:w-auto">
        Get Started
      </button>
    </div>
  );

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center pl-6 pr-6 py-3 backdrop-blur-xl ${headerShapeClass} border border-[#333] bg-[rgba(31,31,31,0.62)] shadow-[0_8px_32px_rgba(0,0,0,0.37)] w-[calc(100%-2rem)] sm:w-auto transition-[border-radius] duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">
          {logoElement}
        </div>

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.to} to={link.to} onClick={handleNavigation}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          {loginButtonElement}
          {signupButtonElement}
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <motion.div
        className="sm:hidden flex flex-col items-center w-full overflow-hidden"
        initial={{ height: 0, opacity: 0, paddingTop: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0, 
          opacity: isOpen ? 1 : 0,
          paddingTop: isOpen ? '1rem' : 0
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <button
              key={link.to}
              onClick={() => handleNavigation(link.to)}
              className="text-gray-300 hover:text-white transition-colors w-full text-center"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          {loginButtonElement}
          {signupButtonElement}
        </div>
      </motion.div>
    </motion.header>
  );
}