import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, Coffee } from 'lucide-react';

export default function Timer({
  timeLeft,
  duration = 60,
  isAnswered,
  isZen = false
}) {
  if (isZen) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#1A1C22] border border-[#2D313A] text-slate-200">
        <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
          <Coffee className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A89078] leading-none">
            Zen Mode
          </span>
          <span className="font-mono text-sm font-bold text-emerald-400 leading-tight">
            Untimed
          </span>
        </div>
      </div>
    );
  }

  const isUrgent = timeLeft <= (duration === 30 ? 8 : 15);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  return (
    <div
      className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl transition-all duration-300 border ${
        isUrgent && !isAnswered
          ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-lg shadow-rose-500/10'
          : 'bg-[#1A1C22] border-[#2D313A] text-slate-200'
      }`}
    >
      {/* Mini SVG circular indicator */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg className="w-8 h-8 transform -rotate-90">
          <circle
            cx="16"
            cy="16"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-[#2B2F38]"
          />
          <circle
            cx="16"
            cy="16"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-linear ${
              isUrgent ? 'text-rose-400' : 'text-sky-400'
            }`}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          {isUrgent && !isAnswered ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            </motion.div>
          ) : (
            <Clock className="w-3.5 h-3.5 text-sky-400/80" />
          )}
        </div>
      </div>

      {/* Numerical countdown */}
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A89078] leading-none">
          Time Left
        </span>
        <span
          className={`font-mono text-base font-bold leading-tight ${
            isUrgent && !isAnswered ? 'text-rose-400 animate-pulse' : 'text-slate-100'
          }`}
        >
          {String(timeLeft).padStart(2, '0')}s
        </span>
      </div>
    </div>
  );
}
