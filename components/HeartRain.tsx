import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeartRain: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const heartCount = 30;
    const newHearts = Array.from({ length: heartCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 2 + 3, // 3-5s
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
        >
          {['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}
    </div>
  );
};

export default HeartRain;