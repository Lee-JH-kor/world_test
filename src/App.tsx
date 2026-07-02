/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Zap } from 'lucide-react';
import { ODProgram, TournamentState } from './types';
import Home from './components/Home';
import Tournament from './components/Tournament';
import Results from './components/Results';

type AppState = 'home' | 'tournament' | 'results';

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [winner, setWinner] = useState<ODProgram | null>(null);
  const [history, setHistory] = useState<TournamentState['history']>([]);

  // Triggered when starting the tournament
  const handleStartTournament = () => {
    setWinner(null);
    setHistory([]);
    setAppState('tournament');
  };

  // Triggered when tournament finishes with a single survivor
  const handleFinishTournament = (finalWinner: ODProgram, tournamentHistory: TournamentState['history']) => {
    setWinner(finalWinner);
    setHistory(tournamentHistory);
    setAppState('results');
  };

  // Return to home screen
  const handleGoHome = () => {
    setAppState('home');
    setWinner(null);
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 flex flex-col justify-between relative selection:bg-indigo-500 selection:text-white font-sans">
      {/* Soft Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Global Navigation / Branding Bar */}
      <header className="relative z-10 bg-white/70 backdrop-blur-md border-b border-slate-100 sticky top-0 px-4 py-3 md:py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div
            onClick={handleGoHome}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-100 group-hover:scale-110 transition-transform">
              <Zap className="w-4.5 h-4.5 fill-white" />
            </div>
            <div>
              <h1 className="font-extrabold tracking-tight text-gray-900 text-sm md:text-base leading-none">
                조직개발 월드컵
              </h1>
              <span className="text-[10px] text-indigo-600 font-bold uppercase font-mono tracking-widest leading-none block mt-0.5">
                OD MATCHUP WORK CUP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Diagnostic Mode Live</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Dynamic View Wrapper */}
      <main className="relative z-10 flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          {appState === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <Home onStartTournament={handleStartTournament} />
            </motion.div>
          )}

          {appState === 'tournament' && (
            <motion.div
              key="tournament"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <Tournament
                onFinishTournament={handleFinishTournament}
                onGoHome={handleGoHome}
              />
            </motion.div>
          )}

          {appState === 'results' && winner && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <Results
                winner={winner}
                history={history}
                onRestart={handleStartTournament}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Simple Footer */}
      <footer className="relative z-10 border-t border-slate-100 bg-slate-50/50 py-6 px-4 text-center mt-12">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-xs text-gray-400 font-medium font-sans">
            © 2026 조직개발 프로그램 추천 월드컵. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-400 leading-normal max-w-lg mx-auto">
            본 서비스는 각 조직의 당면한 갈등 상황, 소통 패턴, 업무 방식을 토너먼트 형식으로 자가 진단하여 최적의 조직개발(OD) 맞춤형 워크숍을 재미있고 위트 있게 제안해 드립니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
