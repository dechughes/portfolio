import React from 'react';
import ArtistCard from './ArtistCard';

export default function ArtistGrid({ artists, onArtistClick }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {artists.map(artist => (
        <ArtistCard
          key={artist.id}
          artist={artist}
          onClick={onArtistClick}
        />
      ))}
    </div>
  );
}