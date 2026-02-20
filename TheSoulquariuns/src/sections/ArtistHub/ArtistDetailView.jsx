import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ArtistDetailView({ artist, onBack }) {
  return (
    <div className="min-h-screen bg-white">
      <button 
        onClick={onBack}
        className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
        aria-label="Back to artists"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          <div className="aspect-square rounded-lg overflow-hidden mb-6">
            <img
              src={`https://source.unsplash.com/800x800/?portrait&${artist.name}`}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{artist.role}</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Quick Facts</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Born</dt>
                  <dd className="font-medium">{artist.birthDate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">From</dt>
                  <dd className="font-medium">{artist.birthPlace}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Instruments</dt>
                  <dd className="font-medium">{artist.instruments?.join(", ")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Active Years</dt>
                  <dd className="font-medium">{artist.activeYears}</dd>
                </div>
              </dl>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Biography</h2>
              <p className="text-gray-600 leading-relaxed">{artist.bio}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contributions</h2>
              <div className="space-y-6">
                {artist.contributions?.map((contribution, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold mb-2">{contribution.album}</h4>
                    <p className="text-gray-600 mb-2">{contribution.year} • {contribution.role}</p>
                    <p className="text-gray-600">{contribution.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-3 gap-12">
          <div className="col-span-2 space-y-12">
            <div>
              <h1 className="text-6xl font-bold mb-4">{artist.name}</h1>
              <p className="text-2xl text-gray-600">{artist.role}</p>
            </div>

            <section>
              <h2 className="text-3xl font-bold mb-6">Biography</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{artist.bio}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Contributions</h2>
              <div className="space-y-6">
                {artist.contributions?.map((contribution, index) => (
                  <div key={index} className="bg-gray-50 p-8 rounded-lg">
                    <h4 className="text-xl font-bold mb-3">{contribution.album}</h4>
                    <p className="text-gray-600 mb-3">{contribution.year} • {contribution.role}</p>
                    <p className="text-gray-600">{contribution.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div>
            <div className="sticky top-8 space-y-8">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={`https://source.unsplash.com/800x800/?portrait&${artist.name}`}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6">Quick Facts</h3>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Born</dt>
                    <dd className="font-medium">{artist.birthDate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">From</dt>
                    <dd className="font-medium">{artist.birthPlace}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Instruments</dt>
                    <dd className="font-medium">{artist.instruments?.join(", ")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Active Years</dt>
                    <dd className="font-medium">{artist.activeYears}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}