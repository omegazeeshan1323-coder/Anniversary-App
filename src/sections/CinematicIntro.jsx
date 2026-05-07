import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const lines = [
  "May 9th.",
  "1,096 days.",
  "Doggesh & Dustbin.",
  "Still my favorite person."
];

export default function CinematicIntro() {
  return (
    <div className="bg-black text-white">
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
