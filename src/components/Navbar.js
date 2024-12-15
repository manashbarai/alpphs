import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <nav className="bg-[#5b2a29] border-b shadow-sm text-white">
      <div className="container mx-auto px-2 lg:px-20 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-semibold ml-2">Results</NavLink>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
          <NavLink to="/vip" className=" font-semibold hover:scale-105">VIP Numbers</NavLink>
            <NavLink to="/commonnumber" className=" font-semibold hover:scale-105 transition-all duration-100 text-white">Common Numbers</NavLink>
            <NavLink to="/history" className=" font-semibold hover:scale-105 transition-all duration-100 text-white">Result History</NavLink>
            <NavLink to="/club" className=" font-semibold hover:scale-105 transition-all duration-100 text-white">Club Chart</NavLink>
            <NavLink to="/blog" className=" font-semibold hover:scale-105 transition-all duration-100 text-white"> Blog</NavLink>
           
            {/* <NavLink to="/login" className="bg-zinc-600 py-2 px-5 rounded text-white font-semibold hover:scale-105 transition-all duration-100 text-white">Login</NavLink> */}

          </div>
          <div className="md:hidden">
            <button className=" hover:scale-105 transition-all duration-100 text-white" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#5b2a29] border-t">
          <ul className="p-4">
            <li className="py-2"><NavLink to="/vip" className=" hover:scale-105 transition-all duration-100 text-white">VIP Numbers</NavLink></li>
            <li className="py-2"><NavLink to="/commonnumber" className=" hover:scale-105 transition-all duration-100 text-white">Common Numbers</NavLink></li>
            <li className="py-2"><NavLink to="/history" className=" hover:scale-105 transition-all duration-100 text-white">Result History</NavLink></li>
            <li className="py-2"><NavLink to="/club" className=" hover:scale-105 transition-all duration-100 text-white">Club Chart</NavLink></li>
            <li className="py-2"><NavLink to="/blog" className=" hover:scale-105 transition-all duration-100 text-white">Blog</NavLink></li>
     
          </ul>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;