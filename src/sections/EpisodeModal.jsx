import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Plus, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EpisodeModal({ episode, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (currentIndex < episode.media.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm overflow-hidden"
    >
      <div className="relative w-full h-full md:max-w-4xl md:h-[90vh] md:rounded-2xl bg-[#141414] shadow-2xl overflow-hidden flex flex-col">
        {/* Top Controls */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={onClose}
            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white pointer-events-auto"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Media Slideshow */}
        <div className="relative flex-1 w-full flex items-center justify-center bg-black group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full h-full"
            >
              {episode.media[currentIndex].toLowerCase().endsWith('.mp4') ? (
                <video 
                  src={episode.media[currentIndex]} 
                  className="w-full h-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img 
                  src={episode.media[currentIndex]} 
                  className="w-full h-full object-contain"
                  alt={episode.title}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {episode.media.length > 1 && (
            <>
              <button 
                onClick={prev}
                disabled={currentIndex === 0}
                className={`absolute left-4 p-4 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                onClick={next}
                disabled={currentIndex === episode.media.length - 1}
                className={`absolute right-4 p-4 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all ${currentIndex === episode.media.length - 1 ? 'opacity-0' : 'opacity-100'}`}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Indicators */}
          {episode.media.length > 1 && (
            <div className="absolute bottom-6 flex gap-2">
              {episode.media.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-red-600' : 'w-2 bg-white/20'}`} />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-8 space-y-6 md:px-12 pb-12"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-green-500 font-bold text-sm tracking-wide">99% Match</span>
              <span className="text-gray-400 text-sm">2024</span>
              <span className="border border-gray-600 px-1 rounded-sm text-[10px] text-gray-400">4K HDR</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">{episode.title}</h3>
            <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-2xl">
              {episode.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-white text-black py-3 px-10 rounded-md font-bold text-lg hover:bg-white/90">
              <Play className="w-6 h-6 fill-black" /> Resume
            </button>
            <button className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10">
              <Plus className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10">
              <ThumbsUp className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
