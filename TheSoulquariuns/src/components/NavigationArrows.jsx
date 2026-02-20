// import React from 'react';

// function NavigationArrows() {
//   const handleNavigation = (direction) => {
//     const sections = document.querySelectorAll('section');
//     const currentSection = Array.from(sections).findIndex((section) => {
//       const rect = section.getBoundingClientRect();
//       return rect.left >= 0 && rect.left <= window.innerWidth / 2;
//     });

//     const nextIndex =
//       direction === 'next'
//         ? Math.min(currentSection + 1, sections.length - 1)
//         : Math.max(currentSection - 1, 0);

//     sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <>
//       <div
//         className="swipe-button-prev z-10 text-blue-500 fixed top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center left-10"
//         onClick={() => handleNavigation('prev')}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-14 w-14"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M15 19l-7-7 7-7"
//           />
//         </svg>
//       </div>

//       <div
//         className="swipe-button-next z-10 text-blue-500 fixed top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center right-10"
//         onClick={() => handleNavigation('next')}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-14 w-14"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 5l7 7-7 7"
//           />
//         </svg>
//       </div>
//     </>
//   );
// }

// export default NavigationArrows;
