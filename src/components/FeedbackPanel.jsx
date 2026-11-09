import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, Lightbulb, Trophy } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function FeedbackPanel({
  isCorrect,
  isTimeout,
  correctAnswerIndex,
  correctAnswerText,
  explanation,
  isLastQuestion,
  onNext,
  autoAdvanceSeconds
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`mt-6 p-5 md:p-6 rounded-2xl border transition-all ${
        isCorrect
          ? 'bg-emerald-950/30 border-emerald-500/40'
          : isTimeout
          ? 'bg-rose-950/30 border-rose-500/40'
          : 'bg-rose-950/25 border-rose-500/35'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Feedback Header and Status */}
        <div className="flex items-start gap-3.5">
          <div
            className={`p-2 rounded-xl shrink-0 mt-0.5 border ${
              isCorrect
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : isTimeout
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : isTimeout ? (
              <AlertTriangle className="w-6 h-6" />
            ) : (
              <XCircle className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h4
                className={`text-lg font-bold ${
                  isCorrect
                    ? 'text-emerald-300'
                    : isTimeout
                    ? 'text-rose-300'
                    : 'text-rose-300'
                }`}
              >
                {isCorrect
                  ? 'Correct Answer!'
                  : isTimeout
                  ? "Time's Up!"
                  : 'Incorrect Answer!'}
              </h4>
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-bold border ${
                  isCorrect
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : isTimeout
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    : 'bg-[#22252E] text-slate-300 border-[#343946]'
                }`}
              >
                {isCorrect ? '+1 Point' : isTimeout ? '-1 Point' : '0 Points'}
              </span>
            </div>

            {(!isCorrect || isTimeout) && (
              <p className="text-xs md:text-sm text-slate-300 font-medium pt-1">
                <span className="text-[#A89078]">Correct Answer:</span>{' '}
                <span className="text-emerald-400 font-semibold">
                  ({LETTERS[correctAnswerIndex]}) {correctAnswerText}
                </span>
              </p>
            )}

            {isTimeout && autoAdvanceSeconds !== null && (
              <p className="text-xs text-rose-400/90 font-mono animate-pulse">
                Automatically advancing in {autoAdvanceSeconds}s...
              </p>
            )}
          </div>
        </div>

        {/* Action Button: Next Question or View Results */}
        <div className="self-end sm:self-center shrink-0">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-[#8C765E] hover:from-sky-400 hover:to-[#A89078] text-white font-semibold text-sm shadow-lg shadow-black/50 border border-sky-400/20 transition-all cursor-pointer"
          >
            {isLastQuestion ? (
              <>
                <Trophy className="w-4 h-4 text-[#D4B996]" />
                <span>View Results</span>
              </>
            ) : (
              <>
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="mt-4 pt-4 border-t border-[#2D313A] flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm text-slate-300 leading-relaxed">
          <span className="font-semibold text-[#C4A482]">Explanation: </span>
          {explanation}
        </div>
      </div>
    </motion.div>
  );
}
