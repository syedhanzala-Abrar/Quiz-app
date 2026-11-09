import React, { useState, useEffect, useRef, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizHeader from './components/QuizHeader';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import ResultsScreen from './components/ResultsScreen';
import FloatingParticles from './components/FloatingParticles';
import { questions } from './data/questions';
import { sounds } from './utils/soundEffects';

const TIMEOUT_AUTO_ADVANCE_DELAY = 4; // 4 seconds delay after timeout

export default function App() {
  const [gameState, setGameState] = useState('welcome'); // 'welcome' | 'quiz' | 'results'
  const [quizMode, setQuizMode] = useState('standard'); // 'standard' (60s) | 'blitz' (30s) | 'zen' (untimed)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const getModeDuration = useCallback(() => {
    if (quizMode === 'blitz') return 30;
    if (quizMode === 'zen') return 999999;
    return 60;
  }, [quizMode]);

  const [timeLeft, setTimeLeft] = useState(60);
  const [elapsedZenTime, setElapsedZenTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const timerRef = useRef(null);
  const autoAdvanceIntervalRef = useRef(null);
  const autoAdvanceTimeoutRef = useRef(null);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const currentDuration = getModeDuration();

  const toggleSound = () => {
    setIsMuted(prev => {
      const next = !prev;
      sounds.setMuted(next);
      return next;
    });
  };

  // Clear all pending timeouts / intervals
  const clearAllTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
      autoAdvanceIntervalRef.current = null;
    }
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = null;
    }
    setAutoAdvanceSeconds(null);
  }, []);

  // Move to next question or show results
  const handleNextQuestion = useCallback(() => {
    clearAllTimers();
    sounds.playClick();

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsTimeout(false);
      setTimeLeft(currentDuration);
      setElapsedZenTime(0);
    } else {
      setGameState('results');
    }
  }, [clearAllTimers, currentDuration, currentQuestionIndex, totalQuestions]);

  // Handle timeout when time runs out (standard & blitz modes only)
  const handleTimeout = useCallback(() => {
    if (quizMode === 'zen') return;

    clearAllTimers();
    sounds.playTimeout();
    setIsAnswered(true);
    setIsTimeout(true);
    setSelectedAnswer(null);
    setStreak(0);

    // Scoring: timeout penalty -1 point (minimum -10)
    setScore(prev => Math.max(-10, prev - 1));

    // Record unanswered / timeout question
    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selected: null,
        timedOut: true,
        isCorrect: false,
        timeSpent: currentDuration
      }
    ]);

    // Start auto-advance countdown
    let remainingCountdown = TIMEOUT_AUTO_ADVANCE_DELAY;
    setAutoAdvanceSeconds(remainingCountdown);

    autoAdvanceIntervalRef.current = setInterval(() => {
      remainingCountdown -= 1;
      if (remainingCountdown >= 0) {
        setAutoAdvanceSeconds(remainingCountdown);
      }
    }, 1000);

    autoAdvanceTimeoutRef.current = setTimeout(() => {
      handleNextQuestion();
    }, TIMEOUT_AUTO_ADVANCE_DELAY * 1000);
  }, [clearAllTimers, currentDuration, currentQuestion.id, handleNextQuestion, quizMode]);

  // Main Question Timer
  useEffect(() => {
    if (gameState !== 'quiz' || isAnswered) {
      return;
    }

    if (quizMode === 'zen') {
      timerRef.current = setInterval(() => {
        setElapsedZenTime(prev => prev + 1);
      }, 1000);
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState, isAnswered, currentQuestionIndex, handleTimeout, quizMode]);

  // Start Quiz from Welcome screen
  const handleStartQuiz = () => {
    clearAllTimers();
    sounds.playClick();
    const duration = getModeDuration();
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(duration);
    setElapsedZenTime(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsTimeout(false);
    setUserAnswers([]);
    setGameState('quiz');
  };

  // Restart Quiz from Results screen
  const handleRestartQuiz = () => {
    clearAllTimers();
    sounds.playClick();
    const duration = getModeDuration();
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(duration);
    setElapsedZenTime(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsTimeout(false);
    setUserAnswers([]);
    setGameState('quiz');
  };

  // Back to Home
  const handleBackToHome = () => {
    clearAllTimers();
    sounds.playClick();
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(getModeDuration());
    setElapsedZenTime(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsTimeout(false);
    setUserAnswers([]);
    setGameState('welcome');
  };

  // Handle user selecting an answer
  const handleSelectOption = index => {
    if (isAnswered) return;

    clearAllTimers();
    setIsAnswered(true);
    setSelectedAnswer(index);

    const isCorrect = index === currentQuestion.correctAnswer;
    const timeSpent = quizMode === 'zen' ? elapsedZenTime : currentDuration - timeLeft;

    if (isCorrect) {
      sounds.playCorrect();
      setScore(prev => Math.min(10, prev + 1));
      setStreak(prev => prev + 1);
    } else {
      sounds.playIncorrect();
      setStreak(0);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selected: index,
        timedOut: false,
        isCorrect,
        timeSpent: Math.max(1, timeSpent)
      }
    ]);
  };

  return (
    <div className="relative min-h-screen bg-[#121316] text-[#F8FAFC] flex flex-col justify-between selection:bg-sky-500 selection:text-slate-950">
      {/* Floating Developer Particles */}
      <FloatingParticles />

      {gameState === 'welcome' && (
        <WelcomeScreen
          onStartQuiz={handleStartQuiz}
          quizMode={quizMode}
          setQuizMode={setQuizMode}
          isMuted={isMuted}
          onToggleSound={toggleSound}
        />
      )}

      {gameState === 'quiz' && (
        <main className="relative min-h-screen flex flex-col justify-between py-6 px-4 overflow-hidden z-10">
          {/* Ambient glow backgrounds: Light Blue and Mud */}
          <div className="ambient-glow-blue -top-40 -left-40 opacity-40" />
          <div className="ambient-glow-mud -bottom-40 -right-40 opacity-40" />

          <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col">
            {/* Header with live score, streak, sound toggle, logo, and timer */}
            <QuizHeader
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              score={score}
              timeLeft={timeLeft}
              duration={currentDuration}
              isZen={quizMode === 'zen'}
              isAnswered={isAnswered}
              streak={streak}
              isMuted={isMuted}
              onToggleSound={toggleSound}
              onQuit={handleBackToHome}
            />

            {/* Horizontal progress bar */}
            <ProgressBar
              current={currentQuestionIndex}
              total={totalQuestions}
            />

            {/* Question Card */}
            <div className="flex-1 flex items-center justify-center">
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                selectedAnswer={selectedAnswer}
                isAnswered={isAnswered}
                isTimeout={isTimeout}
                onSelectOption={handleSelectOption}
                onNextQuestion={handleNextQuestion}
                autoAdvanceSeconds={autoAdvanceSeconds}
              />
            </div>
          </div>

          {/* Footer note */}
          <footer className="relative z-10 w-full max-w-4xl mx-auto text-center py-2 text-xs text-[#A89078]/70">
            QuizMaster • Designed with Charcoal, Mud & Light Blue Aesthetics
          </footer>
        </main>
      )}

      {gameState === 'results' && (
        <ResultsScreen
          questions={questions}
          userAnswers={userAnswers}
          score={score}
          onRestartQuiz={handleRestartQuiz}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}
