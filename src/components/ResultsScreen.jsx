import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Target,
  Share2,
  Check,
  Award,
  Layers
} from 'lucide-react';
import ResultsReview from './ResultsReview';

export default function ResultsScreen({
  questions,
  userAnswers,
  score,
  onRestartQuiz,
  onBackToHome
}) {
  const [copied, setCopied] = useState(false);
  const totalQuestions = questions.length;

  let correctCount = 0;
  let incorrectCount = 0;
  let timeoutCount = 0;
  let totalTimeSpent = 0;

  // Track performance by category
  const categoryStats = {};

  questions.forEach((q, idx) => {
    const category = q.category || 'General';
    if (!categoryStats[category]) {
      categoryStats[category] = { total: 0, correct: 0 };
    }
    categoryStats[category].total++;

    const ans = userAnswers[idx];
    if (!ans || ans.timedOut) {
      timeoutCount++;
      totalTimeSpent += 60;
    } else {
      if (ans.selected === q.correctAnswer) {
        correctCount++;
        categoryStats[category].correct++;
      } else {
        incorrectCount++;
      }
      totalTimeSpent += (ans.timeSpent !== undefined ? ans.timeSpent : 30);
    }
  });

  const avgTime = Math.round((totalTimeSpent / totalQuestions) * 10) / 10;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // High score tracking via localStorage
  const [bestScore, setBestScore] = useState(() => {
    try {
      const stored = localStorage.getItem('quizmaster_best_score');
      return stored !== null ? Number(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('quizmaster_best_score');
      const currentBest = stored !== null ? Number(stored) : -99;
      if (score > currentBest) {
        localStorage.setItem('quizmaster_best_score', String(score));
        setBestScore(score);
      }
    } catch {
      // localStorage fallback
    }
  }, [score]);

  // Performance Levels
  let performanceLevel = 'Keep Practicing';
  let performanceBadgeColor = 'bg-rose-500/10 text-rose-300 border-rose-500/30';
  let performanceMessage = 'Review your mistakes below and try again to improve your score!';

  if (accuracy >= 90) {
    performanceLevel = 'Excellent';
    performanceBadgeColor = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    performanceMessage = 'Outstanding mastery of full-stack programming concepts!';
  } else if (accuracy >= 70) {
    performanceLevel = 'Great Job';
    performanceBadgeColor = 'bg-sky-500/10 text-sky-300 border-sky-500/30';
    performanceMessage = 'Impressive work! You have a solid grasp of the core concepts.';
  } else if (accuracy >= 50) {
    performanceLevel = 'Good Effort';
    performanceBadgeColor = 'bg-[#C4A482]/15 text-[#D4B996] border-[#8C765E]/40';
    performanceMessage = 'Good foundation! A little more practice will push you to the top.';
  }

  // Trigger celebration confetti on high performance with light blues, mud golds & emerald
  useEffect(() => {
    if (accuracy >= 70) {
      const end = Date.now() + 1200;
      const colors = ['#38BDF8', '#7DD3FC', '#C4A482', '#A89078', '#10B981'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [accuracy]);

  const handleShare = () => {
    const text = `🎯 QuizMaster Result: ${score > 0 ? `+${score}` : score} pts (${accuracy}% Accuracy) - Level: ${performanceLevel}! Can you beat my score?`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Circular gauge calculations
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="relative min-h-screen py-10 px-4 flex flex-col items-center bg-[#121316]">
      {/* Background glow: Light Blue & Mud */}
      <div className="ambient-glow-blue -top-40 -left-40 opacity-45" />
      <div className="ambient-glow-mud -bottom-40 -right-40 opacity-45" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Main Results Card */}
        <div className="glass-card rounded-3xl p-6 md:p-10 mb-8 shadow-2xl">
          <div className="text-center mb-8">
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border mb-4 uppercase tracking-wider ${performanceBadgeColor}`}
            >
              <Award className="w-4 h-4" />
              {performanceLevel}
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              Quiz Completed!
            </h2>
            <p className="text-sm md:text-base text-slate-400 max-w-md mx-auto">
              {performanceMessage}
            </p>
          </div>

          {/* Central Circular Gauge & Score Highlights */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 py-4 mb-8">
            {/* Circular Gauge */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-44 h-44 transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r={radius}
                  stroke="#262A34"
                  strokeWidth="10"
                  fill="transparent"
                />
                <motion.circle
                  cx="88"
                  cy="88"
                  r={radius}
                  stroke="url(#scoreGradient)"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#7DD3FC" />
                    <stop offset="100%" stopColor="#C4A482" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl md:text-4xl font-black text-white font-mono tracking-tight">
                  {accuracy}%
                </span>
                <span className="text-[11px] font-semibold text-[#A89078] uppercase tracking-wider">
                  Accuracy
                </span>
              </div>
            </div>

            {/* Score points display */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A89078]">
                Total Score Achieved
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-5xl md:text-6xl font-black font-mono tracking-tight ${
                    score > 0
                      ? 'text-emerald-400'
                      : score < 0
                      ? 'text-rose-400'
                      : 'text-slate-100'
                  }`}
                >
                  {score > 0 ? `+${score}` : score}
                </span>
                <span className="text-xl font-bold text-slate-400">/ 10 pts</span>
              </div>

              {bestScore !== null && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B1D23] border border-[#C4A482]/30 text-[#D4B996] text-xs font-semibold">
                  <Trophy className="w-3.5 h-3.5 text-sky-400" />
                  <span>Personal Best: {bestScore > 0 ? `+${bestScore}` : bestScore} pts</span>
                </div>
              )}

              <p className="text-xs text-slate-400 max-w-xs text-center md:text-left pt-1">
                Avg. response speed: <span className="text-sky-300 font-bold">{avgTime}s</span> per question
              </p>
            </div>
          </div>

          {/* Stats Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
            {/* Total Questions */}
            <div className="p-4 rounded-2xl bg-[#171920] border border-[#2D313A] text-center">
              <div className="text-sky-400 mb-1 flex justify-center">
                <Target className="w-5 h-5 text-sky-400" />
              </div>
              <span className="block text-2xl font-bold font-mono text-white">
                {totalQuestions}
              </span>
              <span className="text-xs text-[#A89078] font-medium">Questions</span>
            </div>

            {/* Correct */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center">
              <div className="text-emerald-400 mb-1 flex justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="block text-2xl font-bold font-mono text-emerald-400">
                {correctCount}
              </span>
              <span className="text-xs text-emerald-300/80 font-medium">Correct</span>
            </div>

            {/* Incorrect */}
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center">
              <div className="text-rose-400 mb-1 flex justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <span className="block text-2xl font-bold font-mono text-rose-400">
                {incorrectCount}
              </span>
              <span className="text-xs text-rose-300/80 font-medium">Incorrect</span>
            </div>

            {/* Unanswered (Timed Out) */}
            <div className="p-4 rounded-2xl bg-[#26211B] border border-[#8C765E]/40 text-center">
              <div className="text-[#D4B996] mb-1 flex justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="block text-2xl font-bold font-mono text-[#D4B996]">
                {timeoutCount}
              </span>
              <span className="text-xs text-[#C4A482] font-medium">Timed Out</span>
            </div>
          </div>

          {/* Topic Performance Breakdown */}
          <div className="mb-8 p-5 rounded-2xl bg-[#16181E] border border-[#2D313A]">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Topic Mastery Breakdown
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(categoryStats).map(([cat, stats]) => {
                const catPct = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={cat} className="p-3 rounded-xl bg-[#1D2028] border border-[#2E3340]">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-slate-300">{cat}</span>
                      <span className="font-mono text-sky-300">
                        {stats.correct} / {stats.total} ({catPct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#14161C] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          catPct >= 70
                            ? 'bg-sky-400'
                            : catPct >= 50
                            ? 'bg-[#C4A482]'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${catPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 border-t border-[#2D313A]">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestartQuiz}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-[#8C765E] hover:from-sky-400 hover:to-[#A89078] text-white font-bold text-sm shadow-lg shadow-black/50 border border-sky-400/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Quiz</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A1C22] hover:bg-[#232630] text-sky-300 border border-sky-400/30 font-bold text-sm transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Score Copied!' : 'Share Score'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBackToHome}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#22252E] hover:bg-[#2B2F3A] text-[#D4B996] border border-[#3A3F4C] font-bold text-sm transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </motion.button>
          </div>
        </div>

        {/* Detailed Results Review Component */}
        <ResultsReview questions={questions} userAnswers={userAnswers} />
      </motion.div>
    </div>
  );
}
