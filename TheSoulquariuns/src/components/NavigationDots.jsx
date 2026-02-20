import React, { useState, useEffect } from 'react';
import { HomeIcon, UserIcon, MusicNoteIcon, ChatIcon, InformationCircleIcon } from '@heroicons/react/solid';

const icons = [
  { component: HomeIcon, label: "Home", hoverColor: "text-red-500" }, // Custom hover colour
  { component: UserIcon, label: "Artist", hoverColor: "text-blue-500" },
  { component: MusicNoteIcon, label: "Music", hoverColor: "text-green-500" },
  { component: ChatIcon, label: "Merch", hoverColor: "text-yellow-500" },
  { component: InformationCircleIcon, label: "Footer", hoverColor: "text-purple-500" }
];

function NavigationIcons() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const height = window.innerHeight;
      const index = Math.round(scrollY / height);
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIconClick = (index) => {
    const section = document.getElementById(`section-${index}`);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 w-full flex justify-center z-50">
      <div className="flex space-x-4 md:space-x-8 px-3 py-1 bg-black bg-opacity-50 rounded-full">
        {icons.map(({ component: Icon, label, hoverColor }, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* CTA Tooltip */}
            {hoverIndex === index && (
              <div className="absolute bottom-10 md:bottom-14 bg-white text-black px-2 py-1 rounded-lg text-xs md:text-sm">
                {label}
              </div>
            )}

            {/* Icon Button */}
            <button
              onClick={() => handleIconClick(index)}
              className={`p-2 md:p-3 rounded-full transition-all ${
                activeIndex === index ? 'scale-110' : ''
              } hover:scale-125`}
              aria-label={label}
            >
              <Icon
                className={`w-6 h-6 md:w-8 md:h-8 text-gray-400 transition-all duration-200 ${
                  hoverIndex === index ? hoverColor : ''
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavigationIcons;
