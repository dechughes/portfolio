import React, { useState } from 'react';
import { ArrowLeft, AlignJustify as Spotify, Music, Waves, Quote, Clock, Award, History, Play, Pause, Info, Users, BookOpen } from 'lucide-react';

export default function AlbumDetailView({ album, onBack }) {
  const [activeTab, setActiveTab] = useState('story');
  const [activeAudio, setActiveAudio] = useState(null);

  const handlePlayTrack = (track, index) => {
    if (activeAudio) {
      activeAudio.pause();
      if (activeAudio.trackIndex === index) {
        setActiveAudio(null);
        return;
      }
    }

    if (track.previewUrl) {
      const audio = new Audio(track.previewUrl);
      audio.trackIndex = index;
      
      audio.addEventListener('ended', () => {
        setActiveAudio(null);
      });

      audio.play();
      setActiveAudio(audio);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <button 
        onClick={onBack}
        className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
        aria-label="Back to albums"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
        {/* Album Cover */}
        <div className="flex flex-col">
          <div className="aspect-square overflow-hidden rounded-lg shadow-lg mb-8">
            <img
              src={album.quickFacts.albumCover.image}
              alt={`${album.quickFacts.title} by ${album.quickFacts.artist}`}
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </div>
          <p className="text-gray-600 italic">
            {album.quickFacts.albumCover.description}
          </p>
        </div>

        {/* Title, Release Date, Streaming Services, and Genres */}
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl font-bold mb-2 text-[#005b4c]">{album.quickFacts.title}</h1>
            <p className="text-2xl text-gray-600">{album.quickFacts.artist}</p>
            <p className="text-lg text-gray-500">{album.quickFacts.releaseDate}</p>
          </div>

          {/* Streaming Links */}
          <div className="flex gap-4">
            {album.streaming?.spotify && (
              <a
                href={album.streaming.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#005b4c] text-white rounded-full hover:bg-opacity-90 transition-colors"
              >
                <Spotify className="w-5 h-5" />
                <span>Spotify</span>
              </a>
            )}
            {album.streaming?.appleMusic && (
              <a
                href={album.streaming.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#005b4c] text-white rounded-full hover:bg-opacity-90 transition-colors"
              >
                <Music className="w-5 h-5" />
                <span>Apple Music</span>
              </a>
            )}
            {album.streaming?.tidal && (
              <a
                href={album.streaming.tidal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#005b4c] text-white rounded-full hover:bg-opacity-90 transition-colors"
              >
                <Waves className="w-5 h-5" />
                <span>Tidal</span>
              </a>
            )}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {album.quickFacts.genres.map((genre, index) => (
              <span 
                key={index}
                className="text-sm px-3 py-1 bg-gray-100 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Quick Facts Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#005b4c]">Quick Facts</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-gray-600">Label</dt>
                <dd className="font-medium">{album.quickFacts.label}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Duration</dt>
                <dd className="font-medium">{album.quickFacts.duration}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-gray-600 mb-1">Recording Locations</dt>
                <dd className="font-medium">
                  {album.quickFacts.recordingLocations.join(", ")}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-gray-600 mb-1">Engineers</dt>
                <dd className="font-medium">
                  {album.quickFacts.engineers.join(", ")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>


        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex gap-8 overflow-x-auto">
            {[
              { id: 'story', label: 'The Story', icon: BookOpen },
              { id: 'credits', label: 'Credits', icon: Users },
              { id: 'tracks', label: 'Track List', icon: Clock },
              { id: 'impact', label: 'Impact', icon: Award },
              { id: 'references', label: 'References', icon: Info }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#005b4c] text-[#005b4c]'
                    : 'border-transparent text-gray-500 hover:text-[#005b4c]'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-12">
          {activeTab === 'story' && album.story && (
            <>
              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Cultural Context</h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-800">{album.story.culturalContext.era}</p>
                  <p className="text-lg text-gray-800">{album.story.culturalContext.titleInspiration}</p>
                  <p className="text-lg text-gray-800">{album.story.culturalContext.movement}</p>
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Recording Process</h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-800">{album.story.recordingProcess.description}</p>
                  <p className="text-lg text-gray-800">{album.story.recordingProcess.techniques}</p>
                  <p className="text-lg text-gray-800">{album.story.recordingProcess.highlights}</p>
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Artist Perspective</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg">
                    <blockquote className="text-lg text-gray-800 mb-4">"{album.story.artistPerspective.questlove}"</blockquote>
                    <cite className="text-gray-600">— Questlove</cite>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <blockquote className="text-lg text-gray-800 mb-4">"{album.story.artistPerspective.blackThought}"</blockquote>
                    <cite className="text-gray-600">— Black Thought</cite>
                  </div>
                  <p className="text-lg text-gray-800">{album.story.artistPerspective.vision}</p>
                  <p className="text-lg text-gray-800">{album.story.artistPerspective.impact}</p>
                </div>
              </section>
            </>
          )}

          {activeTab === 'credits' && album.credits && (
            <>
              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Core Personnel</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {album.credits.personnel.map((member, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg">
                      <h3 className="font-bold">{member.name}</h3>
                      <p className="text-gray-600">{member.role}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Featured Artists</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {album.credits.featuredArtists.map((artist, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg">
                      <h3 className="font-bold">{artist.name}</h3>
                      <p className="text-gray-600">{artist.track}</p>
                      <p className="text-gray-500">{artist.role}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Producers</h2>
                <div className="bg-white p-6 rounded-lg">
                  <p className="text-lg">{album.credits.producers.join(", ")}</p>
                </div>
              </section>
            </>
          )}

          {activeTab === 'tracks' && album.tracks && (
            <div className="space-y-6">
              {album.tracks.map((track, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-4">
                    {track.previewUrl && (
                      <button 
                        onClick={() => handlePlayTrack(track, index)}
                        className="flex-shrink-0 w-12 h-12 rounded-full bg-[#005b4c] text-white hover:bg-opacity-90 transition-colors flex items-center justify-center"
                        aria-label={`Play ${track.title}`}
                      >
                        {activeAudio?.trackIndex === index ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </button>
                    )}

                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#005b4c]">{track.title}</h3>
                          <p className="text-gray-600">{track.duration}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        {track.personnel && (
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Personnel</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {track.personnel.map((person, idx) => (
                                <li key={idx}>{person}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {track.producers && (
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Producers</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {track.producers.map((producer, idx) => (
                                <li key={idx}>{producer}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-700">{track.story}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'impact' && album.impact && (
            <>
              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Critical Reception</h2>
                <div className="bg-white p-6 rounded-lg mb-6">
                  <p className="text-lg text-gray-800 mb-4">{album.impact.criticalReception.overview}</p>
                  <ul className="space-y-2">
                    {album.impact.criticalReception.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-700">• {highlight}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Cultural Impact</h2>
                <div className="space-y-4">
                  <p className="text-lg text-gray-800">{album.impact.culturalImpact.legacy}</p>
                  <p className="text-lg text-gray-800">{album.impact.culturalImpact.influence}</p>
                  <p className="text-lg text-gray-800">{album.impact.culturalImpact.resonance}</p>
                </div>
              </section>

              {album.chartPerformance && (
                <section className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Chart Performance</h2>
                  <div className="bg-white p-6 rounded-lg">
                    <dl className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-gray-600">Billboard 200 Peak</dt>
                        <dd className="text-2xl font-bold">#{album.chartPerformance.billboard200.peak}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-600">R&B/Hip-Hop Albums Peak</dt>
                        <dd className="text-2xl font-bold">#{album.chartPerformance.billboardRnB.peak}</dd>
                      </div>
                    </dl>
                  </div>
                </section>
              )}
            </>
          )}

          {activeTab === 'references' && album.references && (
            <>
              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Notes</h2>
                <div className="bg-white p-6 rounded-lg mb-6">
                  <ul className="space-y-4">
                    {album.references.notes.map((note, index) => (
                      <li key={index} className="text-lg text-gray-800">• {note}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#005b4c]">Sources</h2>
                <div className="bg-white p-6 rounded-lg">
                  <ul className="space-y-2">
                    {album.references.sources.map((source, index) => (
                      <li key={index} className="text-gray-700">• {source}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}