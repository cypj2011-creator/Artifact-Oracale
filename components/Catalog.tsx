
import React from 'react';
// Changed import source from '../App' to '../types' to correctly resolve the SavedArtifact interface
import { SavedArtifact } from '../types';

interface CatalogProps {
  artifacts: SavedArtifact[];
  onDelete: (id: string) => void;
  onSelect: (artifact: SavedArtifact) => void;
  onStartScanning: () => void;
}

const Catalog: React.FC<CatalogProps> = ({ artifacts, onDelete, onSelect, onStartScanning }) => {
  if (artifacts.length === 0) {
    return (
      <div className="text-center py-32 space-y-8 animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600 border border-white/5">
          <i className="fas fa-box-open text-4xl"></i>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-antique font-bold">Your Vault is Empty</h2>
          <p className="text-slate-400 max-w-md mx-auto text-lg leading-relaxed">
            Begin your journey by scanning a historical object. Your discoveries will be preserved here in the grand catalog.
          </p>
        </div>
        <button 
          onClick={onStartScanning}
          className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-2xl shadow-xl transition-all active:scale-95"
        >
          START EXPLORATION
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-5xl font-antique font-bold">Digital Museum</h2>
          <p className="text-slate-400 text-lg">Browsing {artifacts.length} preserved archeological records.</p>
        </div>
        <div className="h-px bg-white/10 flex-grow mx-8 hidden md:block mb-4"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {artifacts.map((art) => (
          <div 
            key={art.id} 
            className="group glass-panel rounded-3xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500 hover:-translate-y-2 shadow-xl"
          >
            <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => onSelect(art)}>
              <img 
                src={art.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                alt={art.data.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(art.id); }}
                  className="w-10 h-10 bg-red-500/20 hover:bg-red-500 backdrop-blur-md rounded-full text-white transition-all border border-red-500/30"
                >
                  <i className="fas fa-trash-can text-sm"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] text-yellow-500 font-black tracking-[0.2em] uppercase">
                  {art.data.culture}
                </div>
                <h3 className="text-xl font-antique font-bold text-slate-100 group-hover:text-yellow-500 transition-colors line-clamp-1">
                  {art.data.name}
                </h3>
              </div>
              
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 tracking-wider">
                <span>{art.data.estimatedYear}</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span className="truncate max-w-[100px] text-right">{art.data.originLocation}</span>
              </div>

              <button 
                onClick={() => onSelect(art)}
                className="w-full py-3 bg-white/5 hover:bg-yellow-500 hover:text-slate-900 rounded-xl font-bold text-sm tracking-widest transition-all border border-white/5 uppercase"
              >
                View Dossier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
