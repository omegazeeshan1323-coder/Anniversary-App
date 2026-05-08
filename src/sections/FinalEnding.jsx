import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ExternalLink, Plus, Check, Heart, Star } from 'lucide-react';

export default function FinalEnding() {
  const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/3ZoX1o4sfOGNAfLJsb2yLm";
  
  // Bucket List State
  const [items, setItems] = useState([
    { id: 1, text: "Go on a late night drive", completed: false },
    { id: 2, text: "Travel to another country", completed: false },
    { id: 3, text: "Build a home together", completed: false }
  ]);
  const [newItem, setNewItem] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now(), text: newItem, completed: false }]);
    setNewItem("");
  };

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center">
      
      {/* 1. Spotify Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-6">Our Soundtrack</p>
        <motion.a
          href={SPOTIFY_PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-3 bg-[#1DB954] text-black px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(29,185,84,0.3)] transition-all"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full text-[#1DB954]">
            <Music className="w-5 h-5 fill-current" />
          </div>
          <span>Listen on Spotify</span>
          <ExternalLink className="w-4 h-4 opacity-40" />
        </motion.a>
      </motion.div>

      {/* 2. Interactive Bucket List */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="w-full max-w-md space-y-8 mb-32"
      >
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter">Our Future List</h3>
          <p className="text-gray-400 text-sm">What should we do in Season 4?</p>
        </div>

        <form onSubmit={addItem} className="relative group">
          <input 
            type="text" 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add to our bucket list..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-14 focus:outline-none focus:border-red-600 transition-all text-sm"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => toggleItem(item.id)}
                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  item.completed 
                    ? 'bg-red-600/10 border-red-600/30 text-gray-500' 
                    : 'bg-white/5 border-white/10 text-white hover:border-white/20'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  item.completed ? 'bg-red-600 border-red-600' : 'border-white/20'
                }`}>
                  {item.completed && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className={`text-sm font-medium ${item.completed ? 'line-through' : ''}`}>
                  {item.text}
                </span>
                {!item.completed && <Heart className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-red-600 transition-opacity" />}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 3. Cinematic Credits */}
      <div className="w-full max-w-xs text-center space-y-16 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="space-y-8"
        >
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Starring</p>
            <h4 className="text-xl font-bold">Sana & Sai</h4>
          </div>
          
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Directed by</p>
            <h4 className="text-xl font-bold">Fate</h4>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Music by</p>
            <h4 className="text-xl font-bold">Our Favorite Songs</h4>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Location</p>
            <h4 className="text-xl font-bold">Gmeets & Beyond</h4>
          </div>

          <div className="pt-12">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center"
            >
              <Heart className="w-8 h-8 text-red-600 fill-red-600" />
            </motion.div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 mt-8">To be continued...</p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
