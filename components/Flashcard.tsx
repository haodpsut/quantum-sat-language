import React, { useEffect } from 'react';
import { FlashcardData } from '../types';
import { Volume2, RotateCw, Globe, Info } from 'lucide-react';

interface FlashcardProps {
  data: FlashcardData;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ data, isFlipped, onFlip }) => {
  
  // Speak logic
  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      // Try to select a decent voice if available (optional)
      window.speechSynthesis.speak(utterance);
    }
  };

  // Stop speaking when card changes
  useEffect(() => {
    window.speechSynthesis.cancel();
  }, [data.id]);

  return (
    <div className="relative w-full max-w-2xl h-[400px] perspective-1000 mx-auto cursor-pointer group" onClick={onFlip}>
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-2xl rounded-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side (English + Context) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col justify-between backface-hidden z-10">
          <div className="flex justify-between items-start">
             <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-cyan-300 uppercase bg-cyan-900/30 rounded-full border border-cyan-800">
              {data.category}
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); speak(data.english, 'en-US'); }}
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-700"
              title="Listen in English"
            >
              <Volume2 size={20} />
            </button>
          </div>
          
          <div className="flex-grow flex flex-col justify-center items-center text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white leading-relaxed font-serif">
              {data.english}
            </h2>
          </div>

          <div className="flex items-center justify-center text-slate-500 text-sm gap-2">
            <Info size={16} />
            <span>{data.context}</span>
          </div>

          <div className="absolute bottom-4 right-4 text-slate-600 flex items-center gap-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            <RotateCw size={14} /> Click to flip
          </div>
        </div>

        {/* Back Side (Translations) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 border border-indigo-700 rounded-2xl p-8 flex flex-col justify-center rotate-y-180 backface-hidden overflow-y-auto">
           <div className="space-y-8">
              
              {/* Vietnamese */}
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                 <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center gap-2 text-pink-300 text-sm font-semibold">
                      <Globe size={16} /> VIETNAMESE
                   </div>
                   <button 
                     onClick={(e) => { e.stopPropagation(); speak(data.vietnamese, 'vi-VN'); }}
                     className="p-1 text-white/50 hover:text-white transition-colors"
                   >
                     <Volume2 size={16} />
                   </button>
                 </div>
                 <p className="text-xl text-white font-medium">
                   {data.vietnamese}
                 </p>
              </div>

              {/* Russian */}
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                 <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold">
                      <Globe size={16} /> RUSSIAN
                   </div>
                   <button 
                     onClick={(e) => { e.stopPropagation(); speak(data.russian, 'ru-RU'); }}
                     className="p-1 text-white/50 hover:text-white transition-colors"
                   >
                     <Volume2 size={16} />
                   </button>
                 </div>
                 <p className="text-xl text-white font-medium">
                   {data.russian}
                 </p>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
