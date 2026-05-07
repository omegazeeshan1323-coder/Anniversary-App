import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './sections/Login';
import Lockscreen from './sections/Lockscreen';
import CinematicIntro from './sections/CinematicIntro';
import NetflixUI from './sections/NetflixUI';
import SpotifyWrapped from './sections/SpotifyWrapped';
import FinalEnding from './sections/FinalEnding';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isUnlocked, setIsUnlocked] = useState(false);

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
    </div>
  );
}

export default App;
