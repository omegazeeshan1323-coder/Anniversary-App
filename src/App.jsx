import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './sections/Login';
import Lockscreen from './sections/Lockscreen';
import CinematicIntro from './sections/CinematicIntro';
import NetflixUI from './sections/NetflixUI';
import SpotifyWrapped from './sections/SpotifyWrapped';
import FinalEnding from './sections/FinalEnding';
import { useMusic } from './context/MusicContext';
import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const { isPlaying, togglePlay, isMuted, toggleMute, playSong, currentSong, skipForward } = useMusic();

  useEffect(() => {
    if (isLoggedIn) {
      playSong(0);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-apple-red selection:text-white">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <Login onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            className="snap-container"
          >
            <section className="snap-section"><CinematicIntro /></section>
            <section className="snap-section"><NetflixUI /></section>
            <section className="snap-section"><SpotifyWrapped /></section>
            <section className="snap-section"><FinalEnding /></section>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Global Music Control - Floating Mini Mode */}
      {isLoggedIn && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AnimatePresence>
            {isPlayerExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: 20, width: 0 }}
                className="glass rounded-2xl p-2 pr-4 flex items-center gap-3 overflow-hidden whitespace-nowrap border border-white/10"
              >
                <div className="pl-2">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Now Playing</p>
                  <p className="text-xs font-bold truncate max-w-[120px]">{currentSong?.title || "Nothing playing"}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={togglePlay} className="p-2 hover:bg-white/10 rounded-full">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={() => skipForward()} className="p-2 hover:bg-white/10 rounded-full">
                    <SkipForward className="w-4 h-4" />
                  </button>
                  <button onClick={toggleMute} className="p-2 hover:bg-white/10 rounded-full">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setIsPlayerExpanded(!isPlayerExpanded)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${isPlayerExpanded ? 'bg-white text-black scale-90' : 'bg-red-600 text-white animate-bounce-slow'}`}
          >
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                <motion.div animate={{ height: [4, 16, 8, 16, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-current rounded-full" />
                <motion.div animate={{ height: [8, 4, 16, 4, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-current rounded-full" />
                <motion.div animate={{ height: [16, 8, 4, 8, 16] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-current rounded-full" />
              </div>
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default App;
