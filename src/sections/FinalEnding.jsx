import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function FinalEnding() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-apple-red/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="space-y-12 relative z-10 max-w-sm">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="space-y-4"
        >
          <p className="text-white/40 tracking-[0.3em] uppercase text-xs font-bold">The Conclusion</p>
          <h2 className="text-4xl font-bold tracking-tight text-cinematic">And after all this time...</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="text-5xl font-black italic text-apple-red"
        >
          I'd still choose you.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1 }}
          className="glass p-8 rounded-[2.5rem] text-left space-y-6"
        >
          <div className="space-y-4">
            <p className="font-serif italic text-lg leading-relaxed text-white/90">
              Three years ago, I didn't know how much my life would change. You've been my anchor, my best friend, and my greatest adventure. Thank you for every second.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-apple-red/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-apple-red fill-apple-red" />
              </div>
              <p className="font-bold">Always yours.</p>
            </div>
          </div>
          
          <img src="/montage.png" className="w-full h-48 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Montage" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 6 }}
          className="space-y-4"
        >
          <p className="text-white/60 font-medium">Renewed for another season ❤️</p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-apple-red"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{ 
            y: [null, -100],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
}
