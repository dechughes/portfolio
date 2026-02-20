import React from 'react';

export default function ArtistCard({ artist, onClick }) {
  return (
    <button
      onClick={() => onClick(artist)}
      className="group relative block w-full overflow-hidden bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-lg font-bold text-white mb-1">
          {artist.name}
        </h3>
        <p className="text-gray-300 text-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {artist.role}
        </p>
      </div>
    </button>
  );
}