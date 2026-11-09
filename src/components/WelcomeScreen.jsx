import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Clock,
  ArrowRight,
  Code2,
  Atom,
  Palette,
  FileCode2,
  Award,
  Zap,
  HelpCircle,
  AlertTriangle,
  Volume2,
  VolumeX,
  Flame,
  Coffee
} from 'lucide-react';

export default function WelcomeScreen({
  onStartQuiz,
  quizMode,
  setQuizMode,
  isMuted,
  onToggleSound
}) {
  const modes = [
    {
      id: 'standard',
      name: 'Standard',
      duration: '60s per Q',
      icon: <Clock className="w-4 h-4 text-[#C4A482]" />,
      desc: 'Balanced countdown challenge'
    },
    {
      id: 'blitz',
      name: 'Speed Blitz',
      duration: '30s per Q',
      icon: <Flame className="w-4 h-4 text-sky-400" />,
      desc: 'High-intensity fast reflex test'
    },
    {
      id: 'zen',
      name: 'Zen Practice',
      duration: 'Untimed',
      icon: <Coffee className="w-4 h-4 text-emerald-400" />,
      desc: 'Relaxed learning with no timeouts'
    }
  ];

  const infoCards = [
    {
      icon: <HelpCircle className="w-6 h-6 text-sky-400" />,
      title: "10 Multiple Choice Questions",
      description: "Curated questions covering JS, React, HTML, CSS, and CS core concepts."
    },
    {
      icon: <Clock className="w-6 h-6 text-[#C4A482]" />,
      title: quizMode === 'zen' ? "Untimed Practice Mode" : quizMode === 'blitz' ? "30s Blitz Countdown" : "60 Seconds Per Question",
      description: quizMode === 'zen' ? "Focus on deep understanding without any countdown stress." : "Stay sharp against the countdown timer to maximize your score."
    },
    {
      icon: <Zap className="w-6 h-6 text-sky-300" />,
      title: "Instant Answer Feedback",
      description: "Immediate validation with clear, concise conceptual explanations."
    },
    {
      icon: <Award className="w-6 h-6 text-[#D4B996]" />,
      title: "Performance Analysis",
      description: "In-depth final evaluation, accuracy metrics, and question review."
    }
  ];

  const topics = [
    { name: "JavaScript", icon: <Code2 className="w-3.5 h-3.5 text-sky-400" /> },
    { name: "React.js", icon: <Atom className="w-3.5 h-3.5 text-[#C4A482]" /> },
    { name: "HTML5", icon: <FileCode2 className="w-3.5 h-3.5 text-sky-300" /> },
    { name: "CSS3", icon: <Palette className="w-3.5 h-3.5 text-[#A89078]" /> },
    { name: "Data Structures", icon: <Zap className="w-3.5 h-3.5 text-sky-400" /> }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-[#121316]">
      {/* Background glowing ambiance: Light Blue & Mud */}
      <div className="ambient-glow-blue -top-40 -left-40 opacity-45" />
      <div className="ambient-glow-mud -bottom-40 -right-40 opacity-45" />

      {/* Top Controls: Sound Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={onToggleSound}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className="p-2.5 rounded-2xl bg-[#1A1D23] border border-[#2D313A] text-slate-300 hover:text-white hover:border-sky-400/40 transition-all cursor-pointer shadow-lg shadow-black/40"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-sky-400" />
          )}
        </button>
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1D23] border border-[#C4A482]/30 text-[#C4A482] text-xs font-semibold mb-6 shadow-sm shadow-black/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span className="tracking-wide">Interactive Learning Platform</span>
          </motion.div>

          {/* Logo and App Title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1B1D22] via-[#2A2E38] to-[#1B1D22] flex items-center justify-center shadow-lg shadow-black/60 border border-sky-400/40">
              <Award className="w-7 h-7 text-sky-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Quiz<span className="text-transparent bg-gradient-to-r from-sky-400 via-sky-300 to-[#C4A482] bg-clip-text">Master</span>
            </h1>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-slate-100 mb-3"
          >
            Challenge Your Knowledge
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-base md:text-lg text-slate-400 max-w-xl mx-auto font-normal leading-relaxed"
          >
            Test your knowledge, beat the clock, and discover your score.
          </motion.p>
        </div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="glass-card rounded-3xl p-6 md:p-8 mb-8"
        >
          {/* Mode Selector */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-[#C4A482] uppercase tracking-wider mb-3 text-center sm:text-left">
              Select Quiz Pace:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {modes.map(mode => {
                const isSelected = quizMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setQuizMode(mode.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#22252F] border-sky-400/80 shadow-md shadow-sky-500/10'
                        : 'bg-[#171920]/70 border-[#2C303B] hover:border-[#8C765E]/40 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-slate-200 flex items-center gap-1.5">
                        {mode.icon}
                        {mode.name}
                      </span>
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-sky-500/20 text-sky-300' : 'bg-[#20232B] text-slate-400'
                      }`}>
                        {mode.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{mode.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {infoCards.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#16181D]/80 border border-[#2B2F38] hover:border-sky-400/40 transition-all duration-200"
              >
                <div className="p-2.5 rounded-xl bg-[#22252D] border border-[#353A45] shadow-sm shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm md:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-snug">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scoring Rules Ribbon */}
          <div className="p-4 rounded-2xl bg-[#16181E] border border-[#C4A482]/25 mb-8 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
            <span className="font-semibold text-[#D4B996] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-sky-400" /> Scoring Rules:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-medium">
                Correct: +1 pt
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#22252E] text-slate-300 border border-[#343946] font-medium">
                Incorrect: 0 pts
              </span>
              {quizMode !== 'zen' ? (
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/25 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Timeout: -1 pt
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-medium flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5 text-emerald-400" /> No Timeout Penalty
                </span>
              )}
            </div>
          </div>

          {/* Topics covered pill bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="text-xs font-semibold text-[#A89078] uppercase tracking-wider mr-1">
              Covering:
            </span>
            {topics.map((topic, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1B1D22] border border-[#2E333F] text-slate-300 hover:border-sky-400/30 transition-colors"
              >
                {topic.icon}
                {topic.name}
              </span>
            ))}
          </div>

          {/* Prominent Start Quiz Button */}
          <div className="flex flex-col items-center">
            <motion.button
              onClick={onStartQuiz}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-2xl bg-gradient-to-r from-sky-500 via-[#8C765E] to-[#6E5B49] text-white font-bold text-lg shadow-xl shadow-black/50 hover:shadow-sky-500/25 hover:brightness-110 transition-all duration-300 cursor-pointer overflow-hidden border border-sky-400/30"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span>Start Quiz ({modes.find(m => m.id === quizMode)?.name})</span>
              <ArrowRight className="w-5 h-5 text-sky-100 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
            <p className="text-xs text-slate-400 mt-3">
              Press to begin question 1 • Mode: {modes.find(m => m.id === quizMode)?.duration}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
