import React from 'react';
import { Satellite, Cpu, Atom } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 animate-spin-slow">
          <Satellite className="w-full h-full text-cyan-400 opacity-80" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <Atom className="w-12 h-12 text-purple-400" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-white">Generating Curriculum</h2>
        <p className="text-slate-400 max-w-md">
          Consulting the AI model to build 50 specific scenarios for <span className="text-cyan-300">Quantum-Satellite</span> workshops...
        </p>
      </div>
    </div>
  );
};

export default Loader;
