import React from 'react';

function HomePage() {
  return (
    
    // {/* Hero Section */}

      <section id="section-0" className="section relative min-w-full h-screen flex items-center justify-center bg-[#F2EFDE]">
        {/* Image Container */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <img
            src="public/Pictures/Group photos/dangeloandpino_large.jpg"
            alt="The Soulquarians Group"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        </div>

        {/* Text Container */}
        <div className="absolute bottom-8 left-8 lg:block hidden">
          <h1 className="text-6xl font-bold text-[#f5f5dc] font-playfair-display hover:text-white">The Soulquarians</h1>
          <div className="mt-4 max-w-md text-lg text-[#f5f5dc] font-playfair-display italic hover:text-white">
            <p>Welcome to your curated space dedicated to the Soulquarians, the collective that shaped the sound of Neo-Soul and conscious hip-hop at the turn of the millennium.</p>
            <p className="mt-2">"Music is the divine way to tell beautiful, poetic things to the heart." – Pablo Casals</p>
          </div>
        </div>

        {/* Responsive Text Container for Mobile */}
        <div className="absolute text-center  font-playfair-display px-4 sm:px-8 md:px-16 lg:hidden">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#f5f5dc] font-bold">The Soulquarians</h1>
          <div className="mt-4 text-sm sm:text-base md:text-lg text-[#f5f5dc] italic max-w-md mx-auto">
            <p>Welcome to your curated space dedicated to the Soulquarians, the collective that shaped the sound of Neo-Soul and conscious hip-hop at the turn of the millennium.</p>
            <p className="mt-2">"Music is the divine way to tell beautiful, poetic things to the heart." – Pablo Casals</p>
          </div>
        </div>

        {/* Photograph Credit */}
      {/* Desktop/Large screen photo credit */}
    <div className="absolute bottom-8 right-8 text-sm text-gray-300 lg:block hidden">
      <p>Photograph by [Photographer's Name]</p>
    </div>

      {/* Mobile/Smaller screen photo credit */}
    <div className="absolute bottom-4 right-4 text-xs sm:text-sm text-gray-300 lg:hidden">
      <p>Photograph by [Photographer's Name]</p>
    </div>

</section>    
  );
}

export default HomePage;
