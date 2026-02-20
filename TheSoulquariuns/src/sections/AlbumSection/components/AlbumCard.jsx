import React from 'react';

export default function AlbumCard({ album, onClick }) {
  return (
    <button
      onClick={() => onClick(album)}
      className="group relative w-full bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden 
        hover:bg-black/50 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={album.quickFacts.albumCover.image}
          alt={`${album.quickFacts.title} by ${album.quickFacts.artist}`}
          className="w-full h-full object-cover transform transition-all duration-500 
            group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-bold mb-1">{album.quickFacts.title}</h3>
        <p className="text-gray-300">{album.quickFacts.artist}</p>
        <p className="text-sm text-gray-400 mt-1">{album.quickFacts.releaseDate}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {album.quickFacts.genres.map((genre, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-white/10 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}