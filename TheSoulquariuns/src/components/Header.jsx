import React from 'react';

function Header({ toggleMenu }) {
  return (
    <header className="fixed top-0 w-full h-12 text-2xl font-playfair-display tracking-wider z-40 flex items-center justify-between" id="header">    
      <div
        className="menu-icon cursor-pointer w-20 h-20 pt-3"
        onClick={toggleMenu} // Use the passed toggleMenu function
        aria-expanded="false"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 500 500" 
          className="w-full h-full fill-current hover:text-teal-600 transition-colors"
        >
          <g transform="translate(133.59798445847505,174.49149464112523)translate(116.15140845070424,75.4627307109874)rotate(0)translate(-116.15140845070424,-75.4627307109874) scale(2.639742081422218,2.639742081422218)" opacity="1">
            <path transform="translate(-5.99989255865572,-21.412561529170794)" d="M86.738,23.317c-1.112,-1.808 -3.444,-2.432 -5.312,-1.421l-16.672,9.032l-4.682,-7.61c-1.113,-1.81 -3.444,-2.434 -5.312,-1.421l-16.67,9.032l-4.682,-7.61c-1.113,-1.81 -3.445,-2.433 -5.312,-1.422l-20.001,10.834c-1.942,1.053 -2.664,3.48 -1.611,5.423c0.724,1.337 2.1,2.096 3.521,2.096c0.643,0 1.296,-0.156 1.901,-0.484l16.672,-9.031l4.682,7.61c1.113,1.81 3.444,2.436 5.312,1.421l16.671,-9.031l4.682,7.61c1.113,1.81 3.445,2.436 5.312,1.421l16.673,-9.031l4.685,7.611c1.156,1.881 3.619,2.467 5.503,1.31c1.881,-1.157 2.468,-3.621 1.31,-5.503z"/>
          </g>
        </svg>
      </div>
      <h1 className="text-center hover:text-[#a1071e] flex-grow">Soulquarians: An Almanac</h1>
      
    </header>
  );
}

export default Header;

