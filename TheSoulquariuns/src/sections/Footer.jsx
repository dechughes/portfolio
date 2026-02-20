import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Footer() {
  const instagramImages = [
    "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=500&auto=format",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format",
    "https://images.unsplash.com/photo-1574154894072-18ba0d48321b?w=500&auto=format",
    "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=500&auto=format"
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0px'
        }
      }
    ]
  };

  return (
    <>
      <style>
        {`
          .custom-dots li button:before {
            color: #f5f5dc !important;
            opacity: 0.5;
            font-size: 8px;
          }
          .custom-dots li.slick-active button:before {
            color: #f5f5dc !important;
            opacity: 1;
          }
        `}
      </style>
      <footer className="bg-[#1B4332] text-[#f5f5dc] min-h-screen w-full overflow-hidden !important">

      </footer>
    </>
  );
}

export default Footer;


        // {/* Text Container */}
        // <div className="absolute bottom-8 left-8 lg:block hidden">
        //   <h1 className="text-6xl font-bold text-[#f5f5dc] font-playfair-display hover:text-white">The Soulquarians</h1>
        //   <div className="mt-4 max-w-md text-lg text-[#f5f5dc] font-playfair-display italic hover:text-white">
        //     <p>Welcome to your curated space dedicated to the Soulquarians, the collective that shaped the sound of Neo-Soul and conscious hip-hop at the turn of the millennium.</p>
        //     <p className="mt-2">"Music is the divine way to tell beautiful, poetic things to the heart." – Pablo Casals</p>
        //   </div>
        // </div>

        // {/* Responsive Text Container for Mobile */}
        // <div className="absolute text-center  font-playfair-display px-4 sm:px-8 md:px-16 lg:hidden">
        //   <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#f5f5dc] font-bold">The Soulquarians</h1>
        //   <div className="mt-4 text-sm sm:text-base md:text-lg text-[#f5f5dc] italic max-w-md mx-auto">
        //     <p>Welcome to your curated space dedicated to the Soulquarians, the collective that shaped the sound of Neo-Soul and conscious hip-hop at the turn of the millennium.</p>
        //     <p className="mt-2">"Music is the divine way to tell beautiful, poetic things to the heart." – Pablo Casals</p>
        //   </div>
        // </div>