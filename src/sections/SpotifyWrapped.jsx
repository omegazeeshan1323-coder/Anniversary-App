import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Heart } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

const cards = [
  { 
    title: "The Soundtrack of Us", 
    stat: "1,096", 
    label: "Days dating", 
    color: "bg-purple-600",
    image: "/memory.png"
  },
  { 
    title: "Most Used Sentiment", 
    stat: "😭", 
    label: "The universal response", 
    color: "bg-pink-600",
    image: "/wrapped.png"
  },
  { 
    title: "Her Unfiltered Dialogues", 
    stat: "\"Fuck yourself\"", 
    label: "Also: \"n***er go die\"", 
    color: "bg-red-600",
    image: "/hero.png"
  },
  { 
    title: "My Standard Responses", 
    stat: "\"Cutie\"", 
    label: "Also: \"come fuck me\"", 
    color: "bg-blue-600",
    image: "/memory.png"
  }
];

export default function SpotifyWrapped() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { currentSong, isPlaying, togglePlay, skipForward, skipBack } = useMusic();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIndex((i) => (i + 1) % cards.length);
          return 0;
        }
        return prev + 0.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [index]);

  const current = cards[index];

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      {/* Progress Bars */}
      <div className="absolute top-12 left-0 w-full flex gap-1 px-4 z-20">
        {cards.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ 
                width: i < index ? '100%' : i === index ? `${progress}%` : '0%' 
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: -100 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className={`relative flex-1 ${current.color} flex flex-col items-center justify-center p-8`}
        >
          {/* Background Image with Blur */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          
          <div className="relative z-10 text-center space-y-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold uppercase tracking-widest text-white/80"
            >
              {current.title}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="space-y-2"
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
                {current.stat}
              </h1>
              <p className="text-xl font-medium text-white/90">
                {current.label}
              </p>
            </motion.div>
          </div>

          {/* Music Player UI at bottom */}
          <div className="absolute bottom-20 left-0 w-full px-8 z-20">
            <div className="glass p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">
                  {currentSong.title}
                </p>
                <p className="text-xs text-white/60">
                  {currentSong.artist}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <SkipBack className="w-4 h-4 cursor-pointer hover:scale-110" onClick={(e) => { e.stopPropagation(); skipBack(); }} />
                <div onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="cursor-pointer hover:scale-110">
                  {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
                </div>
                <SkipForward className="w-4 h-4 cursor-pointer hover:scale-110" onClick={(e) => { e.stopPropagation(); skipForward(); }} />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Tap Areas */}
      <div className="absolute inset-0 flex z-30">
        <div 
          className="w-1/2 h-full" 
          onClick={() => {
            setIndex((i) => (i - 1 + cards.length) % cards.length);
            setProgress(0);
          }} 
        />
        <div 
          className="w-1/2 h-full" 
          onClick={() => {
            setIndex((i) => (i + 1) % cards.length);
            setProgress(0);
          }} 
        />
      </div>
    </div>
  );
}
