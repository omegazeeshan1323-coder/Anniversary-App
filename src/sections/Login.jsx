import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login({ onLogin }) {
  const [view, setView] = useState('profiles'); // 'profiles' or 'pin'
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const profiles = [
    { name: 'Farhana', color: 'bg-blue-500', icon: '😊' },
    { name: 'Zeish', color: 'bg-green-500', icon: '🐛' },
    { name: 'Obaid', color: 'bg-red-500', icon: '😊' },
    { name: 'Zeeshan', color: 'bg-purple-500', icon: '👩‍❤️‍👨', isTarget: true },
    { name: 'Isha', color: 'bg-orange-500', icon: '👩' },
    { name: 'Edit', color: 'bg-gray-800', icon: '✎', isEdit: true }
  ];

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin.toLowerCase() === 'zahira') {
      onLogin();
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {view === 'profiles' ? (
          <motion.div
            key="profiles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Top Hero Section */}
            <div className="relative h-[45vh] w-full">
              <img 
                src="/hero.png" 
                className="absolute inset-0 w-full h-full object-cover"
                alt="Featured"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-0 w-full text-center space-y-4">
                <h2 className="text-4xl font-serif font-bold italic tracking-tight">Doggesh & Dustbin</h2>
                <p className="text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                   New episode coming on Friday
                </p>
              </div>
            </div>

            {/* Profiles Section */}
            <div className="flex-1 px-8 pt-12 pb-20">
              <p className="text-center text-sm text-gray-400 mb-8">Choose your profile</p>
              <div className="grid grid-cols-3 gap-y-10 gap-x-6 max-w-sm mx-auto">
                {profiles.map((p, i) => (
                  <motion.div
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => p.isTarget ? setView('pin') : null}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className={`w-20 h-20 rounded-md flex items-center justify-center text-3xl shadow-lg transition-all group-hover:ring-2 group-hover:ring-white ${p.color} ${p.isEdit ? 'border border-white/20 bg-transparent' : ''}`}>
                      {p.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white">
                      {p.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pin"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center gap-8 px-8"
          >
            <div className="w-24 h-24 rounded-md bg-purple-500 flex items-center justify-center text-4xl shadow-2xl">
              👩‍❤️‍👨
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Profile Lock is on.</h2>
              <p className="text-sm text-gray-400">Enter password for Zeeshan</p>
            </div>

            <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-6">
              <input
                type="password"
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter Password"
                className={`w-full bg-gray-800 text-white px-4 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-center tracking-widest ${error ? 'border-2 border-red-600 animate-pulse' : ''}`}
              />

              <div className="flex flex-col gap-4">
                <button 
                  type="submit"
                  className="w-full bg-white text-black py-3.5 rounded font-bold hover:bg-gray-200"
                >
                  Enter
                </button>
                <button 
                  type="button"
                  onClick={() => setView('profiles')}
                  className="w-full text-gray-400 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
