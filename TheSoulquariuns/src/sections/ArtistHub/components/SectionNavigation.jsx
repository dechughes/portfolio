// import React from 'react';

// export default function SectionNavigation({ activeSection, onSectionChange }) {
//   const NavButton = ({ section, label }) => (
//     <button
//       onClick={() => onSectionChange(section)}
//       className={`px-6 py-3 text-sm font-medium text-left transition-all w-full
//         ${activeSection === section 
//           ? 'bg-white text-black' 
//           : 'text-white hover:bg-white/10'}`}
//     >
//       {label}
//     </button>
//   );

//   return (
//     <nav className="fixed bottom-8 left-8 z-50 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
//       <div className="flex flex-col">
//         <NavButton section="movement" label="The Movement" />
//         <NavButton section="history" label="History" />
//         <NavButton section="style" label="Musical Style" />
//         <NavButton section="impact" label="Cultural Impact" />
//         <NavButton section="artists" label="Artists" />
//       </div>
//     </nav>
//   );
// }