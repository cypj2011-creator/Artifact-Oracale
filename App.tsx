
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ImagePicker from './components/ImagePicker';
import AnalysisResult from './components/AnalysisResult';
import { analyzeArtifact } from './services/geminiService';
import { ArtifactAnalysis, AppState } from './types';

const LOADING_MESSAGES = [
  "Consulting historical archives...",
  "Analyzing material composition...",
  "Cross-referencing cultural motifs...",
  "Scanning patina signatures...",
  "Checking carbon dating databases...",
  "Determining geographic origin...",
  "Finalizing historical report..."
];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<ArtifactAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  useEffect(() => {
    let interval: number;
    if (state === AppState.LOADING) {
      interval = window.setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [state]);

  const handleImageSelected = useCallback(async (base64: string) => {
    setImage(base64);
    setState(AppState.LOADING);
    setLoadingMsgIndex(0);
    setError(null);

    try {
      const analysis = await analyzeArtifact(base64);
      setResult(analysis);
      setState(AppState.RESULT);
    } catch (err: any) {
      console.error("Archeology Analysis Failed:", err);
      setError(err.message || 'The artifact remains a mystery. Please try a clearer image.');
      setState(AppState.ERROR);
    }
  }, []);

  const resetApp = () => {
    setState(AppState.IDLE);
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-yellow-500/30 bg-[#0a0f1d] text-slate-200">
      <Header />
      
      <main className="flex-grow p-4 md:p-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-yellow-600/10 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {state === AppState.IDLE && (
            <div className="text-center py-12 md:py-32">
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase">
                AI-Powered Archeology
              </div>
              <h1 className="text-5xl md:text-8xl font-antique font-bold mb-8 tracking-tighter leading-none">
                Unlock the <span className="text-yellow-500 italic">Secrets</span> <br/>
                of Ancient <span className="underline decoration-yellow-500/30 underline-offset-8">Relics</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed">
                Identify ancient relics, lost artifacts, and historical treasures with the precision of AI curatorship.
              </p>
              <div className="transform transition-all hover:scale-[1.01]">
                <ImagePicker onImageSelected={handleImageSelected} />
              </div>
            </div>
          )}

          {state === AppState.LOADING && (
            <div className="flex flex-col items-center justify-center py-32 space-y-8">
              <div className="relative">
                <div className="w-32 h-32 border-2 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-eye text-yellow-500 text-2xl animate-pulse"></i>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-antique font-bold mb-3 tracking-wide">Analyzing Artifact</h2>
                <p className="text-slate-400 text-lg transition-all duration-500 h-8">
                  {LOADING_MESSAGES[loadingMsgIndex]}
                </p>
              </div>
            </div>
          )}

          {state === AppState.RESULT && result && image && (
            <AnalysisResult data={result} image={image} onReset={resetApp} />
          )}

          {state === AppState.ERROR && (
            <div className="max-w-xl mx-auto glass-panel p-10 rounded-3xl border-red-500/30 text-center shadow-2xl">
              <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <i className="fas fa-ghost text-3xl"></i>
              </div>
              <h2 className="text-3xl font-antique font-bold mb-4">Discovery Obscured</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">{error}</p>
              <button 
                onClick={resetApp}
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-2xl font-bold transition-all text-lg"
              >
                RETURN TO VAULT
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-12 text-center border-t border-white/5 bg-slate-950/20">
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-medium">
          Artifact Oracle &bull; Gemini-3 Precision Analysis &bull; Digital Curatorship
        </p>
      </footer>
    </div>
  );
};

export default App;
