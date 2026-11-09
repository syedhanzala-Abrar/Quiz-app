import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const percentage = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto my-3 px-1">
      <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1.5 px-0.5">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping inline-block" />
          Quiz Progress
        </span>
        <span className="font-mono text-sky-300 font-semibold">{percentage}%</span>
      </div>

      <div className="w-full h-2.5 bg-[#16181E] rounded-full overflow-hidden p-0.5 border border-[#2D313A]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-[#C4A482] shadow-sm shadow-sky-500/30"
        />
      </div>
    </div>
  );
}
