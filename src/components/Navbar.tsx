'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Image src="/logo.svg" alt="Nike" width={60} height={22} className="invert-100" />
          
          <div className="hidden md:flex items-center space-x-12">
            {['Men', 'Women', 'Kids', 'Collections', 'Contact'].map((item) => (
              <a key={item} href="#" className="text-dark-900 hover:text-dark-700 text-[16px] font-normal">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button className="text-dark-900 text-[16px] font-normal">Search</button>
            <button className="text-dark-900 text-[16px] font-normal">My Cart (2)</button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-light-300 py-3">
            {['Men', 'Women', 'Kids', 'Collections', 'Contact', 'Search', 'My Cart (2)'].map((item) => (
              <a key={item} href="#" className="block px-3 py-2 text-dark-900">
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
