import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Check } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function AnswerOption({
  index,
  text,
  selectedAnswer,
  correctAnswer,
  isAnswered,
  isTimeout,
  onSelect
}) {
  const isSelected = selectedAnswer === index;
  const isCorrect = correctAnswer === index;
  const letter = LETTERS[index] || String.fromCharCode(65 + index);

  // Charcoal Black + Mud + Light Blue Palette
  let cardStyle = "bg-[#181A20]/85 border-[#2E333F] hover:border-sky-400/50 hover:bg-[#21242E] text-slate-100 hover:shadow-lg hover:shadow-sky-500/10 cursor-pointer";
  let letterBadgeStyle = "bg-[#252833] text-[#D4B996] border-[#3A3F4E]";
  let statusIcon = null;

  if (isAnswered) {
    if (isSelected && isCorrect) {
      // User picked correct answer
      cardStyle = "bg-emerald-950/40 border-emerald-500/80 text-emerald-100 shadow-lg shadow-emerald-500/20";
      letterBadgeStyle = "bg-emerald-500 text-slate-950 border-emerald-400 font-bold";
      statusIcon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
    } else if (isSelected && !isCorrect) {
      // User picked wrong answer
      cardStyle = "bg-rose-950/40 border-rose-500/80 text-rose-100 shadow-lg shadow-rose-500/20";
      letterBadgeStyle = "bg-rose-500 text-white border-rose-400 font-bold";
      statusIcon = <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
    } else if (isCorrect) {
      // Reveal the correct answer because user was wrong or timed out
      cardStyle = "bg-emerald-950/30 border-emerald-500/60 text-emerald-200 border-dashed";
      letterBadgeStyle = "bg-emerald-600/30 text-emerald-300 border-emerald-500/50 font-bold";
      statusIcon = (
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
          <Check className="w-3.5 h-3.5" /> Correct Answer
        </span>
      );
    } else {
      // Other unselected options
      cardStyle = "bg-[#13151A]/50 border-[#20222A] text-slate-500 opacity-60";
      letterBadgeStyle = "bg-[#1D2028] text-slate-500 border-[#292D38]";
    }
  }

  return (
    <motion.button
      type="button"
      disabled={isAnswered}
      onClick={() => onSelect(index)}
      whileHover={!isAnswered ? { scale: 1.012 } : {}}
      whileTap={!isAnswered ? { scale: 0.99 } : {}}
      className={`group w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 text-left outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 ${cardStyle}`}
    >
      <div className="flex items-center gap-3.5 min-w-0 pr-2">
        <span
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors shrink-0 shadow-inner ${letterBadgeStyle}`}
        >
          {letter}
        </span>
        <span className="text-sm md:text-base font-medium break-words leading-snug">
          {text}
        </span>
      </div>

      {statusIcon && (
        <div className="shrink-0 pl-2">
          {statusIcon}
        </div>
      )}
    </motion.button>
  );
}
