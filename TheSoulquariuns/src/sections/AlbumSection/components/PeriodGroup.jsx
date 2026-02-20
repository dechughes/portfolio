import React, { useRef } from 'react';
import AlbumCard from './AlbumCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PeriodGroup({ 
  id,
  period, 
  albums = [], 
  onAlbumClick,
  isActive
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      id={id}
      className="min-h-screen snap-start relative py-20 transition-opacity duration-500"
    >
      <div className="absolute inset-0">
        <img
          src={period.bgImage}
          alt={period.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#f5f5dc]" />
      </div>

      <div className="relative z-10 container mx-auto px-20">
        <div className="mb-12 max-w-4xl">
          <h2 className="text-5xl font-bold text-[#005b4c] mb-4">{period.title}</h2>
          <p className="text-2xl text-black mb-2">{period.years}</p>
          <p className="text-xl text-black">{period.description}</p>
        </div>

        <div className="relative group mx-8 lg:mx-16">
          {/* Scroll Buttons - Only visible on desktop */}
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 
              w-12 h-12 items-center justify-center rounded-full bg-[#005b4c] text-white 
              hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 
              w-12 h-12 items-center justify-center rounded-full bg-[#005b4c] text-white 
              hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Album Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory
              scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/20
              hover:scrollbar-thumb-white/30 md:grid md:grid-cols-2 lg:flex lg:grid-cols-none
              overscroll-contain"
            style={{
              scrollbarGutter: 'stable',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
              scrollPadding: '0 24px'
            }}
          >
            {/* Add padding elements at start and end to prevent overscroll */}
            <div className="flex-none w-4 lg:hidden" aria-hidden="true" />
            
            {albums.map((album, index) => (
              album?.quickFacts ? (
                <div
                  key={`${album.quickFacts.title}-${index}`}
                  className="flex-none w-[280px] snap-start transform hover:scale-105 
                    transition-transform duration-300 md:w-full lg:w-[280px]"
                >
                  <AlbumCard 
                    album={album}
                    onClick={onAlbumClick}
                  />
                </div>
              ) : (
                <div 
                  key={index}
                  className="flex-none w-[280px] snap-start md:w-full lg:w-[280px] 
                    bg-red-500/10 rounded-lg p-4"
                >
                  <p className="text-red-400">Invalid album data</p>
                </div>
              )
            ))}
            
            {/* Add padding elements at start and end to prevent overscroll */}
            <div className="flex-none w-4 lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}