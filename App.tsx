import React, { useState, useCallback } from 'react';
import { streamFlashcards } from './services/geminiService';
import { FlashcardData } from './types';
import { FALLBACK_CARDS, APP_TITLE, APP_SUBTITLE } from './constants';
import Flashcard from './components/Flashcard';
import Controls from './components/Controls';
import Loader from './components/Loader';
import WelcomeScreen from './components/WelcomeScreen';
import { Layers, Wifi, Cpu, Radio, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false); // Background streaming status
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDeck = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    setCards([]); // Clear current deck
    setCurrentIndex(0);
    setIsFlipped(false);

    try {
      if (!process.env.API_KEY) {
        // Fallback for demo without key
        setTimeout(() => {
            setCards(FALLBACK_CARDS);
            setIsGenerating(false);
        }, 1500);
        return;
      }

      await streamFlashcards((newCard) => {
        setCards(prev => [...prev, newCard]);
      });

    } catch (err) {
      console.error(err);
      if (cards.length === 0) {
        setError("Connection interrupted. Switching to offline data.");
        setCards(FALLBACK_CARDS);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [cards.length]);

  const handleStart = () => {
    setHasStarted(true);
    loadDeck();
  };

  // Handlers
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 200);
    }
  };

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCards(prev => {
        const shuffled = [...prev];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
      setCurrentIndex(0);
    }, 300);
  };

  const handleReload = () => {
    loadDeck();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden relative">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-6 py-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setHasStarted(false)}>
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20">
              <Wifi className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                {APP_TITLE}
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide hidden sm:block">
                {APP_SUBTITLE}
              </p>
            </div>
          </div>
          
          {hasStarted && (
            <div className="flex items-center gap-4 text-xs font-mono">
                {isGenerating ? (
                   <div className="flex items-center gap-2 px-3 py-1 bg-cyan-900/30 border border-cyan-800/50 rounded-full">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                     <span className="text-cyan-300">LIVE FEED: {cards.length}</span>
                   </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-900/30 border border-emerald-800/50 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    <span className="text-emerald-300">COMPLETE ({cards.length})</span>
                  </div>
                )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-4 sm:p-6 w-full">
        <div className="w-full max-w-5xl mx-auto">
          
          {error && cards.length > 0 && (
             <div className="mb-4 mx-auto max-w-2xl bg-amber-900/20 border border-amber-800 text-amber-200 px-4 py-2 rounded-lg text-xs text-center">
                {error}
             </div>
          )}

          {!hasStarted ? (
            <WelcomeScreen onStart={handleStart} />
          ) : (
            <>
              {cards.length === 0 ? (
                <Loader />
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Flashcard 
                    data={cards[currentIndex]} 
                    isFlipped={isFlipped} 
                    onFlip={handleFlip} 
                  />
                  <Controls 
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onShuffle={handleShuffle}
                    onReload={handleReload}
                    currentIndex={currentIndex}
                    total={cards.length}
                    isStreaming={isGenerating}
                  />
                  {isGenerating && (
                    <div className="mt-4 text-center">
                      <p className="text-xs text-slate-500 animate-pulse flex items-center justify-center gap-2">
                         <Sparkles size={12} className="text-cyan-400"/>
                         AI is generating more scenarios ({cards.length})...
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center border-t border-slate-800 text-slate-600 text-sm">
        <div className="flex justify-center items-center gap-6 mb-2">
           <div className="flex items-center gap-2"><Layers size={14}/> Satellite NTN</div>
           <div className="flex items-center gap-2"><Cpu size={14}/> AI & Quantum</div>
           {isGenerating && hasStarted && <div className="flex items-center gap-2 animate-pulse text-cyan-500"><Radio size={14}/> Receiving Data...</div>}
        </div>
        <p>© {new Date().getFullYear()} Research Communications Assistant</p>
      </footer>

    </div>
  );
};

export default App;