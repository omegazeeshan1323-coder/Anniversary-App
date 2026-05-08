import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Delete, ChevronLeft } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export default function Login({ onLogin }) {
  const [view, setView] = useState('profiles'); // 'profiles' or 'pin'
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const { playTadum, startMusic } = useMusic();

  const CORRECT_PIN = '0309';

  const handleProfileClick = () => {
    setView('pin');
  };

  const handleKeyClick = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          playTadum();
          setTimeout(() => {
            startMusic();
            onLogin();
          }, 800);
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 600);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'profiles' ? (
          <motion.div
            key="profiles"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-12"
          >
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Who's watching?</h1>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProfileClick}
              className="group flex flex-col items-center gap-4 cursor-pointer"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-md bg-red-600 flex items-center justify-center shadow-2xl transition-all group-hover:ring-4 group-hover:ring-white">
                <span className="text-6xl">❤️</span>
              </div>
              <span className="text-xl text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest font-medium">Sana</span>
            </motion.div>

            <button className="px-8 py-2 border border-white/40 text-gray-500 hover:text-white hover:border-white transition-all text-sm uppercase tracking-[0.3em]">
              Manage Profiles
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="pin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-sm flex flex-col items-center gap-10 px-8"
          >
            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={() => setView('profiles')}
                className="self-start flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <h2 className="text-2xl font-bold">Profile Lock is on.</h2>
              <p className="text-gray-400 text-sm">Enter your PIN to access this profile.</p>
            </div>

            {/* PIN Display */}
            <div className="flex gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`w-12 h-16 border-2 rounded-md flex items-center justify-center text-3xl font-bold transition-all
                    ${error ? 'border-red-600 animate-shake' : pin[i] ? 'border-white' : 'border-white/20'}`}
                >
                  {pin[i] ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-white rounded-full" />
                  ) : ''}
                </div>
              ))}
            </div>

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  whileTap={{ scale: 0.9, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  onClick={() => handleKeyClick(num.toString())}
                  className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-2xl font-medium transition-colors hover:border-white/30"
                >
                  {num}
                </motion.button>
              ))}
              <div />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleKeyClick('0')}
                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-2xl font-medium"
              >
                0
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="w-16 h-16 flex items-center justify-center text-gray-500 hover:text-white"
              >
                <Delete className="w-6 h-6" />
              </motion.button>
            </div>

            <button className="text-gray-500 hover:text-white text-sm uppercase tracking-widest font-medium">
              Forgot PIN?
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
