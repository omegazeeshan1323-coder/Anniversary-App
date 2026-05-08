import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login({ onLogin }) {
  const [view, setView] = useState('profiles'); // 'profiles' or 'pin'
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const profiles = [
    { name: 'Zahira', color: 'bg-blue-500', icon: '👩‍❤️‍👨' },
    { name: 'Doggesh', color: 'bg-red-600', icon: '🐶' },
    { name: 'Add Profile', color: 'bg-transparent border-2 border-white/20', icon: '+' }
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
    <div className="min-h-screen bg-black flex items-center justify-center font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'profiles' ? (
          <motion.div
            key="profiles"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-10"
          >
            <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight">Who's watching?</h1>
            
            <div className="flex gap-4 md:gap-8">
              {profiles.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => p.name === 'Zahira' ? setView('pin') : null}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-24 h-24 md:w-32 md:h-32 rounded flex items-center justify-center text-4xl shadow-lg transition-all group-hover:ring-4 group-hover:ring-white ${p.color}`}>
                    {p.name === 'Add Profile' ? <span className="text-white/40 text-4xl font-light">{p.icon}</span> : p.icon}
                  </div>
                  <span className={`text-sm md:text-lg ${p.name === 'Zahira' ? 'text-white' : 'text-white/40'} group-hover:text-white`}>
                    {p.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <button className="mt-12 px-8 py-2 border border-white/40 text-white/40 hover:text-white hover:border-white transition-colors tracking-widest text-sm uppercase">
              Manage Profiles
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="pin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-8 w-full max-w-xs"
          >
            <div className="w-24 h-24 rounded bg-blue-500 flex items-center justify-center text-4xl shadow-2xl">
              👩‍❤️‍👨
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-white">Profile Lock is on.</h2>
              <p className="text-sm text-white/60">Enter password to access this profile.</p>
            </div>

            <form onSubmit={handlePinSubmit} className="w-full space-y-6">
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter Password"
                  className={`w-full bg-[#333] text-white px-4 py-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-center tracking-widest ${error ? 'border-2 border-red-600 animate-pulse' : ''}`}
                />
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  type="submit"
                  className="w-full bg-white text-black py-3 rounded font-bold hover:bg-white/90 transition-colors"
                >
                  Enter
                </button>
                <button 
                  type="button"
                  onClick={() => setView('profiles')}
                  className="w-full text-white/60 text-sm hover:text-white"
                >
                  Back to Profiles
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
