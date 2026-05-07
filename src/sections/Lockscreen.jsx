import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';

export default function Lockscreen({ onUnlock }) {
  const [time, setTime] = useState(new Date());
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -150], [1, 0]);
  const scale = useTransform(y, [0, -150], [1, 0.9]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Background Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 blur-sm brightness-75"
        style={{ backgroundImage: 'url("/lockscreen.png")' }}
      />
      
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* Main Lockscreen Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        drag="y"
        dragConstraints={{ top: -300, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y < -100) {
            onUnlock();
          }
        }}
        className="relative h-full w-full flex flex-col items-center justify-between py-20 px-6 z-10 cursor-grab active:cursor-grabbing"
      >
        <div className="text-center space-y-1">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <Lock className="w-5 h-5 text-white/70" />
          </motion.div>
          <h2 className="text-white/90 text-xl font-medium tracking-wide">
            {formatDate(time)}
          </h2>
          <h1 className="text-8xl font-bold tracking-tighter text-white">
            {formatTime(time)}
          </h1>
        </div>

        {/* Notification Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="glass w-full max-w-sm rounded-3xl p-4 flex items-start gap-4 shadow-2xl"
        >
          <div className="bg-apple-red/20 p-2 rounded-xl">
            <Heart className="w-6 h-6 text-apple-red fill-apple-red" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Doggesh & Dustbin</span>
              <span className="text-xs text-white/50">Just now</span>
            </div>
            <p className="text-sm text-white/90 leading-snug">
              "your mom" ❤️
            </p>
          </div>
        </motion.div>

        {/* Bottom Swipe Indicator */}
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
          <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
            Swipe up to unlock
          </p>
          <div className="w-32 h-1.5 bg-white/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white/60"
              style={{ width: '100%' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
