import React from 'react';
import { Satellite, BrainCircuit, Globe, Play } from 'lucide-react';
import { APP_TITLE, APP_SUBTITLE } from '../constants';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-12 animate-in fade-in duration-700">
      
      {/* Icon Group */}
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500/20 blur-[50px] rounded-full"></div>
        <div className="relative flex items-center justify-center gap-6">
           <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              <Satellite size={48} className="text-cyan-400" />
           </div>
           <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl z-10 hover:scale-110 transition-transform duration-500">
              <BrainCircuit size={64} className="text-purple-400" />
           </div>
           <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
              <Globe size={48} className="text-emerald-400" />
           </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          {APP_TITLE}
        </h1>
        <p className="text-xl text-slate-400 font-light">
          {APP_SUBTITLE}
        </p>
        <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Prepare for your next international workshop. Master technical vocabulary, Q&A strategies, and presentation flow in English, Vietnamese, and Russian.
        </p>
      </div>

      {/* Action */}
      <div className="space-y-4 w-full max-w-xs mx-auto">
        <button 
          onClick={onStart}
          className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 transform hover:-translate-y-1"
        >
          <span>Initialize Workshop</span>
          <Play size={20} className="fill-current group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-xs text-slate-600 uppercase tracking-widest">
          ~50 Scenarios per Session
        </p>
      </div>

    </div>
  );
};

export default WelcomeScreen;