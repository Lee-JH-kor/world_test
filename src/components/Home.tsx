/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Play, HelpCircle, MessageSquare, Heart, Compass, ShieldCheck, Cpu, Target, Sparkles, Gem, Bot, Award } from 'lucide-react';
import { ODProgram } from '../types';
import { OD_PROGRAMS } from '../data';

interface HomeProps {
  onStartTournament: () => void;
}

export function renderODIcon(name: string, className = "w-6 h-6") {
  switch (name) {
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Target': return <Target className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Gem': return <Gem className={className} />;
    case 'Bot': return <Bot className={className} />;
    default: return <HelpCircle className={className} />;
  }
}

export function getThemeColorClasses(themeColor: ODProgram['themeColor']) {
  switch (themeColor) {
    case 'indigo':
      return {
        bg: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:border-indigo-400',
        badge: 'bg-indigo-100 text-indigo-800',
        glow: 'hover:shadow-indigo-100',
        solid: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
        text: 'text-indigo-600',
        accentBorder: 'border-indigo-500'
      };
    case 'rose':
      return {
        bg: 'bg-rose-50 border-rose-200 text-rose-700 hover:border-rose-400',
        badge: 'bg-rose-100 text-rose-800',
        glow: 'hover:shadow-rose-100',
        solid: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500',
        text: 'text-rose-600',
        accentBorder: 'border-rose-500'
      };
    case 'amber':
      return {
        bg: 'bg-amber-50 border-amber-200 text-amber-700 hover:border-amber-400',
        badge: 'bg-amber-100 text-amber-800',
        glow: 'hover:shadow-amber-100',
        solid: 'bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500',
        text: 'text-amber-600',
        accentBorder: 'border-amber-500'
      };
    case 'emerald':
      return {
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-400',
        badge: 'bg-emerald-100 text-emerald-800',
        glow: 'hover:shadow-emerald-100',
        solid: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500',
        text: 'text-emerald-600',
        accentBorder: 'border-emerald-500'
      };
    case 'violet':
      return {
        bg: 'bg-violet-50 border-violet-200 text-violet-700 hover:border-violet-400',
        badge: 'bg-violet-100 text-violet-800',
        glow: 'hover:shadow-violet-100',
        solid: 'bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-500',
        text: 'text-violet-600',
        accentBorder: 'border-violet-500'
      };
    case 'blue':
      return {
        bg: 'bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-400',
        badge: 'bg-blue-100 text-blue-800',
        glow: 'hover:shadow-blue-100',
        solid: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        text: 'text-blue-600',
        accentBorder: 'border-blue-500'
      };
    case 'orange':
      return {
        bg: 'bg-orange-50 border-orange-200 text-orange-700 hover:border-orange-400',
        badge: 'bg-orange-100 text-orange-800',
        glow: 'hover:shadow-orange-100',
        solid: 'bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500',
        text: 'text-orange-600',
        accentBorder: 'border-orange-500'
      };
    case 'cyan':
      return {
        bg: 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:border-cyan-400',
        badge: 'bg-cyan-100 text-cyan-800',
        glow: 'hover:shadow-cyan-100',
        solid: 'bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500',
        text: 'text-cyan-600',
        accentBorder: 'border-cyan-500'
      };
    case 'fuchsia':
      return {
        bg: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700 hover:border-fuchsia-400',
        badge: 'bg-fuchsia-100 text-fuchsia-800',
        glow: 'hover:shadow-fuchsia-100',
        solid: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white focus:ring-fuchsia-500',
        text: 'text-fuchsia-600',
        accentBorder: 'border-fuchsia-500'
      };
    default:
      return {
        bg: 'bg-gray-50 border-gray-200 text-gray-700',
        badge: 'bg-gray-100 text-gray-800',
        glow: 'hover:shadow-gray-100',
        solid: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
        text: 'text-gray-600',
        accentBorder: 'border-gray-500'
      };
  }
}

export default function Home({ onStartTournament }: HomeProps) {
  // Staggered motion configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Hero Header Section */}
      <div className="text-center mb-12 relative">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 mb-6 text-sm font-medium"
        >
          <Award id="hero-badge" className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>조직개발(OD) 맞춤 추천 토너먼트</span>
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6 font-sans leading-tight"
        >
          우리 조직에 딱 맞는<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            조직개발 프로그램 월드컵
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          소통 오해, 소리 없는 퇴사, 방향성 실종 등 우리 팀만의 가려운 곳을 긁어줄
          최고의 처방전을 찾아보세요. 대결을 거듭하며 최후의 1개 맞춤형 워크숍이 결정됩니다!
        </motion.p>

        {/* Big Start Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
          className="flex justify-center"
        >
          <button
            id="start-worldcup-btn"
            onClick={onStartTournament}
            className="group relative flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer overflow-hidden"
          >
            {/* Soft inner glow */}
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            
            <Play className="w-5 h-5 fill-white" />
            <span>토너먼트 시작하기</span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs bg-indigo-500 rounded-md font-mono text-indigo-100">
              9 Candidates
            </span>
          </button>
        </motion.div>
      </div>

      {/* Guide Card Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6 bg-slate-50 rounded-2xl p-6 mb-16 border border-slate-200"
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">1</div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">토너먼트 매치</h4>
            <p className="text-sm text-gray-600">9개의 워크숍이 랜덤하게 대진표를 구성해 1대1 매치를 펼칩니다.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">2</div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">위트있는 대결과 진단</h4>
            <p className="text-sm text-gray-600">진짜 우리 회사 상황에 깊이 와닿는 가려움과 혜택을 보고 하나씩 선택합니다.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">3</div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">맞춤형 정밀 처방전</h4>
            <p className="text-sm text-gray-600">최종 우승한 단 하나의 워크숍에 대해 실전 커리큘럼과 처방전을 발급해 드립니다.</p>
          </div>
        </div>
      </motion.div>

      {/* Candidate Programs Grid */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">참가 워크숍 후보 둘러보기</h2>
            <p className="text-sm text-gray-500">각 대결에서 활약할 9가지 최고급 조직개발 라인업입니다.</p>
          </div>
          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            Total Lineup: 9 Programs
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {OD_PROGRAMS.map((program) => {
            const colors = getThemeColorClasses(program.themeColor);
            return (
              <motion.div
                key={program.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`flex flex-col h-full bg-white border rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md ${colors.glow}`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl border ${colors.bg}`}>
                    {renderODIcon(program.iconName, 'w-6 h-6')}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">OD PROGRAM</span>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{program.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-gray-500 italic mb-3">
                  "{program.subTitle}"
                </p>

                {/* Symptom block */}
                <div className="mt-auto bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-gray-600">
                  <span className="font-semibold text-red-500 block mb-1">🚨 이런 조직에 강력 추천:</span>
                  <p className="leading-relaxed line-clamp-3">{program.symptom}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
