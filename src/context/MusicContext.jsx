import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicContext = createContext();

export const songs = [
  {
    id: 0,
    title: "this is what falling in love feels like",
    artist: "JVKE",
    url: "/music/song1.mp3"
  },
  {
    id: 1,
    title: "Drag Path",
    artist: "Twenty One Pilots",
    url: "/music/song2.mp3"
  },
  {
    id: 2,
    title: "DIE TRYING",
    artist: "PARTYNEXTDOOR & DRAKE",
    url: "/music/song3.mp3"
  }
];

export function MusicProvider({ children }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio(songs[0].url));

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleEnded = () => {
      skipForward();
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current.src !== window.location.origin + songs[currentSongIndex].url) {
      audioRef.current.src = songs[currentSongIndex].url;
      audioRef.current.load();
    }
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log("Audio play failed, waiting for user interaction:", e);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [currentSongIndex, isPlaying]);

  useEffect(() => {
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const skipForward = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const skipBack = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const playSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <MusicContext.Provider value={{
      currentSong: songs[currentSongIndex],
      currentSongIndex,
      isPlaying,
      isMuted,
      togglePlay,
      toggleMute,
      skipForward,
      skipBack,
      playSong,
      songs
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
