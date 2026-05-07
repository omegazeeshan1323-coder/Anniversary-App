import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ChevronRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'zahira') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-apple-red/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-sm space-y-12 text-center"
      >
        <div className="space-y-4">
          <motion.div
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-16 h-16 bg-apple-gray rounded-2xl flex items-center justify-center mx-auto border border-white/10"
          >
            <Lock className={`w-8 h-8 ${error ? 'text-apple-red' : 'text-white/40'}`} />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Protected Archive</h1>
            <p className="text-white/40 text-sm">Enter password to unlock our story</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full bg-apple-gray/50 border ${error ? 'border-apple-red' : 'border-white/10'} rounded-2xl py-4 px-6 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-white/20 transition-all backdrop-blur-xl placeholder:text-white/10`}
              autoFocus
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group hover:bg-white/90 transition-colors"
          >
            Access Memories
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>

        <div className="pt-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
            Authorized Personnel Only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
