
import React, { useState } from 'react';
import { OptimizationResult } from './types';
import { optimizeShortContent } from './services/geminiService';
import SectionCard from './components/SectionCard';

const App: React.FC = () => {
  const [inputScript, setInputScript] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!inputScript.trim()) return;

    setIsOptimizing(true);
    setError(null);
    try {
      const data = await optimizeShortContent(inputScript);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error(err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setInputScript('');
    setError(null);
  };

  return (
    <div className="min-h-screen pb-20 bg-[#F7F9FC]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-lg shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-gray-900 tracking-tighter">SHORTS<span className="text-red-600">PRO</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 uppercase tracking-widest">
              Private Studio
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-orange-400 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">
              ME
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        {!result ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10">
              <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Welcome back! 👋</h2>
              <p className="text-lg text-gray-500 font-medium">Ready to turn your script into a viral hit? Paste it below.</p>
            </div>

            <div className="bg-white rounded-[32px] shadow-2xl shadow-gray-200/50 p-6 md:p-10 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/>
                </svg>
              </div>

              <textarea
                value={inputScript}
                onChange={(e) => setInputScript(e.target.value)}
                placeholder="Paste your raw script ideas here... Gemini will handle the formatting, shots, and SEO."
                className="w-full h-72 p-8 bg-gray-50/50 border-2 border-gray-100 rounded-[24px] focus:ring-8 focus:ring-red-50 focus:border-red-500 focus:bg-white outline-none transition-all text-gray-800 text-xl leading-relaxed resize-none shadow-inner"
              />

              <div className="mt-8 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border border-white" />)}
                   </div>
                   <p className="text-sm font-bold text-gray-400">
                     Optimized for 60-90 seconds retention.
                   </p>
                </div>
                
                <button
                  onClick={handleOptimize}
                  disabled={isOptimizing || !inputScript.trim()}
                  className={`w-full md:w-auto px-12 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
                    isOptimizing || !inputScript.trim()
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-gray-900 text-white hover:bg-black hover:-translate-y-1'
                  }`}
                >
                  {isOptimizing ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      CRAFTING...
                    </>
                  ) : (
                    <>
                      <span>OPTIMIZE NOW</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="mt-8 p-5 bg-red-50 border-2 border-red-100 rounded-2xl text-red-600 font-bold flex items-center gap-3 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={handleReset}
                className="bg-white px-4 py-2 rounded-xl text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-bold border border-gray-200 shadow-sm transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                NEW SCRIPT
              </button>
              <div className="text-right">
                <h2 className="text-2xl font-black text-gray-900 leading-none">OPTIMIZED!</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Ready for production</p>
              </div>
            </div>

            {/* Refined Script Section - Now SHOT WISE */}
            <SectionCard 
              title="Shot-by-Shot Script Breakdown" 
              content={result.refinedScript} 
              variant="shots"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              }
            />

            {/* Titles Section */}
            <SectionCard 
              title="Top 5 Searchable SEO Titles" 
              content={result.titles} 
              variant="list"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              }
            />

            {/* Description Section */}
            <SectionCard 
              title="SEO Optimized Video Description" 
              content={result.description} 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              }
            />

            {/* Editing Guide Section */}
            <SectionCard 
              title="Master Editing Strategy" 
              content={result.editingGuide} 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.487l1.174 2.14a1 1 0 00.825.506l2.397.12a1 1 0 01.556 1.711l-1.83 1.55a1 1 0 00-.328.959l.53 2.36a1 1 0 01-1.492 1.084l-2.062-1.238a1 1 0 00-1.034 0l-2.062 1.238a1 1 0 01-1.492-1.084l.53-2.36a1 1 0 00-.328-.959l-1.83-1.55a1 1 0 01.556-1.711l2.397-.12a1 1 0 00.825-.506l1.174-2.14a1 1 0 01.897-.487zM6 18a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              }
            />

            <div className="flex flex-col items-center mt-12 pb-20 space-y-4">
               <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black shadow-2xl hover:bg-black transition-all flex items-center gap-3 transform hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                SCROLL TO TOP
              </button>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Designed for your success</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100 mt-20 text-center">
         <p className="text-gray-400 text-sm font-medium">SHORTSPRO v2.0 • Your Personal Script Studio</p>
      </footer>
    </div>
  );
};

export default App;
