import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const lines = [
  "May 9th.",
  "1,096 days.",
  "Doggesh & Dustbin.",
  "Still my favorite person."
];

const quotes = [
  "You're my favorite place to be.",
  "Every day with you is a gift.",
  "1,096 days of choosing you.",
  "My heart is and always will be yours.",
  "To more adventures together.",
  "You make life beautiful.",
  "Forever wouldn't be long enough.",
  "You're the best part of my day.",
  "My favorite hello and hardest goodbye.",
  "Still falling for you every single day."
];

export default function CinematicIntro() {
  return (
    <div className="bg-black text-white relative">
      {/* Floating Quotes and Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...quotes, ...Array(10).fill("❤️")].map((item, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%",
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: "-10%",
              opacity: [0, 1, 1, 0],
              x: (Math.random() * 100) + (Math.sin(i) * 10) + "%"
            }}
            transition={{ 
              duration: Math.random() * 15 + 15, 
              repeat: Infinity, 
              delay: i * 3,
              ease: "linear"
            }}
            className={`absolute font-bold whitespace-nowrap ${item === "❤️" ? "text-apple-red/40 text-xl" : "text-[10px] uppercase tracking-[0.4em] text-white/20"}`}
          >
            {item}
          </motion.div>
        ))}
      </div>

      {lines.map((text, i) => (
        <Scene key={i} text={text} isLast={i === lines.length - 1} />
      ))}
    </div>
  );
}

function Scene({ text, isLast }) {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [50, 0, 0, -50]);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ opacity, scale, y }}
        className="text-center px-6 max-w-lg"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-cinematic mb-8">
          {text}
        </h1>
        {isLast && (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-transform"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight * 5, // Scroll to Netflix section
                behavior: 'smooth'
              });
            }}
          >
            Continue Watching
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
