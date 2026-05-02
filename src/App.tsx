/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Settings, 
  Terminal, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Zap, 
  ArrowRight, 
  Target, 
  LayoutDashboard,
  Loader2,
  ChevronRight,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { analyzeIdea, AnalysisResult } from './services/geminiService';
import { cn } from './lib/utils';

export default function App() {
  const [idea, setIdea] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (!idea.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeIdea(idea);
      setResult(analysis);
      // Wait for animation frame to scroll
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      {/* Nav / Header */}
      <nav className="relative z-10 border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center rotate-45">
            <Terminal className="-rotate-45 text-black w-5 h-5" />
          </div>
          <div>
            <h1 className="font-mono font-bold tracking-tighter text-lg uppercase italic">Ideon</h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 -mt-1">Expert Analyst System</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-zinc-500 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section / Input Area */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-balance">
              Analyze Your Next <span className="text-emerald-500 italic">Billicorn</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto text-balance">
              Ideon provides professional market research, user personas, risk management, and product strategy analysis for your startup idea.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative bg-zinc-900/50 p-1 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl"
        >
          <div className="relative">
            <textarea
              className="w-full h-48 bg-transparent text-zinc-100 p-8 text-xl font-light placeholder:text-zinc-700 focus:outline-none resize-none border-none"
              placeholder="Describe your startup idea in detail... e.g., 'A decentralized marketplace for computing power used by smaller AI labs...'"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              disabled={isAnalyzing}
            />
            <div className="absolute bottom-6 right-6 flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest hidden sm:block">
                Ready for Analysis
              </span>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !idea.trim()}
                className={cn(
                  "flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-emerald-500/20",
                  isAnalyzing && "px-8"
                )}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze Idea</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-center font-mono text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-24 pb-24"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <LayoutDashboard className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">Analysis Output v1.0</h3>
                </div>
                <button 
                  onClick={() => setShowRaw(!showRaw)}
                  className="flex items-center gap-2 px-3 py-1 bg-zinc-800/50 hover:bg-zinc-800 rounded-md text-[10px] font-mono uppercase border border-zinc-700 transition-colors"
                >
                  {showRaw ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {showRaw ? "Hide Raw JSON" : "View Raw JSON"}
                </button>
              </div>

              {showRaw ? (
                <motion.pre 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 bg-black border border-zinc-800 rounded-2xl font-mono text-xs overflow-auto text-emerald-400"
                >
                  {JSON.stringify(result, null, 2)}
                </motion.pre>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Score Card */}
                  <div className="md:col-span-4 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                      <TrendingUp className="w-5 h-5 text-zinc-700 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <div className="relative mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="58"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-zinc-800"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="58"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={364.4}
                          initial={{ strokeDashoffset: 364.4 }}
                          animate={{ strokeDashoffset: 364.4 - (364.4 * result.score) / 10 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="text-emerald-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold font-mono">{result.score}</span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">IDEON Score</span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 font-medium px-4">
                      {result.score >= 8 ? "High market potential. Experts recommend immediate prototyping." : 
                       result.score >= 5 ? "Moderate potential. Strategy adjustments suggested before scaling." : 
                       "Low immediate viability. Core value proposition requires significant pivot."}
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="md:col-span-8 bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl">
                    <div className="flex items-center gap-2 mb-4 text-emerald-500">
                      <Zap className="w-4 h-4 fill-emerald-500" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">Executive Summary</span>
                    </div>
                    <p className="text-2xl font-light leading-relaxed text-zinc-200">
                      {result.summary}
                    </p>
                    <div className="mt-8 pt-8 border-t border-zinc-800">
                      <div className="flex items-center gap-2 mb-2 text-zinc-500">
                        <Search className="w-3 h-3" />
                        <span className="text-[10px] font-mono uppercase">Problem Identification</span>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {result.problem}
                      </p>
                    </div>
                  </div>

                  {/* Users & Features Grid */}
                  <div className="md:col-span-6 grid grid-cols-1 gap-6">
                    <section className="bg-zinc-900/20 border border-white/5 p-6 rounded-2xl">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-sky-400" />
                        <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300">Target Audience</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.target_users.map((user, i) => (
                          <span key={i} className="px-3 py-1 bg-sky-400/10 border border-sky-400/20 text-sky-400 text-[10px] font-mono rounded-full">
                            {user}
                          </span>
                        ))}
                      </div>
                    </section>
                    
                    <section className="bg-zinc-900/20 border border-white/5 p-6 rounded-2xl">
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300">Core Features</h4>
                      </div>
                      <ul className="space-y-3">
                        {result.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 mt-1.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* Market & Next Steps */}
                  <div className="md:col-span-6 grid grid-cols-1 gap-6">
                    <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300">Market Potential</h4>
                      </div>
                      <p className="text-sm text-zinc-400 italic">
                        "{result.market_potential}"
                      </p>
                    </section>

                    <section className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
                      <div className="flex items-center gap-2 mb-4">
                        <RefreshCw className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400">Next Tactical Steps</h4>
                      </div>
                      <ul className="space-y-2">
                        {result.next_steps.map((step, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-zinc-300 font-medium">
                            <ChevronRight className="w-4 h-4 text-emerald-500" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* Risks & Future */}
                  <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
                    <section className="bg-red-500/[0.02] border border-red-500/10 p-6 rounded-2xl">
                      <div className="flex items-center gap-2 mb-4 text-red-500/70">
                        <AlertTriangle className="w-4 h-4" />
                        <h4 className="text-xs font-mono uppercase tracking-widest">Calculated Risks</h4>
                      </div>
                      <ul className="grid grid-cols-1 gap-2">
                        {result.risks.map((risk, i) => (
                          <li key={i} className="text-xs text-zinc-500 flex items-start gap-2">
                            <span className="text-red-500/50">•</span>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </section>
                    
                    <section className="bg-indigo-500/[0.02] border border-indigo-500/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-2 mb-4 text-indigo-400">
                        <TrendingUp className="w-4 h-4" />
                        <h4 className="text-xs font-mono uppercase tracking-widest">Future Roadmap</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.future_scope.map((scope, i) => (
                          <div key={i} className="px-4 py-2 bg-indigo-500/5 border border-indigo-500/10 text-indigo-300 text-[10px] font-mono rounded-lg">
                            {scope}
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Details */}
      <footer className="relative z-10 max-w-5xl mx-auto px-6 py-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           <Terminal className="w-5 h-5" />
           <span className="font-mono text-[10px] uppercase tracking-widest">IDEON v1.0.0 ANALYST SYSTEM</span>
        </div>
        <div className="flex gap-8 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          <a href="#" className="hover:text-emerald-500 transition-colors">Documentation</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">Systems Info</a>
        </div>
      </footer>
    </div>
  );
}
