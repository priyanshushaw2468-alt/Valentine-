import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NO_BUTTON_STAGES, AnimationStyle } from '../types';

interface PrankScreenProps {
  name: string;
  onYes: () => void;
  style: AnimationStyle;
}

const PrankScreen: React.FC<PrankScreenProps> = ({ name, onYes, style = 'classic' }) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [decoys, setDecoys] = useState<{id: number, x: number, y: number}[]>([]);

  const currentStage = NO_BUTTON_STAGES[Math.min(noAttempts, NO_BUTTON_STAGES.length - 1)];

  // Magnetic effect logic - only active if style is explicitly 'magnetic'
  useEffect(() => {
    if (style !== 'magnetic' || !hasMoved) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!noBtnRef.current) return;
      const btnRect = noBtnRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
      const repulsionRadius = 150;

      if (dist < repulsionRadius) {
        moveNoButton();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [style, hasMoved]);

  const moveNoButton = () => {
    if (!noBtnRef.current) return;

    const { innerWidth: width, innerHeight: height } = window;
    const btnRect = noBtnRef.current.getBoundingClientRect();
    
    const padding = 40;
    const safeWidth = width - btnRect.width - padding;
    const safeHeight = height - btnRect.height - padding;

    const newX = Math.max(padding, Math.random() * safeWidth);
    const newY = Math.max(padding, Math.random() * safeHeight);

    setNoPosition({ x: newX, y: newY });
    setHasMoved(true);
    setNoAttempts((prev) => prev + 1);

    if (style === 'multiply') {
      const newDecoys = Array.from({ length: 2 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.max(padding, Math.random() * safeWidth),
        y: Math.max(padding, Math.random() * safeHeight)
      }));
      setDecoys(prev => [...prev, ...newDecoys].slice(-6)); // Keep max 6 decoys
    }
  };

  const handleNoInteraction = (e: React.SyntheticEvent) => {
    // If we want it to move *before* click completes to be "unclickable", we'd use mouseenter.
    // But user requested "With each click...", so we move on click.
    e.preventDefault();
    moveNoButton();
  };

  const getAnimationProps = () => {
    const base = {
      x: hasMoved ? noPosition.x : 0,
      y: hasMoved ? noPosition.y : 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    };

    if (!hasMoved) return base;

    switch (style) {
      case 'teleport':
        return { ...base, opacity: [0, 1], scale: [0.5, 1] };
      case 'spin':
        return { ...base, rotate: [0, 720] };
      case 'shrink':
        return { ...base, scale: Math.max(0.2, 1 - (noAttempts * 0.15)) };
      case 'gravity':
        return { ...base }; 
      case 'invisibility':
        return { ...base, opacity: Math.max(0.1, 1 - (noAttempts * 0.2)) };
      default:
        return base;
    }
  };

  const getTransitionProps = () => {
    switch (style) {
      case 'teleport': return { duration: 0.2 };
      case 'spin': return { type: "spring", stiffness: 200, damping: 20 };
      case 'gravity': return { type: "spring", stiffness: 400, damping: 10, mass: 2 }; 
      case 'magnetic': return { type: "tween", duration: 0.2, ease: "linear" };
      default: return { type: "spring", stiffness: 300, damping: 25 };
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full p-4 overflow-hidden z-10"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-16 relative z-20 px-4"
      >
        <h1 className="font-pacifico text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)] text-glow mb-2 leading-tight">
          Will you be my Valentine,
        </h1>
        <div className="font-pacifico text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)] text-glow">
          {name}?
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-4xl min-h-[150px] relative">
        {/* YES BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="group relative bg-[#2CC069] hover:bg-[#28b361] text-white font-extrabold text-3xl py-4 px-12 rounded-full shadow-[0_6px_0_#1e8449] active:shadow-none active:translate-y-[6px] transition-all z-30 tracking-wide"
        >
          YES! 💖
        </motion.button>

        {/* NO BUTTON */}
        <motion.button
          ref={noBtnRef}
          initial={false}
          animate={getAnimationProps()}
          transition={getTransitionProps()}
          onTouchStart={handleNoInteraction}
          onClick={handleNoInteraction}
          style={{
            position: hasMoved ? 'fixed' : 'relative',
            left: hasMoved ? 0 : 'auto',
            top: hasMoved ? 0 : 'auto',
          }}
          className={`
            bg-[#C2185B] text-white font-pacifico text-3xl py-4 px-12 rounded-full 
            shadow-[0_6px_0_#880E4F] active:shadow-none active:translate-y-[6px]
            z-50 cursor-pointer transition-all min-w-[150px]
          `}
        >
          {currentStage.text}
        </motion.button>

        {/* Decoys for Multiply Style */}
        <AnimatePresence>
          {style === 'multiply' && decoys.map((decoy) => (
            <motion.button
              key={decoy.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed bg-[#C2185B]/80 text-white font-pacifico text-2xl py-3 px-8 rounded-full pointer-events-auto cursor-pointer"
              style={{ left: decoy.x, top: decoy.y }}
              onClick={(e) => {
                 const target = e.target as HTMLButtonElement;
                 target.style.opacity = '0';
              }}
            >
              No
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PrankScreen;