
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center glow-gold group-hover:scale-110 transition-transform shadow-lg shadow-yellow-500/20">
            <i className="fas fa-scroll text-slate-900 text-xl"></i>
          </div>
          <h1 className="text-2xl font-antique font-bold tracking-[0.2em] bg-gradient-to-r from-yellow-100 to-yellow-500 bg-clip-text text-transparent">
            ARTIFACT ORACLE
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
