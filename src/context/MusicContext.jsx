import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio('/music/song1.mp3')); // Using your actual song
  const tadumRef = useRef(null); // Removed since file doesn't exist

  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  const playTadum = () => {
    // Skipped as file not found
  };

  const startMusic = () => {
    audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const pauseMusic = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeMusic = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, togglePlay, toggleMute, startMusic, playTadum, pauseMusic, resumeMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
