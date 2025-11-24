import React from 'react';
import { ArrowLeft, ArrowRight, RefreshCcw, Shuffle, Loader2 } from 'lucide-react';

interface ControlsProps {
  onNext: () => void;
  onPrev: () => void;
  onShuffle: () => void;
  onReload: () => void;
  currentIndex: number;
  total: number;
  isStreaming?: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
  onNext, 
  onPrev, 
  onShuffle, 
  onReload, 
  currentIndex, 
  total,
  isStreaming = false
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between bg-slate-800/50 p-4 rounded-2xl border border-slate-700 backdrop-blur-sm gap-4 sm:gap-0">
      
      <div className="flex gap-2 w-full sm:w-auto justify-center">
         <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col justify-center px-4 min-w-[120px]">
          <span className="text-xs text-slate-400 font-mono text-center uppercase tracking-wider">
             {isStreaming ? 'Streaming...' : 'Card'}
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-bold text-white font-mono">
              {total > 0 ? currentIndex + 1 : 0} 
              <span className="text-slate-500 mx-1">/</span> 
              {total}
            </span>
            {isStreaming && <Loader2 size={14} className="animate-spin text-cyan-400" />}
          </div>
        </div>
        <button
          onClick={onNext}
          disabled={currentIndex === total - 1}
          className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      <div className="flex gap-3 w-full sm:w-auto justify-center">
        <button
          onClick={onShuffle}
          disabled={total === 0 || isStreaming}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 border border-indigo-500/30 transition-all font-medium disabled:opacity-50"
        >
          <Shuffle size={18} /> <span className="hidden sm:inline">Shuffle</span>
        </button>
        <button
          onClick={onReload}
          disabled={isStreaming}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/40 border border-emerald-500/30 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isStreaming ? <Loader2 size={18} className="animate-spin" /> : <RefreshCcw size={18} />}
          <span className="hidden sm:inline">New Set</span>
        </button>
      </div>

    </div>
  );
};

export default Controls;