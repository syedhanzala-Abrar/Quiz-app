import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Command } from 'lucide-react';
import AnswerOption from './AnswerOption';
import FeedbackPanel from './FeedbackPanel';

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  isAnswered,
  isTimeout,
  onSelectOption,
  onNextQuestion,
  autoAdvanceSeconds
}) {
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // Keyboard navigation support: A-D, 1-4, Enter/Space
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();

      if (!isAnswered) {
        if (key === 'A' || key === '1') onSelectOption(0);
        else if (key === 'B' || key === '2') onSelectOption(1);
        else if (key === 'C' || key === '3') onSelectOption(2);
        else if (key === 'D' || key === '4') onSelectOption(3);
      } else {
        if (key === 'ENTER' || key === ' ') {
          e.preventDefault();
          onNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, onSelectOption, onNextQuestion]);

  return (
    <div className="w-full max-w-4xl mx-auto my-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="glass-card rounded-3xl p-6 md:p-8"
        >
          {/* Question Meta Badges */}
          <div className="flex items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#1E2128] border border-[#C4A482]/30 text-[#D4B996] font-mono text-xs font-semibold">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              {question.category && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-300 text-xs font-medium">
                  <Code className="w-3 h-3 text-sky-400" />
                  {question.category}
                </span>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#A89078] font-medium">
              <Command className="w-3.5 h-3.5 text-sky-400" />
              <span>Keys: [A-D] or [1-4]</span>
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-lg md:text-2xl font-bold text-slate-100 mb-6 leading-relaxed">
            {question.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3.5">
            {question.options.map((optionText, idx) => (
              <AnswerOption
                key={idx}
                index={idx}
                text={optionText}
                selectedAnswer={selectedAnswer}
                correctAnswer={question.correctAnswer}
                isAnswered={isAnswered}
                isTimeout={isTimeout}
                onSelect={onSelectOption}
              />
            ))}
          </div>

          {/* Feedback & Explanation & Next button */}
          {isAnswered && (
            <FeedbackPanel
              isCorrect={isCorrect}
              isTimeout={isTimeout}
              correctAnswerIndex={question.correctAnswer}
              correctAnswerText={question.options[question.correctAnswer]}
              explanation={question.explanation}
              isLastQuestion={isLastQuestion}
              onNext={onNextQuestion}
              autoAdvanceSeconds={autoAdvanceSeconds}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
