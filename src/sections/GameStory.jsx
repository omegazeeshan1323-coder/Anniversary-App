import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Shield, Target } from 'lucide-react';

const levels = [
  { id: 1, name: "First Conversation", xp: 100, icon: <Zap className="text-yellow-400" />, status: "Completed" },
  { id: 2, name: "Getting Attached", xp: 100, icon: <Heart className="text-pink-400" />, status: "Completed" },
  { id: 3, name: "Falling in Love", xp: 100, icon: <Star className="text-blue-400" />, status: "Completed" },
  { id: 4, name: "Surviving Hard Times", xp: 85, icon: <Shield className="text-purple-400" />, status: "In Progress" },
];

const achievements = [
  { title: "First Date Unlocked", desc: "Successfully navigated the first meeting.", rarity: "Rare" },
  { title: "Late Night Calls Master", desc: "Survived 100+ nights of minimal sleep.", rarity: "Epic" },
  { title: "Stayed Through Everything", desc: "Loyalty level maximum reached.", rarity: "Legendary" },
];

export default function GameStory() {
  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col gap-10">
      <div className="space-y-2 mt-12">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-apple-red font-bold tracking-widest text-xs uppercase">Story Mode</p>
            <h2 className="text-4xl font-black italic tracking-tighter">LEVEL 3</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50">Total XP</p>
            <p className="text-xl font-bold">12,500</p>
          </div>
        </div>
        <div className="h-4 bg-gray-800 rounded-full overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '85%' }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-apple-red to-orange-500 relative"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]" />
          </motion.div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Progression</h3>
        <div className="space-y-3">
          {levels.map((level) => (
            <motion.div
              key={level.id}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: level.id * 0.1 }}
              className="glass p-4 rounded-2xl flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                {level.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold">{level.name}</p>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-white/10 rounded-full">
                    <div className="h-full bg-white/40 rounded-full" style={{ width: `${level.xp}%` }} />
                  </div>
                  <span className="text-[10px] text-white/50">{level.xp}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Achievements</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              whileInView={{ scale: [0.9, 1.05, 1], rotate: [0, 5, 0] }}
              className="flex-shrink-0 w-48 glass p-5 rounded-3xl border-t-2 border-white/20 space-y-3"
            >
              <div className="w-10 h-10 rounded-full bg-apple-red/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,59,48,0.3)]">
                <Trophy className="w-5 h-5 text-apple-red" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-apple-red uppercase">{ach.rarity}</p>
                <p className="font-bold leading-tight">{ach.title}</p>
                <p className="text-xs text-white/50 mt-1">{ach.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final Boss Preview */}
      <div className="mt-auto glass p-6 rounded-[2.5rem] bg-gradient-to-br from-red-900/40 to-black border-red-500/20">
        <div className="flex items-center gap-4">
          <Target className="w-8 h-8 text-apple-red animate-pulse" />
          <div>
            <p className="text-xs font-bold text-red-400 uppercase">Incoming Quest</p>
            <p className="text-xl font-black">THE FINAL BOSS: DISTANCE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
