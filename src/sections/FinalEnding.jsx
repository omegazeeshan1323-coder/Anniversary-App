import React from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';

export default function FinalEnding() {
  // Replace this with your actual Spotify Playlist URL
  const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/3ZoX1o4sfOGNAfLJsb2yLm";

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="space-y-12 relative z-10"
      >
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
            To Many More<br />Seasons of Us
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm md:text-lg">
            Our story is far from over. This is just the beginning of the greatest series ever made.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Our Soundtrack</p>

          <motion.a
            href={SPOTIFY_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-3 bg-[#1DB954] text-black px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(29,185,84,0.3)] transition-all hover:shadow-[0_0_50px_rgba(29,185,84,0.5)]"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full text-[#1DB954]">
              <Music className="w-5 h-5 fill-current" />
            </div>
            <span>Listen on Spotify</span>
            <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        </div>

        <div className="pt-20">
          <p className="text-[10px] text-white/20 uppercase tracking-widest">Designed for Sana • 2026</p>
        </div>
      </motion.div>
    </div>
  );
}
