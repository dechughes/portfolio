import React, { useState, useEffect } from 'react';
import { albumsByYear } from './data/albumsByYear';
import AlbumDetailView from './components/AlbumDetailView';
import PeriodGroup from './components/PeriodGroup';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const PERIODS = [
  {
    id: 'foundation',
    title: 'Foundation Period',
    years: '1995-1998',
    description: 'The formative years that laid the groundwork for the Soulquarians collective, marked by early collaborations and experimental sounds.',
    bgImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80'
  },
  {
    id: 'core',
    title: 'Core Soulquarians Era',
    years: '1999-2001',
    description: 'The golden age of the collective, characterized by groundbreaking albums and the peak of their collaborative spirit.',
    bgImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80'
  },
  {
    id: 'legacy',
    title: 'Late Period & Legacy',
    years: '2002-2006',
    description: 'The evolution and diversification of the Soulquarians sound, influencing a new generation of artists.',
    bgImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80'
  }
];

export default function AlbumSection() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [activePeriod, setActivePeriod] = useState('foundation');

  const getAlbumsByPeriod = (periodId) => {
    const yearRanges = {
      foundation: [1995, 1998],
      core: [1999, 2001],
      legacy: [2002, 2006]
    };

    const [startYear, endYear] = yearRanges[periodId];
    return albumsByYear
      .filter(yearGroup => yearGroup.year >= startYear && yearGroup.year <= endYear)
      .flatMap(yearGroup => yearGroup.releases);
  };

  const scrollToPeriod = (periodId) => {
    document.getElementById(periodId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = PERIODS.map(period => ({
        id: period.id,
        element: document.getElementById(period.id)
      }));

      const currentSection = sections.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (currentSection) {
        setActivePeriod(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen snap-y snap-mandatory overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen snap-start relative flex items-center">
        <div className="absolute inset-0 bg-[#f5f5dc]">

        </div>
        
        <div className="relative z-10 container mx-auto px-20 ">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold text-[#005b4c] mb-8">The Discography</h1>
            <p className="text-xl text-black mb-12">
              Journey through the revolutionary albums that defined an era, 
              showcasing the collective genius of the Soulquarians movement.
            </p>
            <div className="flex flex-wrap gap-4">
              {PERIODS.map((period) => (
                <button
                  key={period.id}
                  onClick={() => scrollToPeriod(period.id)}
                  className={`px-6 py-3 rounded-full transition-colors
                    ${activePeriod === period.id 
                      ? 'bg-white text-[#005b4c]' 
                      : 'bg-[#005b4c] text-white hover:bg-[#005b4c]/20'}`}
                >
                  {period.title}
                </button>
              ))}
            </div>
            <button 
              onClick={() => scrollToPeriod('foundation')}
              className="mt-12 flex items-center text-black hover:text-[#005b4c]"
            >
              <span className="mr-2">Explore Albums</span>
              <ChevronDown className="animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* Period Sections */}
      {PERIODS.map((period) => (
        <PeriodGroup
          key={period.id}
          id={period.id}
          period={period}
          albums={getAlbumsByPeriod(period.id)}
          onAlbumClick={setSelectedAlbum}
          isActive={activePeriod === period.id}
        />
      ))}

      {selectedAlbum && (
        <AlbumDetailView 
          album={selectedAlbum} 
          onBack={() => setSelectedAlbum(null)} 
        />
      )}
    </div>
  );
}