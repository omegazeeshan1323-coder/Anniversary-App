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
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { togglePlay, isMuted, toggleMute, playSong } = useMusic();

  useEffect(() => {
    if (isUnlocked) {
      playSong(0);
    }
  }, [isUnlocked]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
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
        ) : !isUnlocked ? (
          <motion.div
            key="lockscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <Lockscreen onUnlock={() => setIsUnlocked(true)} />
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

      {/* Global Music Control Mini-Player */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-2 pl-4 glass rounded-full shadow-2xl"
        >
          <div className="flex flex-col pr-4 border-r border-white/10">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Now Playing</span>
            <span className="text-xs font-bold truncate max-w-[100px]">{useMusic().currentSong.title}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={togglePlay} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
            </button>
            <button onClick={useMusic().skipForward} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <SkipForward className="w-5 h-5 fill-white" />
            </button>
            <button onClick={toggleMute} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              {isMuted ? <VolumeX className="w-5 h-5 text-apple-red" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
