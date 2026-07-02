/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight, Sparkles, Award, ArrowRight, CornerDownRight } from 'lucide-react';
import { ODProgram, TournamentMatch, TournamentState } from '../types';
import { OD_PROGRAMS } from '../data';
import { renderODIcon, getThemeColorClasses } from './Home';

interface TournamentProps {
  onFinishTournament: (winner: ODProgram, history: TournamentState['history']) => void;
  onGoHome: () => void;
}

// Simple shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Tournament({ onFinishTournament, onGoHome }: TournamentProps) {
  const [state, setState] = useState<TournamentState | null>(null);
  const [showByeIntermission, setShowByeIntermission] = useState<boolean>(false);
  const [selectedMatchWinnerId, setSelectedMatchWinnerId] = useState<string | null>(null);

  // Initialize tournament on mount
  useEffect(() => {
    const shuffled = shuffleArray(OD_PROGRAMS);
    setupRound(shuffled, "초반전 (9강)", []);
  }, []);

  // Helper to setup a round
  const setupRound = (programs: ODProgram[], roundName: string, currentHistory: TournamentState['history']) => {
    const matches: TournamentMatch[] = [];
    const byePrograms: ODProgram[] = [];

    // Pair them up
    for (let i = 0; i < programs.length; i += 2) {
      if (i + 1 < programs.length) {
        matches.push({
          programA: programs[i],
          programB: programs[i + 1],
        });
      } else {
        // Odd one out gets a bye
        byePrograms.push(programs[i]);
      }
    }

    setState({
      currentRoundPrograms: programs,
      nextRoundPrograms: [],
      byePrograms,
      currentMatchIndex: 0,
      matches,
      roundName,
      history: currentHistory,
    });
    setShowByeIntermission(false);
    setSelectedMatchWinnerId(null);
  };

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">대진표를 구성하고 있습니다...</p>
      </div>
    );
  }

  const { matches, currentMatchIndex, roundName, byePrograms, nextRoundPrograms, history } = state;
  const isRoundOver = currentMatchIndex >= matches.length;

  // Decide next step when current active matches are over
  const handleProceedNextRound = () => {
    const survivors = [...nextRoundPrograms, ...byePrograms];

    if (survivors.length === 1) {
      // We have a final winner!
      onFinishTournament(survivors[0], history);
      return;
    }

    // Otherwise determine next round name
    let nextRoundName = "다음 라운드";
    const nextCount = survivors.length;
    if (nextCount === 5) {
      nextRoundName = "준준결승 (5강)";
    } else if (nextCount === 3) {
      nextRoundName = "준결승 (3강)";
    } else if (nextCount === 2) {
      nextRoundName = "대망의 결승전 (Finals)";
    } else {
      nextRoundName = `${nextCount}강전`;
    }

    // Shuffle survivors for fresh matchups
    setupRound(shuffleArray(survivors), nextRoundName, history);
  };

  // When a program is selected as winner of the current match
  const handleSelectWinner = (winner: ODProgram, loser: ODProgram) => {
    if (selectedMatchWinnerId) return; // Prevent double clicks during transition

    setSelectedMatchWinnerId(winner.id);

    // Animate transition slightly before updating state
    setTimeout(() => {
      const updatedHistory = [
        ...history,
        {
          winner,
          loser,
          roundName,
        }
      ];

      const updatedNextRound = [...nextRoundPrograms, winner];
      const updatedMatchIndex = currentMatchIndex + 1;

      setState(prev => {
        if (!prev) return null;
        return {
          ...prev,
          nextRoundPrograms: updatedNextRound,
          currentMatchIndex: updatedMatchIndex,
          history: updatedHistory
        };
      });

      setSelectedMatchWinnerId(null);

      // If active matches of the round just finished and there's a bye, trigger the bye intermission view
      if (updatedMatchIndex >= matches.length && byePrograms.length > 0) {
        setShowByeIntermission(true);
      }
    }, 450);
  };

  // Active Match Context
  const currentMatch = !isRoundOver ? matches[currentMatchIndex] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Top Tournament Header Progress */}
      <div className="mb-8 md:mb-12">
        <div className="flex justify-between items-center mb-3">
          <button
            id="back-to-home-btn"
            onClick={onGoHome}
            className="text-xs font-semibold text-gray-400 hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            ← 월드컵 홈으로 돌아가기
          </button>
          <span className="text-sm font-semibold px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono">
            {roundName}
          </span>
        </div>

        {/* Progress bar */}
        {!isRoundOver && (
          <div>
            <div className="flex justify-between items-end text-xs text-gray-500 mb-1.5 font-mono">
              <span>Match {currentMatchIndex + 1} of {matches.length}</span>
              <span>{Math.round(((currentMatchIndex) / matches.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <motion.div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentMatchIndex) / matches.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showByeIntermission && byePrograms.length > 0 ? (
          /* Lucky Bye Card Intermission */
          <motion.div
            key="bye-intermission"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            className="max-w-xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8 text-center shadow-xl relative overflow-hidden"
          >
            {/* Soft decorative light */}
            <div className="absolute -right-20 -top-20 w-48 h-48 bg-amber-200 rounded-full blur-3xl opacity-40 pointer-events-none" />

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 border border-amber-200 mb-5 text-3xl shadow-sm">
              🍀
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              운수 대통! 부전승 자동 진출
            </h2>
            <p className="text-sm text-amber-800 mb-8 max-w-sm mx-auto">
              현재 라운드 대진 홀수로 인해 아래 프로그램이 매치 없이 곧바로 다음 라운드로 행운의 자동 패스를 받았습니다!
            </p>

            {/* Program Card Preview */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm text-left mb-8 max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl border ${getThemeColorClasses(byePrograms[0].themeColor).bg}`}>
                  {renderODIcon(byePrograms[0].iconName, 'w-5 h-5')}
                </div>
                <div>
                  <span className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider">Lucky Pass</span>
                  <h4 className="font-bold text-gray-900 text-base leading-tight">{byePrograms[0].anonymousTitle}</h4>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-xs text-gray-600 border border-slate-100">
                <span className="font-semibold text-red-500 block mb-1">🚨 추천 조직 증상:</span>
                <p className="line-clamp-2 leading-relaxed">{byePrograms[0].symptom}</p>
              </div>
            </div>

            <button
              id="proceed-after-bye-btn"
              onClick={handleProceedNextRound}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-orange-100 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>다음 라운드로 넘어가기</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        ) : isRoundOver ? (
          /* Round Completed Intermission */
          <motion.div
            key="round-completed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-md mx-auto text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
              <Sparkles className="w-8 h-8 text-indigo-600 animate-bounce" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-3">
              이번 라운드가 끝났습니다!
            </h2>
            <p className="text-gray-500 mb-8 text-sm">
              선택된 워크숍 후보들을 가지고 다음 토너먼트 대진표를 다시 맞춥니다.
            </p>

            <button
              id="proceed-next-round-btn"
              onClick={handleProceedNextRound}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all duration-300 cursor-pointer"
            >
              <span>다음 라운드 진행하기</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        ) : (
          /* Normal 1-vs-1 Matchup Grid */
          <div key="matchup" className="relative">
            {/* Match Counter Label */}
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 font-mono bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
                어떤 조직이 가장 되고싶으신가요?
              </span>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mt-3 max-w-3xl mx-auto px-4 leading-normal">
                {roundName} • Match {currentMatchIndex + 1}
              </h2>
            </div>

            {/* Duel Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative items-stretch mt-8">
              {/* VS Divider inside grid */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 text-white font-extrabold text-sm tracking-wider shadow-lg border border-slate-700 select-none animate-pulse">
                VS
              </div>

              {/* Left Candidate (Program A) */}
              {currentMatch && (
                <motion.div
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -60, opacity: 0 }}
                  transition={{ type: 'spring', damping: 20 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => handleSelectWinner(currentMatch.programA, currentMatch.programB)}
                  className={`group relative flex flex-col justify-between bg-white border border-slate-200 hover:border-${currentMatch.programA.themeColor}-400 rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl ${getThemeColorClasses(currentMatch.programA.themeColor).glow} overflow-hidden ${selectedMatchWinnerId === currentMatch.programA.id ? 'ring-4 ring-indigo-500 scale-[1.02]' : ''}`}
                >
                  {/* Highlight selection background */}
                  {selectedMatchWinnerId === currentMatch.programA.id && (
                    <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none z-0" />
                  )}

                  {/* Program Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-2xl border ${getThemeColorClasses(currentMatch.programA.themeColor).bg} group-hover:scale-110 transition-transform`}>
                        {renderODIcon(currentMatch.programA.iconName, 'w-6 h-6')}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold uppercase text-gray-400">Option A</span>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                          {currentMatch.programA.anonymousTitle}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Relatable Symptom (The Pain) */}
                  <div className="relative z-10 bg-rose-50 border border-rose-100/70 rounded-2xl p-4 md:p-5 mb-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase mb-2">
                      🚨 우리 조직의 아픈 아우성:
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {currentMatch.programA.symptom}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="relative z-10 mb-8 flex-grow">
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-3">
                      💡 이런 매력적인 혜택이 있어요:
                    </span>
                    <ul className="space-y-2.5">
                      {currentMatch.programA.keyBenefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed">
                          <CornerDownRight className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${getThemeColorClasses(currentMatch.programA.themeColor).text}`} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button action */}
                  <div className="relative z-10 mt-auto">
                    <button
                      type="button"
                      className={`w-full py-4 px-6 rounded-xl font-bold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.01] ${getThemeColorClasses(currentMatch.programA.themeColor).solid}`}
                    >
                      <span>우리 조직에 필요해! 선택</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Right Candidate (Program B) */}
              {currentMatch && (
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 60, opacity: 0 }}
                  transition={{ type: 'spring', damping: 20 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => handleSelectWinner(currentMatch.programB, currentMatch.programA)}
                  className={`group relative flex flex-col justify-between bg-white border border-slate-200 hover:border-${currentMatch.programB.themeColor}-400 rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl ${getThemeColorClasses(currentMatch.programB.themeColor).glow} overflow-hidden ${selectedMatchWinnerId === currentMatch.programB.id ? 'ring-4 ring-indigo-500 scale-[1.02]' : ''}`}
                >
                  {/* Highlight selection background */}
                  {selectedMatchWinnerId === currentMatch.programB.id && (
                    <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none z-0" />
                  )}

                  {/* Program Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-2xl border ${getThemeColorClasses(currentMatch.programB.themeColor).bg} group-hover:scale-110 transition-transform`}>
                        {renderODIcon(currentMatch.programB.iconName, 'w-6 h-6')}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold uppercase text-gray-400">Option B</span>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                          {currentMatch.programB.anonymousTitle}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Relatable Symptom (The Pain) */}
                  <div className="relative z-10 bg-rose-50 border border-rose-100/70 rounded-2xl p-4 md:p-5 mb-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase mb-2">
                      🚨 우리 조직의 아픈 아우성:
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {currentMatch.programB.symptom}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="relative z-10 mb-8 flex-grow">
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-3">
                      💡 이런 매력적인 혜택이 있어요:
                    </span>
                    <ul className="space-y-2.5">
                      {currentMatch.programB.keyBenefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed">
                          <CornerDownRight className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${getThemeColorClasses(currentMatch.programB.themeColor).text}`} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button action */}
                  <div className="relative z-10 mt-auto">
                    <button
                      type="button"
                      className={`w-full py-4 px-6 rounded-xl font-bold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.01] ${getThemeColorClasses(currentMatch.programB.themeColor).solid}`}
                    >
                      <span>우리 조직에 필요해! 선택</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile visual VS indicator */}
            <div className="flex md:hidden justify-center items-center my-6">
              <span className="px-4 py-2 bg-slate-900 text-white rounded-full font-bold text-xs shadow-md tracking-widest border border-slate-700">
                VS
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
