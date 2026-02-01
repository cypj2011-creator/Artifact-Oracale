
import React from 'react';
import { ArtifactAnalysis } from '../types';

interface AnalysisResultProps {
  data: ArtifactAnalysis;
  image: string;
  onReset: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, image, onReset }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 pb-20">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Artifact Visuals */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="relative group rounded-[2.5rem] overflow-hidden glass-panel p-3 shadow-2xl">
            <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 aspect-[4/5] sm:aspect-square md:aspect-auto">
              <img 
                src={image} 
                alt={data.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="bg-yellow-500/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl">
                  <i className="fas fa-check-circle text-slate-900"></i>
                  <span className="text-slate-950 font-black text-sm tracking-tight">VERIFIED ANALYSIS</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-bold border border-white/10 uppercase tracking-widest">
                  {Math.round(data.confidence * 100)}% Conf.
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onReset}
            className="group w-full py-5 bg-slate-800/50 hover:bg-slate-700/80 border border-white/5 hover:border-yellow-500/30 rounded-2xl transition-all duration-300 font-bold flex items-center justify-center gap-3 text-slate-300 hover:text-yellow-500 shadow-xl"
          >
            <i className="fas fa-magnifying-glass-plus group-hover:rotate-12 transition-transform"></i>
            CATALOG NEW DISCOVERY
          </button>
        </div>

        {/* Right: Curatorial Details */}
        <div className="lg:col-span-7 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-yellow-500 font-bold tracking-[0.2em] text-sm uppercase">
              <span className="w-8 h-px bg-yellow-500/50"></span>
              Artifact Dossier
            </div>
            <h2 className="text-4xl md:text-6xl font-antique font-bold leading-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
              {data.name}
            </h2>
            <p className="text-xl text-yellow-200/60 font-medium italic font-serif border-l-2 border-yellow-500/30 pl-6 py-2 leading-relaxed">
              "{data.significance}"
            </p>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Geographic Origin', value: data.originLocation, icon: 'fa-earth-americas' },
              { label: 'Historical Period', value: data.period, icon: 'fa-hourglass-half' },
              { label: 'Associated Culture', value: data.culture, icon: 'fa-landmark' },
              { label: 'Estimated Date', value: data.estimatedYear, icon: 'fa-calendar-day' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-yellow-500/20 transition-colors group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-yellow-500/70 group-hover:text-yellow-500 transition-colors">
                    <i className={`fas ${stat.icon}`}></i>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">{stat.label}</span>
                </div>
                <p className="text-lg font-semibold text-slate-200">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <h4 className="text-sm uppercase tracking-[0.2em] text-yellow-500 font-bold flex items-center gap-2">
                <i className="fas fa-feather-pointed"></i>
                Historical Narrative
              </h4>
              <p className="text-slate-300 leading-relaxed text-lg">
                {data.description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/5">
              <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">Primary Composition</h4>
              <div className="flex flex-wrap gap-2">
                {data.materials.map((m, i) => (
                  <span key={i} className="px-4 py-2 bg-yellow-500/5 hover:bg-yellow-500/10 rounded-xl text-sm border border-yellow-500/10 text-yellow-500/80 capitalize font-medium transition-colors">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
            <i className="fas fa-info-circle text-blue-400 mt-1"></i>
            <p className="text-sm text-slate-400 leading-relaxed">
              This analysis is generated by a large language model. While highly accurate for major historical pieces, for precise archeological authentication, always consult a professional curatorial board.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
