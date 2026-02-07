import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Link as LinkIcon, Copy, Check, MessageCircle, Play, 
  RotateCcw, Sparkles, ArrowRight, Target, Zap, RotateCw, 
  Minimize2, Copy as CopyIcon, Anchor, Magnet, Ghost,
  User, X
} from 'lucide-react';
import { AnimationStyle } from '../types';

interface EntryScreenProps {
  onStart: (name: string, style: AnimationStyle) => void;
}

const EntryScreen: React.FC<EntryScreenProps> = ({ onStart }) => {
  const [inputName, setInputName] = useState('');
  const [animationStyle, setAnimationStyle] = useState<AnimationStyle>('classic');
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setIsLinkGenerated(true);
    }
  };

  const getShareUrl = () => {
    const baseUrl = window.location.href.split('?')[0];
    return `${baseUrl}?name=${encodeURIComponent(inputName.trim())}&style=${animationStyle}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsApp = () => {
    const text = `Hey ${inputName.trim()}! 🫣 I have a very important question for you... Check it out here: ${getShareUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePreview = () => {
    onStart(inputName.trim(), animationStyle);
  };

  const handleReset = () => {
    setIsLinkGenerated(false);
    setInputName('');
    setCopied(false);
  };

  const animationOptions: { id: AnimationStyle; label: string; icon: React.FC<any>; color: string; desc: string; popular?: boolean }[] = [
    { id: 'classic', label: 'Classic', icon: Target, color: 'bg-blue-100 text-blue-600', desc: 'Jumps randomly' },
    { id: 'teleport', label: 'Teleport', icon: Zap, color: 'bg-yellow-100 text-yellow-600', desc: 'Instantly vanishes', popular: true },
    { id: 'spin', label: 'Spin', icon: RotateCw, color: 'bg-purple-100 text-purple-600', desc: 'Spins away' },
    { id: 'shrink', label: 'Shrink', icon: Minimize2, color: 'bg-green-100 text-green-600', desc: 'Gets smaller' },
    { id: 'multiply', label: 'Multiply', icon: CopyIcon, color: 'bg-orange-100 text-orange-600', desc: 'Creates clones', popular: true },
    { id: 'gravity', label: 'Gravity', icon: Anchor, color: 'bg-indigo-100 text-indigo-600', desc: 'Falls & bounces' },
    { id: 'magnetic', label: 'Magnetic', icon: Magnet, color: 'bg-red-100 text-red-600', desc: 'Repels cursor' },
    { id: 'invisibility', label: 'Ghost', icon: Ghost, color: 'bg-gray-100 text-gray-600', desc: 'Fades out' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
      <AnimatePresence mode="wait">
        {!isLinkGenerated ? (
          <motion.div
            key="input-form"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] shadow-2xl max-w-lg w-full border border-white/60 relative overflow-hidden"
          >
            {/* Decorative background elements inside card */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-coral/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative flex flex-col items-center text-center">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-6 p-4 bg-gradient-to-tr from-pink-50 to-white rounded-2xl shadow-sm border border-pink-100"
              >
                <Heart className="w-10 h-10 text-coral fill-coral animate-bounce" />
              </motion.div>
              
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2 font-sans tracking-tight">
                Valentine Prank
              </h1>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm max-w-xs mx-auto">
                Create a personalized <span className="text-coral font-semibold">unclickable</span> button and send it to your Valentine!
              </p>

              <form onSubmit={handleSubmit} className="w-full space-y-8">
                {/* Input Field */}
                <div className="relative group">
                   <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-coral">
                    {inputName ? <Heart className="w-5 h-5 fill-current" /> : <User className="w-5 h-5" />}
                   </div>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="Enter partner's name..."
                    className="w-full pl-14 pr-12 py-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-coral focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-lg font-medium placeholder:text-gray-400 shadow-sm group-hover:border-gray-200"
                    maxLength={20}
                    autoFocus
                  />
                   <AnimatePresence>
                    {inputName && (
                        <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        type="button"
                        onClick={() => setInputName('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                        >
                        <X className="w-4 h-4" />
                        </motion.button>
                    )}
                   </AnimatePresence>
                   <div className={`absolute right-1 -bottom-6 text-xs font-medium transition-colors ${inputName.length >= 20 ? 'text-red-400' : 'text-gray-400'}`}>
                    {inputName.length}/20
                   </div>
                </div>

                {/* Animation Selector */}
                <div className="space-y-4 text-left w-full pt-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Select Prank Style
                    </label>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        {animationOptions.length} styles
                    </span>
                  </div>
                  
                  <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x hide-scrollbar mask-gradient-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {animationOptions.map((opt) => {
                        const isSelected = animationStyle === opt.id;
                        return (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setAnimationStyle(opt.id)}
                                className={`
                                relative flex flex-col items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 min-w-[120px] h-[140px] snap-center group
                                ${isSelected
                                    ? 'border-coral bg-white shadow-xl shadow-pink-100 scale-100 z-10' 
                                    : 'border-transparent bg-white shadow-sm hover:shadow-md hover:border-gray-100 scale-95 opacity-80 hover:opacity-100 hover:scale-100'}
                                `}
                            >
                                {isSelected && (
                                    <motion.div 
                                        layoutId="checkBadge"
                                        className="absolute -top-3 -right-3 bg-coral text-white p-1.5 rounded-full shadow-md z-20"
                                    >
                                        <Check className="w-3 h-3" strokeWidth={4} />
                                    </motion.div>
                                )}
                                
                                {opt.popular && !isSelected && (
                                     <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10 whitespace-nowrap">
                                        POPULAR
                                     </div>
                                )}

                                <div className={`p-3.5 rounded-2xl transition-colors duration-300 ${isSelected ? opt.color : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
                                <opt.icon size={24} />
                                </div>
                                <div className="text-center w-full">
                                    <span className={`block text-sm font-bold transition-colors ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>
                                    {opt.label}
                                    </span>
                                    <span className="block text-[10px] text-gray-400 mt-1 leading-tight line-clamp-1">
                                    {opt.desc}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!inputName.trim()}
                  className={`
                    w-full py-4 px-6 rounded-2xl shadow-lg font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
                    ${inputName.trim() 
                        ? 'bg-gradient-to-r from-coral to-rose-500 text-white hover:shadow-xl hover:-translate-y-1 hover:shadow-coral/30' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                  `}
                >
                  {inputName.trim() ? (
                    <>
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        Create Link for <span className="underline decoration-white/30 underline-offset-4">{inputName}</span>
                    </>
                  ) : (
                    'Enter Name to Start'
                  )}
                </button>
              </form>

              <button
                type="button"
                onClick={() => onStart('My Valentine', 'classic')}
                className="mt-8 text-xs text-gray-400 hover:text-coral font-medium transition-colors flex items-center gap-1 group"
              >
                Skip setup, just show me the prank 
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-card"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white/95 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl max-w-md w-full border border-white/60 relative"
          >
             <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 text-green-500 shadow-sm animate-bounce">
                  <LinkIcon className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Link Ready! 🎉</h2>
                <p className="text-gray-600 mb-6 text-sm">
                  Share this unique link with <span className="font-bold text-coral">{inputName}</span>.
                </p>

                {/* URL Display */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 flex items-center justify-between group hover:border-coral/30 transition-colors">
                  <div className="truncate text-gray-500 text-sm flex-1 text-left mr-3 font-mono">
                    {getShareUrl()}
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500 hover:text-coral focus:outline-none"
                    title="Copy URL"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send via WhatsApp
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCopy}
                      className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handlePreview}
                      className="w-full bg-white border-2 border-coral/20 hover:border-coral text-coral font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-pink-50"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Preview
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-6 text-gray-400 hover:text-gray-600 text-sm flex items-center justify-center gap-1 mx-auto transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Create another
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer hint */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 text-white/50 text-xs text-center px-4 pointer-events-none"
      >
        Tip: The "No" button will run away when they try to click it! 🏃‍♂️
      </motion.p>
    </div>
  );
};

export default EntryScreen;