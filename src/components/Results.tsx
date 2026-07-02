/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Clipboard, RefreshCw, Check, AlertCircle, Calendar, Sparkles, Trophy, BookOpen, Share2, CornerDownRight } from 'lucide-react';
import { ODProgram, TournamentState } from '../types';
import { renderODIcon, getThemeColorClasses } from './Home';
import Confetti from './Confetti';

interface ResultsProps {
  winner: ODProgram;
  history: TournamentState['history'];
  onRestart: () => void;
}

export default function Results({ winner, history, onRestart }: ResultsProps) {
  const [copied, setCopied] = useState(false);
  const colors = getThemeColorClasses(winner.themeColor);

  // Helper to copy results to clipboard as beautiful formatted text
  const handleCopyResults = () => {
    const historyText = history
      .map((item, idx) => `  [${item.roundName}] ${item.winner.title} vs ${item.loser.title} ➔ ${item.winner.title} 선택`)
      .join('\n');

    const shareText = `🏆 우리 조직 맞춤형 NO.1 추천 프로그램 결과 🏆

📍 최종 추천 워크숍: [ ${winner.title} ]
✨ "${winner.subTitle}"

🚨 우리 조직 진단 증상:
  "${winner.symptom}"

💊 전문 처방전:
  "${winner.prescription}"

📚 유쾌한 3단계 커리큘럼:
${winner.curriculum.map(c => `  • ${c.step} [${c.title}]: ${c.desc}`).join('\n')}

🎯 토너먼트 선택 여정:
${historyText}

---
💡 조직개발 프로그램 추천 월드컵에서 지금 진단해보세요!`;

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative">
      {/* Confetti Explosion Particle Canvas */}
      <Confetti />

      {/* Intro Celebratory Heading */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-200 text-amber-500 mb-6 shadow-md"
        >
          <Trophy className="w-10 h-10 animate-bounce text-amber-500" />
        </motion.div>

        <motion.h1
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
        >
          대망의 최종 선택 결과!
        </motion.h1>
        <p className="text-gray-500 text-sm mt-2">
          토너먼트 끝에 우리 조직에 가장 절실한 솔루션이 도출되었습니다.
        </p>
      </div>

      {/* Main Winner Crown Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
        className={`bg-white border-2 rounded-3xl p-6 md:p-10 shadow-xl mb-10 relative overflow-hidden border-${winner.themeColor}-400 ring-4 ring-${winner.themeColor}-50`}
      >
        {/* Soft decorative background glow */}
        <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none bg-${winner.themeColor}-400`} />

        {/* Card Header with Icon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl border ${colors.bg} shadow-sm flex items-center justify-center`}>
              {renderODIcon(winner.iconName, 'w-8 h-8')}
            </div>
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest font-mono ${colors.text}`}>
                🏆 CHAMPION RECOMENDED PROGRAM
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                {winner.title}
              </h2>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-slate-900 text-amber-400 border border-slate-800 text-xs font-bold">
              ★ 최고의 해결책 ★
            </span>
          </div>
        </div>

        {/* Dynamic relational context details */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Diagnostic Pain & Description */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                🔎 우리 팀의 가려운 핵심 증상
              </h4>
              <p className="text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-100/80 rounded-xl p-4 leading-relaxed">
                "{winner.symptom}"
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                📘 어떤 프로그램인가요?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {winner.description}
              </p>
            </div>

            {/* Checklists Benefits */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                🎯 이 워크숍으로 기대하는 시너지 효과:
              </h4>
              <ul className="space-y-2">
                {winner.keyBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-slate-700 font-medium">
                    <Check className={`w-4 h-4 flex-shrink-0 text-emerald-500 mt-0.5`} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Special Custom Prescription Alert */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className={`bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 rounded-2xl p-6 border border-slate-700 shadow-md h-full flex flex-col justify-between`}>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-xs font-bold tracking-widest text-amber-400 uppercase font-mono">
                    OD PRESCRIPTION
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-white mb-2">
                  조직개발 전문가의 처방 한마디 💊
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {winner.prescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Prescribed by OD World Cup</span>
                <span>Active 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Curriculum Visualizer */}
        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className={`w-5 h-5 ${colors.text}`} />
            <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">
              실전 워크숍 3단계 커리큘럼 미리보기 📚
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {winner.curriculum.map((c, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-5 relative group hover:bg-white hover:shadow-md hover:border-slate-200 transition-all duration-300"
              >
                <div className={`inline-flex px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md mb-3 ${colors.bg}`}>
                  {c.step}
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1.5 leading-snug">
                  {c.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Interactive Match Path History */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-10"
      >
        <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>우리 팀이 걸어온 선택의 여정 (Tournament Path)</span>
        </h3>
        <div className="space-y-3 max-h-56 overflow-y-auto pr-2 scrollbar-thin">
          {history.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white border border-slate-100 rounded-xl text-xs">
              <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-mono">
                {item.roundName}
              </span>
              <div className="flex items-center gap-2 flex-grow sm:justify-center">
                <span className="text-gray-500 font-medium">{item.loser.title}</span>
                <span className="text-gray-300">대신</span>
                <span className="font-bold text-gray-900">{item.winner.title}</span>
                <span className="text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">선택 ✔</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Buttons Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          id="copy-results-btn"
          onClick={handleCopyResults}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all duration-200 shadow-md cursor-pointer transform active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span>진단 결과 복사 완료!</span>
            </>
          ) : (
            <>
              <Clipboard className="w-4 h-4 text-slate-300" />
              <span>Slack/Notion 결과 공유 복사</span>
            </>
          )}
        </button>

        <button
          id="restart-tournament-btn"
          onClick={onRestart}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all duration-200 shadow-md cursor-pointer transform active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>월드컵 처음부터 다시하기</span>
        </button>
      </motion.div>
    </div>
  );
}
