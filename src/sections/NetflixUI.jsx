import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Info, X, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const episodes = [
  { id: 1, title: "Our First Date", type: "image", duration: "1s", description: "Where it all began. The message that set the tone, followed by writing 'coffee' on each other's hands.", thumbnail: "/IMG_1658.JPG" },
  { id: 2, title: "Late Night Cravings", type: "video", duration: "Daily", description: "From McD fries to rooftop dinners. Every meal was an adventure with you.", thumbnail: "/IMG_1665.JPG", video: "/-3905718339118603128.MP4" },
  { id: 3, title: "Midnight Car Rides", type: "video", duration: "∞", description: "Midnight escapes and winding roads. The best conversations happen when we're going nowhere.", thumbnail: "/IMG_1670.JPG", video: "/6253243033101760670.MP4" },
  { id: 4, title: "The Terrace May 14th", type: "image", duration: "7 PM", description: "Sneaking inside Mantri and carrying you on the terrace under the stars.", thumbnail: "/IMG_1671.JPG" },
  { id: 5, title: "Sweet Moments", type: "video", duration: "2m", description: "Just you being the cutest person alive.", thumbnail: "/memory.png", video: "/6737424863088449495.MP4" },
  { id: 6, title: "Our Little World", type: "video", duration: "1m", description: "Captured in the moment, forever in my heart.", thumbnail: "/montage.png", video: "/6857776767886984412.MP4" },
  { id: 7, title: "Food Diaries Pt. 1", type: "video", duration: "30s", description: "Another delicious chapter of our story.", thumbnail: "/hero.png", video: "/7262058012806167165.MP4" },
  { id: 8, title: "Forever & Always", type: "video", duration: "45s", description: "To many more years of this.", thumbnail: "/wrapped.png", video: "/7899805083313960292.MP4" },
];

export default function NetflixUI() {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[75vh] w-full">
        <img 
          src="/hero.png" 
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="absolute bottom-10 left-0 px-6 space-y-4 w-full">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 px-1 text-[10px] font-bold rounded-sm uppercase">Original</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic">Doggesh & Dustbin</h1>
          </div>
          
          <p className="text-sm text-gray-300 max-w-xs line-clamp-2 drop-shadow-lg">
            An original documentary series exploring 3 years of love, growth, and countless memories.
          </p>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded font-bold text-sm hover:bg-white/90 transition-colors">
              <Play className="w-4 h-4 fill-black" /> Play
            </button>
            <button className="flex items-center gap-2 bg-gray-500/30 text-white px-6 py-2.5 rounded font-bold text-sm backdrop-blur-md border border-white/10">
              <Plus className="w-4 h-4" /> My List
            </button>
          </div>
        </div>

        {/* Skip Intro with Safe Area handling */}
        <button className="absolute top-[calc(1.5rem+env(safe-area-inset-top,0px))] right-6 text-white/70 text-[10px] font-bold border border-white/30 px-3 py-1.5 rounded-sm backdrop-blur-sm tracking-widest uppercase">
          Skip Intro
        </button>
      </div>

      {/* Continue Watching */}
      <div className="px-6 mt-8 space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Continue Watching</h2>
          <span className="text-xs text-red-600 font-bold">See All</span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 -mx-6 px-6">
          {episodes.map((ep) => (
            <motion.div
              key={ep.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedEpisode(ep)}
              className="flex-shrink-0 w-40 space-y-2 cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-white/5 bg-gray-900 group">
                <img src={ep.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={ep.title} />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-600/50">
                  <div className="h-full bg-red-600 w-2/3" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                  <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-4 h-4 fill-white ml-1" />
                  </div>
                </div>
                {ep.type === 'video' && (
                  <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-md backdrop-blur-md border border-white/10">
                    <Play className="w-2.5 h-2.5 fill-white" />
                  </div>
                )}
              </div>
              <p className="text-xs font-semibold text-gray-300 line-clamp-1">{ep.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Seasons Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Our Journey</h2>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { name: 'Season 1 — Strangers', desc: 'The accidental meeting that changed everything.' },
              { name: 'Season 2 — Falling', desc: 'Those long nights on the terrace and midnight calls.' },
              { name: 'Season 3 — Forever', desc: 'Building our future together, one day at a time.' }
            ].map((season, i) => (
              <div key={i} className="glass p-5 rounded-2xl flex justify-between items-center group active:bg-white/5 transition-colors">
                <div>
                  <p className="font-bold text-sm">{season.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{season.desc}</p>
                </div>
                <Info className="w-4 h-4 text-gray-600" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Episode Detail Overlay */}
      <AnimatePresence>
        {selectedEpisode && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#141414] rounded-t-[2.5rem] overflow-hidden"
          >
            <div className="relative h-[55vh] md:h-[60vh]">
              {selectedEpisode.type === 'video' ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={selectedEpisode.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                  />
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-6 right-6 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
              ) : (
                <img src={selectedEpisode.thumbnail} className="w-full h-full object-cover" alt={selectedEpisode.title} />
              )}
              
              <button 
                onClick={() => setSelectedEpisode(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-md border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            </div>
            
            <div className="p-8 space-y-6 overflow-y-auto max-h-[45vh]">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-red-600 px-1 text-[8px] font-bold rounded-sm uppercase tracking-tighter">Episode {selectedEpisode.id}</div>
                  <h3 className="text-3xl font-black italic tracking-tighter uppercase">{selectedEpisode.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-500 font-bold">
                  <span>99% Match</span>
                  <span className="text-gray-400">2021 - 2024</span>
                  <span className="border border-gray-600 px-1 rounded text-[10px]">4K</span>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-sm">
                {selectedEpisode.description}
              </p>

              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedEpisode(null)}
                  className="flex-1 bg-white text-black py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Play className="w-5 h-5 fill-black" /> Resume
                </button>
                <button className="p-3.5 rounded-lg bg-gray-600/40 backdrop-blur-md border border-white/10">
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

