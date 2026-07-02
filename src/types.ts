/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CurriculumStep {
  step: string;
  title: string;
  desc: string;
}

export interface ODProgram {
  id: string;
  title: string;
  subTitle: string;
  anonymousTitle: string;
  iconName: string; // Used to look up Lucide icons dynamically
  themeColor: 'indigo' | 'rose' | 'amber' | 'emerald' | 'violet' | 'blue' | 'orange' | 'cyan' | 'fuchsia';
  symptom: string;
  wittyQuestion: string;
  description: string;
  keyBenefits: string[];
  curriculum: CurriculumStep[];
  prescription: string;
}

export interface TournamentMatch {
  programA: ODProgram;
  programB: ODProgram;
}

export interface TournamentState {
  currentRoundPrograms: ODProgram[];
  nextRoundPrograms: ODProgram[];
  byePrograms: ODProgram[];
  currentMatchIndex: number;
  matches: TournamentMatch[];
  roundName: string;
  history: {
    winner: ODProgram;
    loser: ODProgram;
    roundName: string;
  }[];
}
