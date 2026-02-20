import React, { useState } from 'react'; // Import useState
import Header from './components/Header';
import SideNav from './components/SideNav';
import NavigationDots from './components/NavigationDots';
// import NavigationArrows from './components/NavigationArrows';
import HomePage from './sections/HomePage';
import ArtistHub from './sections/ArtistHub/ArtistHub';
import AlbumSection from './sections/AlbumSection/AlbumSection';
import ElectricLadyStudios from './sections/ElectricLadyStudios';
import Footer from './sections/Footer';

function App() {
  // Add state to control SideNav visibility
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Function to toggle SideNav visibility
  const toggleMenu = () => {
    setIsSideNavOpen((prevState) => !prevState);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Pass toggleMenu to Header */}
      <Header toggleMenu={toggleMenu} />
      
      {/* Pass isSideNavOpen to SideNav */}
      <SideNav isSideNavOpen={isSideNavOpen} />

      <main className="flex h-screen w-full overflow-x-auto snap-x snap-mandatory">
        <section id="section-0" className="min-w-full min-h-screen snap-start shrink-0">
          <HomePage />
        </section>
        
        <section id="section-1" className="min-w-full min-h-screen snap-start shrink-0">
          <ArtistHub />
        </section>
        
        <section id="section-2" className="min-w-full min-h-screen snap-start shrink-0">
          <AlbumSection />
        </section>
        
        <section id="section-3" className="min-w-full min-h-screen snap-start shrink-0">
          <ElectricLadyStudios />
        </section>
        
        <section id="section-4" className="min-w-full min-h-screen snap-start shrink-0">
          <Footer />
        </section>
      </main>

      {/* <NavigationArrows /> */}
      <NavigationDots />
    </div>
  );
}

export default App;
