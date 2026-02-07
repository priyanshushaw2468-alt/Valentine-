import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Share2, MessageCircle, HeartHandshake, Ticket, CheckCircle, Camera } from 'lucide-react';

interface SuccessScreenProps {
  name: string;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ name }) => {
  const [showStamp, setShowStamp] = useState(false);

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFB6C1', '#FF6F91', '#E0BBE4']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFB6C1', '#FF6F91', '#E0BBE4']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
    
    // Delay the stamp animation slightly for dramatic effect
    setTimeout(() => setShowStamp(true), 600);
  }, []);

  const shareUrl = window.location.href.split('?')[0]; // Clean URL for sharing
  const whatsappMessage = `It's official! 💘 I'm your Valentine! Check out our agreement: ${window.location.href}`;

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied! Send it to them as proof! 📝");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 z-10 relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-2xl border-4 border-white mb-8 max-w-lg w-full relative overflow-hidden"
      >
        {/* Animated Background Stamp */}
        {showStamp && (
            <motion.div 
                initial={{ scale: 2, opacity: 0, rotate: -25 }}
                animate={{ scale: 1, opacity: 0.15, rotate: -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-red-600 text-red-600 font-black text-6xl md:text-8xl p-4 rounded-xl transform -rotate-12 pointer-events-none select-none whitespace-nowrap z-0"
            >
                ACCEPTED
            </motion.div>
        )}

        <div className="relative z-10">
            {/* Header Icon */}
            <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                className="mx-auto w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6 shadow-inner"
            >
                <HeartHandshake className="w-10 h-10 text-rose-500" />
            </motion.div>
            
            <h1 className="font-pacifico text-4xl md:text-5xl text-gray-800 mb-2 leading-tight">
             It's Official! 💘
            </h1>
            
            <p className="text-lg text-gray-600 font-medium mb-8">
              <span className="font-bold text-rose-500 text-xl">{name}</span> is your Valentine!
            </p>

            {/* "Love Coupon" Ticket */}
            <div className="bg-pink-50 border-2 border-dashed border-pink-200 rounded-2xl p-6 mb-6 relative hover:bg-pink-100 transition-colors cursor-default">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full text-xs font-bold text-rose-400 tracking-widest uppercase shadow-sm border border-pink-100">
                    Official Coupon
                </div>
                
                <div className="flex items-center justify-between text-left mb-4">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Valid For</p>
                        <p className="font-extrabold text-gray-800 text-lg">1 Romantic Date Night</p>
                    </div>
                    <Ticket className="text-pink-300 w-8 h-8" />
                </div>
                
                <div className="w-full h-px bg-pink-200 mb-4"></div>

                <div className="flex items-center justify-between text-left">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Includes</p>
                        <p className="font-bold text-gray-700 text-sm">Unlimited Cuddles & Snacks 🍫</p>
                    </div>
                    <div className="text-right">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Status</p>
                            <p className="font-bold text-green-600 text-sm flex items-center justify-end gap-1 bg-green-100 px-2 py-0.5 rounded-md">
                            <CheckCircle size={12} /> CONFIRMED
                            </p>
                    </div>
                </div>
            </div>

            <p className="text-xs text-gray-400 mb-8 italic flex items-center justify-center gap-1">
                <Camera size={12} /> Screenshot this as legal proof! No refunds. 😉
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    onClick={handleWhatsAppShare}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95"
                >
                    <MessageCircle size={20} />
                    Send Proof
                </button>
                
                <button
                    onClick={handleCopyLink}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95"
                >
                    <Share2 size={20} />
                    Copy Link
                </button>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessScreen;