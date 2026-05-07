import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Info, X, ChevronRight } from 'lucide-react';

const episodes = [
  { id: 1, title: "Your Mom", duration: "1s", description: "Where it all began. The message that set the tone, followed by writing 'coffee' on each other's hands.", thumbnail: "/memory.png" },
  { id: 2, title: "Food", duration: "Daily", description: "From McD fries to rooftop dinners. Every meal was an adventure with you.", thumbnail: "/memory.png" },
  { id: 3, title: "Drives", duration: "∞", description: "Midnight escapes and winding roads. The best conversations happen when we're going nowhere.", thumbnail: "/hero.png" },
  { id: 4, title: "The Terrace", duration: "7 PM", description: "May 14th 2023. Sneaking inside Mantri and carrying you on the terrace under the stars.", thumbnail: "/hero.png" },
];

export default function NetflixUI() {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img 
          src="/hero.png" 
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="absolute bottom-10 left-0 px-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 px-1 text-[10px] font-bold rounded-sm">SERIES</div>
            <h1 className="text-4xl font-bold tracking-tight">Doggesh & Dustbin</h1>
          </div>
          
          <p className="text-sm text-gray-300 max-w-xs line-clamp-2">
            An original documentary series exploring 3 years of love, growth, and countless memories.
          </p>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold text-sm">
              <Play className="w-4 h-4 fill-black" /> Play
            </button>
            <button className="flex items-center gap-2 bg-gray-600/50 text-white px-6 py-2 rounded font-bold text-sm backdrop-blur-md">
              <Plus className="w-4 h-4" /> My List
            </button>
          </div>
        </div>

        <button className="absolute top-10 right-6 text-white/50 text-xs font-bold border border-white/30 px-2 py-1 rounded">
          Skip Intro
        </button>
      </div>

      {/* Continue Watching */}
      <div className="px-6 mt-8 space-y-6">
        <h2 className="text-xl font-bold">Continue Watching</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {episodes.map((ep) => (
            <motion.div
              key={ep.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedEpisode(ep)}
              className="flex-shrink-0 w-40 space-y-2 cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-white/10">
                <img src={ep.thumbnail} className="w-full h-full object-cover" alt={ep.title} />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-600">
                  <div className="h-full bg-red-600 w-2/3" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-4 h-4 fill-white ml-1" />
                  </div>
                </div>
              </div>
              <p className="text-xs font-medium text-gray-300">{ep.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Seasons Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Seasons</h2>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {['Season 1 — Strangers', 'Season 2 — Falling', 'Season 3 — Forever'].map((season, i) => (
              <div key={i} className="glass p-4 rounded-xl flex justify-between items-center">
                <span className="font-semibold">{season}</span>
                <Info className="w-4 h-4 text-gray-500" />
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
            className="fixed inset-0 z-50 bg-apple-gray rounded-t-[3rem] overflow-hidden"
          >
            <div className="relative h-2/3">
              <img src={selectedEpisode.thumbnail} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedEpisode(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-apple-gray to-transparent" />
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">{selectedEpisode.title}</h3>
                <div className="flex items-center gap-3 text-sm text-green-500 font-bold">
                  <span>98% Match</span>
                  <span className="text-gray-400">2024</span>
                  <span className="border border-gray-600 px-1 rounded text-[10px]">HD</span>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {selectedEpisode.description}
              </p>

              <button 
                onClick={() => setSelectedEpisode(null)}
                className="w-full bg-white text-black py-3 rounded font-bold flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-black" /> Resume Episode
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
