import React, { useState, useEffect } from 'react';
import { artists, soulquariansInfo } from './data/soulquariansInfo.js';
import ArtistDetailView from './ArtistDetailView';
import ArtistGrid from './components/ArtistGrid';
// import SectionNavigation from './components/SectionNavigation';
import { ChevronDown } from 'lucide-react';

export default function ArtistHub() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [activeSection, setActiveSection] = useState('movement');
  
  const sections = ['movement', 'history', 'style', 'impact', 'artists'];

  useEffect(() => {
    if (selectedArtist) return; // Don't handle scrolling when viewing artist details
    
    // THIS CODE HANDLES THE SMOOTH SCROLL WHICH NEEDS TO BE FIXED
    
    // const handleScroll = () => {
    //   const scrollPosition = window.scrollY;
    //   const windowHeight = window.innerHeight;
    //   const currentSection = Math.round(scrollPosition / windowHeight);
    //   setActiveSection(sections[currentSection]);
    // };

    // const handleWheel = (e) => {
    //   e.preventDefault();
    //   const direction = e.deltaY > 0 ? 1 : -1;
    //   const currentIndex = sections.indexOf(activeSection);
    //   const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
    //   const nextSection = sections[nextIndex];
      
    //   document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
    //   setActiveSection(nextSection);
    // };

    // const container = document.getElementById('artist-hub-container');
    // if (container) {
    //   container.addEventListener('wheel', handleWheel, { passive: false });
    //   window.addEventListener('scroll', handleScroll);
    // }

    // return () => {
    //   if (container) {
    //     container.removeEventListener('wheel', handleWheel);
    //     window.removeEventListener('scroll', handleScroll);
    //   }
    // };
  }, 
  
  [activeSection, selectedArtist]);

  if (selectedArtist) {
    return (
      <ArtistDetailView 
        artist={selectedArtist} 
        onBack={() => setSelectedArtist(null)} 
      />
    );
  }

  const scrollToSection = (section) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };
 
  return (
    <div id="artist-hub-container" className="min-h-screen snap-y snap-mandatory overflow-x-hidden bg-[#f5f5dc]">
     


      {/* The Movement Section */}
      <section id="movement" className=" snap-start relative ">
        <div className="relative z-10 container mx-auto px-20 h-screen flex items-center ">
  
            <div className="grid grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <h1 className="text-7xl font-bold mb-8 text-[#a1071e]">The Movement </h1>
              <button 
               onClick={() => scrollToSection('history')}
               className="my-8 flex items-center"
               aria-label="Explore more about the movement"
              >
              <span className="mr-2 text-black">Explore More</span>
              <ChevronDown className="animate-bounce text-primary" />
              </button>

              <p className="text-l leading-relaxed text-[#005b4c]">
              Did you know the name  {soulquariansInfo.sections[0].content}
              </p>
            
            </div>
          
          <img 
            src="public/Pictures/Group photos/bwgroup.png"
            alt="The Soulquarians"
            className="w-max h-max object-cover border-2 border-[#a1071e] rounded-lg"/>        
            
          </div>
        </div>
      </section>
                  {/* Divider */}
       <div className="border-2 border-[#a1071e] mx-auto max-w-7xl"></div>


      {/* History Section */}
<section id="history" className="snap-start ">
  <div className="container mx-auto px-20 pt-10 pb-24 flex flex-col gap-12">
    {/* Text Content */}
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-5xl font-bold mb-8 text-[#a1071e]">History</h2>
      </div>
      <div className="relative">
        <p className="text-lg leading-relaxed text-black">
          {soulquariansInfo.sections[1].content}
        </p>
      </div>
    </div>

    {/* Full-Width Image */}
    <div className="w-full h-[80vh] relative">
      <img 
        src="public/Pictures/Group photos/bwgroup.png" 
        alt="Soulquarians History"
        className="w-full h-full object-cover"
      />
      {/* Optional Overlay for Text */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-6xl font-bold text-white">A Legacy of Sound</h2>
      </div>
    </div>
  </div>
   {/* 3 Text Column Content */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center mx-auto max-w-6xl mb-12">
   <p className="text-lg leading-relaxed text-black"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium malesuada est. Fusce vitae faucibus. </p>
   <p className="text-lg leading-relaxed text-black"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium malesuada est. Fusce vitae faucibus. </p>
   <p className="text-lg leading-relaxed text-black"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium malesuada est. Fusce vitae faucibus. </p>
    </div>
</section>

     {/* Divider */}
     <div className="border-2 border-[#a1071e] mx-auto max-w-7xl"></div>
  
      {/* Musical Style Section */}
      <section id="style" className="snap-start py-20 ">
        <div className="container mx-auto px-20 h-max flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* <div className="order-2 lg:order-1 relative">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80"
                alt="Music Equipment"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            </div> */}
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-bold mb-8 text-[#a1071e]">Musical Style</h2>
              <p className="text-lg leading-relaxed text-black">
                {soulquariansInfo.sections[2].content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Impact Section */}
      <section id="impact" className="h-80 snap-start py-20 ">
        <div className="container mx-auto px-20 h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 text-[#a1071e]">Cultural Impact</h2>
              <p className="text-lg leading-relaxed text-black">
                {soulquariansInfo.sections[3].content}
              </p>
            </div>


          </div>
        </div>
      </section>

      {/* Artists Grid Section */}
      <section id="artists" className="snap-start py-20 ">
        <div className="container mx-auto px-20 h-screen flex flex-col justify-center">
          <h2 className="text-5xl font-bold mb-12 text-[#a1071e]">The Artists</h2>
          <ArtistGrid artists={artists} onArtistClick={setSelectedArtist} />
        </div>
      </section>
    </div>
  );
}