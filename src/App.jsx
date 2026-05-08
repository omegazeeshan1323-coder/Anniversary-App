import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicProvider } from './context/MusicContext';
import Login from './sections/Login';
import Dashboard from './sections/Dashboard';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <Login onLogin={() => setIsLoggedIn(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}

export default App;
