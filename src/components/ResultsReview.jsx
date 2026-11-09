import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, Clock } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function ResultsReview({ questions, userAnswers }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'correct' | 'incorrect' | 'timeout'

  const reviewItems = questions.map((q, index) => {
    const answerData = userAnswers[index] || { selected: null, timedOut: true, timeSpent: 60 };
    const isTimeout = answerData.timedOut;
    const isCorrect = !isTimeout && answerData.selected === q.correctAnswer;
    const isIncorrect = !isTimeout && answerData.selected !== q.correctAnswer;
    const timeSpent = answerData.timeSpent !== undefined ? answerData.timeSpent : null;

    return {
      index,
      question: q,
      selectedAnswer: answerData.selected,
      isCorrect,
      isIncorrect,
      isTimeout,
      timeSpent,
      status: isCorrect ? 'correct' : isTimeout ? 'timeout' : 'incorrect'
    };
  });

  const filteredItems = reviewItems.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const correctCount = reviewItems.filter(i => i.isCorrect).length;
  const incorrectCount = reviewItems.filter(i => i.isIncorrect).length;
  const timeoutCount = reviewItems.filter(i => i.isTimeout).length;

  return (
    <div className="w-full mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-100">Detailed Question Review</h3>
          <p className="text-xs text-[#A89078] mt-0.5">
            Examine your answers, review mistakes, and reinforce your learning
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#16181E] border border-[#2D313A]">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/25'
                : 'text-[#A89078] hover:text-slate-200'
            }`}
          >
            All ({questions.length})
          </button>
          <button
            onClick={() => setFilter('correct')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-[#A89078] hover:text-emerald-400'
            }`}
          >
            Correct ({correctCount})
          </button>
          <button
            onClick={() => setFilter('incorrect')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'incorrect'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-[#A89078] hover:text-rose-400'
            }`}
          >
            Incorrect ({incorrectCount})
          </button>
          <button
            onClick={() => setFilter('timeout')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'timeout'
                ? 'bg-[#8C765E] text-white shadow-md shadow-black/30'
                : 'text-[#A89078] hover:text-[#D4B996]'
            }`}
          >
            Timed Out ({timeoutCount})
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredItems.map(item => {
          const { question, index, selectedAnswer, isCorrect, isTimeout, timeSpent } = item;

          let badgeBorder = isCorrect
            ? 'border-emerald-500/40 bg-emerald-950/20'
            : isTimeout
            ? 'border-[#8C765E]/40 bg-[#221F1B]/60'
            : 'border-rose-500/40 bg-rose-950/20';

          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border transition-all ${badgeBorder}`}
            >
              {/* Question Header & Status Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#C4A482]">
                    Q{index + 1}.
                  </span>
                  {question.category && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1C1F26] text-sky-300 border border-[#2F3442]">
                      {question.category}
                    </span>
                  )}
                  {timeSpent !== null && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1A1C22] text-[#A89078] border border-[#2B2F38]">
                      <Clock className="w-3 h-3 text-sky-400" />
                      {timeSpent}s
                    </span>
                  )}
                </div>

                {isCorrect ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1)
                  </span>
                ) : isTimeout ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3D2F22] text-[#D4B996] border border-[#8C765E]/40 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" /> Timed Out (-1)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold">
                    <XCircle className="w-3.5 h-3.5" /> Incorrect (0)
                  </span>
                )}
              </div>

              {/* Question Title */}
              <h4 className="text-base font-semibold text-slate-100 mb-4 leading-snug">
                {question.question}
              </h4>

              {/* Answer Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs md:text-sm">
                {/* User's choice */}
                <div
                  className={`p-3 rounded-xl border ${
                    isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                      : isTimeout
                      ? 'bg-[#29221B] border-[#8C765E]/40 text-[#D4B996]'
                      : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <span className="block text-[11px] uppercase tracking-wider text-[#A89078] font-bold mb-1">
                    Your Answer
                  </span>
                  <div className="font-medium flex items-center gap-2">
                    {isTimeout ? (
                      <span className="italic text-[#D4B996]/90 font-medium">
                        No answer selected (Timed Out)
                      </span>
                    ) : (
                      <>
                        <span className="font-bold">({LETTERS[selectedAnswer]})</span>
                        <span>{question.options[selectedAnswer]}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Correct answer */}
                <div className="p-3 rounded-xl border bg-emerald-950/30 border-emerald-500/30 text-emerald-200">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Correct Answer
                  </span>
                  <div className="font-medium flex items-center gap-2">
                    <span className="font-bold">({LETTERS[question.correctAnswer]})</span>
                    <span>{question.options[question.correctAnswer]}</span>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="p-3 rounded-xl bg-[#16181E] border border-[#2D313A] flex items-start gap-2 text-xs md:text-sm text-slate-300">
                <Lightbulb className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#C4A482]">Explanation: </span>
                  {question.explanation}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
