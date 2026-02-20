import React from 'react';

function SideNav({ isSideNavOpen }) {
  return (
    <div
      id="side-nav"
      className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white transform transition-transform duration-300 z-30 ${
        isSideNavOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <ul className="mt-10 space-y-4 p-4">
        <li><a href="section-0" onClick={(e) => { e.preventDefault(); document.getElementById('section-0').scrollIntoView({ behavior: 'smooth' }); }}>Home</a> </li>
        <li><a href="#Artist" className="hover:text-rose-400">Artists</a></li>
        <li><a href="#Music" className="hover:text-rose-400">Music</a></li>
        <li><a href="#Merch" className="hover:text-rose-400">Merch</a></li>
        <li><a href="#Footer" className="hover:text-rose-400">About</a></li>
      </ul>
    </div>
  );
}

export default SideNav;


