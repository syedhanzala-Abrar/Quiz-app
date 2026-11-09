import React from 'react';
import { Award, Trophy, Volume2, VolumeX, Flame } from 'lucide-react';
import Timer from './Timer';

export default function QuizHeader({
  currentQuestionIndex,
  totalQuestions,
  score,
  timeLeft,
  duration = 60,
  isZen = false,
  isAnswered,
  streak = 0,
  isMuted = false,
  onToggleSound,
  onQuit
}) {
  return (
    <header className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3.5 p-4 mb-2 rounded-2xl glass-card">
      {/* Brand logo & Exit action */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        <button
          onClick={onQuit}
          title="Return to Welcome Screen"
          className="flex items-center gap-2 text-left group hover:opacity-90 transition-opacity cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1E2129] border border-sky-400/40 flex items-center justify-center shadow-md shadow-black/50">
            <Award className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block leading-none">
              Quiz<span className="text-sky-400">Master</span>
            </span>
            <span className="text-[11px] text-[#A89078] group-hover:text-sky-300 transition-colors">
              Exit quiz
            </span>
          </div>
        </button>

        {/* Current question badge on mobile */}
        <div className="sm:hidden flex items-center gap-2">
          {streak >= 2 && (
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#231E18] border border-[#8C765E]/50 text-[#D4B996] text-xs font-bold animate-pulse">
              <Flame className="w-3.5 h-3.5 text-[#C4A482] fill-[#C4A482]" />
              <span>{streak}</span>
            </div>
          )}
          <div className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-300 text-xs font-semibold">
            Q {currentQuestionIndex + 1} / {totalQuestions}
          </div>
        </div>
      </div>

      {/* Center Question Tracker & Streak (desktop) */}
      <div className="hidden sm:flex items-center gap-3">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16181E] border border-[#2D313A]">
          <span className="text-xs text-slate-400 font-medium">Question</span>
          <span className="text-sm font-bold text-sky-300">
            {currentQuestionIndex + 1}
          </span>
          <span className="text-xs text-slate-500">of</span>
          <span className="text-xs text-slate-400 font-medium">
            {totalQuestions}
          </span>
        </div>

        {streak >= 2 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#231E18] border border-[#8C765E]/50 text-[#D4B996] text-xs font-bold shadow-sm shadow-black/30 animate-bounce">
            <Flame className="w-4 h-4 text-[#C4A482] fill-[#C4A482]" />
            <span>{streak} Streak!</span>
          </div>
        )}
      </div>

      {/* Score, Sound toggle & Timer */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2.5">
        {/* Sound toggle button */}
        <button
          onClick={onToggleSound}
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          className="p-2 rounded-xl bg-[#1A1C22] border border-[#2D313A] text-slate-300 hover:text-white hover:border-sky-400/40 transition-all cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-sky-400" />
          )}
        </button>

        {/* Live Score Counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#1A1C22] border border-[#2D313A]">
          <div className="p-1 rounded-lg bg-[#27231B] text-[#D4B996]">
            <Trophy className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A89078] leading-none">
              Score
            </span>
            <span
              className={`font-mono text-base font-bold leading-tight ${
                score > 0
                  ? 'text-emerald-400'
                  : score < 0
                  ? 'text-rose-400'
                  : 'text-slate-200'
              }`}
            >
              {score > 0 ? `+${score}` : score} pts
            </span>
          </div>
        </div>

        {/* Timer Component */}
        <Timer
          timeLeft={timeLeft}
          duration={duration}
          isZen={isZen}
          isAnswered={isAnswered}
        />
      </div>
    </header>
  );
}
