import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EntryScreen from './components/EntryScreen';
import PrankScreen from './components/PrankScreen';
import SuccessScreen from './components/SuccessScreen';
import HeartRain from './components/HeartRain';
import { AppState, AnimationStyle } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ENTRY);
  const [partnerName, setPartnerName] = useState<string>('');
  const [prankStyle, setPrankStyle] = useState<AnimationStyle>('classic');

  useEffect(() => {
    // Check URL parameters on mount
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
    const styleParam = params.get('style');
    
    if (nameParam) {
      setPartnerName(decodeURIComponent(nameParam));
      if (styleParam) {
        setPrankStyle(styleParam as AnimationStyle);
      }
      setAppState(AppState.PRANK);
    }
  }, []);

  const handleStart = (name: string, style: AnimationStyle = 'classic') => {
    setPartnerName(name);
    setPrankStyle(style);
    
    // Update URL without reloading
    const newUrl = `${window.location.pathname}?name=${encodeURIComponent(name)}&style=${style}`;
    try {
      window.history.pushState({ path: newUrl }, '', newUrl);
    } catch (error) {
      console.warn("Unable to update URL history:", error);
    }
    
    setAppState(AppState.PRANK);
  };

  const handleYes = () => {
    setAppState(AppState.SUCCESS);
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 overflow-hidden relative selection:bg-rose-200">
      {/* 1. Base Animated Gradient Layer */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(120deg, #ffb3c7, #ff6f91, #d6336c, #ffb3c7)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      {/* 2. Noise Texture Overlay (Subtle Organic Depth) */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />

      {/* 3. Motion Layers: Soft Light Waves / Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0], 
            y: [0, -50, 50, 0], 
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.4, 0.6, 0.4] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-[#ffc2d1] rounded-full mix-blend-screen filter blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -70, 30, 0], 
            y: [0, 60, -40, 0], 
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#ff8fa3] rounded-full mix-blend-screen filter blur-[100px]"
        />
         <motion.div 
          animate={{ 
            x: [0, 50, -50, 0], 
            y: [0, 50, 50, 0], 
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-[#ffaec0] rounded-full mix-blend-overlay filter blur-[80px]"
        />
      </div>

      {/* 4. Floating Hearts Layer */}
      <HeartRain />

      {/* 5. Main Content Layer */}
      <main className="relative z-10 w-full h-full flex flex-col min-h-screen">
        {appState === AppState.ENTRY && (
          <EntryScreen onStart={handleStart} />
        )}
        
        {appState === AppState.PRANK && (
          <PrankScreen name={partnerName} onYes={handleYes} style={prankStyle} />
        )}
        
        {appState === AppState.SUCCESS && (
          <SuccessScreen name={partnerName} />
        )}
      </main>

      {/* Footer / Branding */}
      <footer className="fixed bottom-2 w-full text-center text-white/80 text-xs z-20 pointer-events-none font-medium mix-blend-plus-lighter tracking-wider">
        Made with ❤️ for Valentine's Day
      </footer>
    </div>
  );
};

export default App;