import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Volume2, VolumeX, Plus, Check } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import EpisodeModal from './EpisodeModal';

const seasons = [
  {
    title: "Season 1: The Beginning",
    episodes: [
      { id: 101, title: "The first Hello", thumbnail: "/IMG_1658.JPG", description: "Where the spark first ignited. A simple hello that changed everything.", media: ["/IMG_1658.JPG"] },
      { 
        id: 102, 
        title: "Our first date", 
        thumbnail: "/first date.jpeg", 
        description: "Coffee, nerves, and that feeling that you were the one. Every moment was a dream.", 
        media: ["/first date.mp4", "/first date.jpeg", "/first date (2).jpeg", "/IMG_1665.JPG", "/IMG_1671.JPG"] 
      },
      { 
        id: 103, 
        title: "Gmeets", 
        thumbnail: "/gmeet.jpeg", 
        description: "Distance was just a number when we had our late-night screens. Every screenshot and recording is a treasure.", 
        media: [
          "/gmeet.mp4", "/gmeet.jpeg", "/gmeet (2).mp4", "/gmeet (2).jpeg", "/gmeet (3).mp4", "/gmeet (3).jpeg", "/gmeet (4).mp4", "/gmeet.png", "/gmeet (2).png",
          "/WhatsApp Video 2026-05-08 at 12.28.41 PM.mp4", "/WhatsApp Video 2026-05-08 at 12.28.43 PM.mp4", "/WhatsApp Video 2026-05-08 at 12.28.48 PM.mp4",
          "/WhatsApp Image 2026-05-08 at 12.28.44 PM.jpeg", "/WhatsApp Image 2026-05-08 at 12.28.45 PM.jpeg", "/WhatsApp Image 2026-05-08 at 12.28.47 PM.jpeg",
          "/WhatsApp Image 2026-05-08 at 12.28.49 PM.jpeg", "/WhatsApp Image 2026-05-08 at 12.28.50 PM.jpeg", "/WhatsApp Image 2026-05-08 at 12.28.56 PM.jpeg",
          "/WhatsApp Image 2026-05-08 at 11.51.14 AM.jpeg", "/WhatsApp Image 2026-05-08 at 11.51.14 AM (1).jpeg", "/WhatsApp Image 2026-05-08 at 11.51.14 AM (2).jpeg"
        ] 
      },
    ]
  },
  {
    title: "Season 2: Adventures",
    episodes: [
      { 
        id: 201, 
        title: "Food Tour", 
        thumbnail: "/IMG_1670.JPG", 
        description: "From McD fries to rooftop treats. Every video and photo of our delicious journey.", 
        media: [
          "/IMG_1670.JPG", 
          "/-3905718339118603128.MP4",
          "/6253243033101760670.MP4",
          "/6737424863088449495.MP4",
          "/6857776767886984412.MP4",
          "/7262058012806167165.MP4",
          "/7899805083313960292.MP4",
          "/WhatsApp Video 2026-05-08 at 11.51.15 AM.mp4"
        ] 
      },
      { id: 202, title: "Adventures", thumbnail: "/IMG_1671.JPG", description: "Getting lost, finding beauty, and making every second count.", media: ["/montage.png", "/IMG_1671.JPG"] },
    ]
  },
  {
    title: "Season 3: Forever",
    episodes: [
      { id: 301, title: "Cloud 9", thumbnail: "/hero.png", description: "Living the dream. To every moment we've spent in our little bubble.", media: ["/hero.png", "/montage.png"] },
    ]
  }
];

export default function Dashboard() {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const { isMuted, toggleMute } = useMusic();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 pb-24">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src="/hero.png" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-20 left-0 px-6 md:px-12 w-full md:max-w-2xl space-y-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-600 px-1.5 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-tighter italic">N Series</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none mb-4">
              Doggesh &<br />Dustbin
            </h1>
            <p className="text-sm md:text-lg text-gray-300 drop-shadow-lg leading-snug">
              An epic 3-year journey of love, growth, and endless memories. Watch the story of how two strangers built a universe together.
            </p>
          </motion.div>

          <div className="flex items-center gap-3 pt-4">
            <button 
              onClick={() => setSelectedEpisode(seasons[0].episodes[0])}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-black py-3 px-8 rounded-md font-bold text-lg hover:bg-white/90 transition-transform active:scale-95"
            >
              <Play className="w-6 h-6 fill-black" /> Play
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-500/30 text-white py-3 px-8 rounded-md font-bold text-lg backdrop-blur-md border border-white/10">
              <Plus className="w-6 h-6" /> My List
            </button>
          </div>
        </div>

        {/* Global Mute Toggle */}
        <button 
          onClick={toggleMute}
          className="absolute top-10 right-6 md:right-12 p-3 rounded-full border border-white/20 backdrop-blur-md bg-black/20 text-white hover:bg-white/10 transition-all z-20"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>

      {/* Season Rows */}
      <div className="px-6 md:px-12 -mt-10 relative z-10 space-y-12 pb-20">
        {seasons.map((season, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">{season.title}</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
              {season.episodes.map((ep) => (
                <motion.div
                  key={ep.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedEpisode(ep)}
                  className="flex-shrink-0 w-44 md:w-64 space-y-2 cursor-pointer group"
                >
                  <div className="relative aspect-video rounded-md overflow-hidden border border-white/5 bg-gray-900 shadow-lg">
                    <img src={ep.thumbnail} className="w-full h-full object-cover group-hover:brightness-50 transition-all" alt={ep.title} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-5 h-5 fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                      <div className="h-full bg-red-600 w-1/3" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">{ep.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Episode Modal */}
      <AnimatePresence>
        {selectedEpisode && (
          <EpisodeModal 
            episode={selectedEpisode} 
            onClose={() => setSelectedEpisode(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
