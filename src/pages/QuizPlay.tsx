import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { X, Lightbulb, Users, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

export default function QuizPlay() {
  const navigate = useNavigate();
  const questions = useStore((state) => state.questions);
  const addPoints = useStore((state) => state.addPoints);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(null);
    }
  }, [timeLeft, isAnswered]);

  const handleAnswer = (index: number | null) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctAnswerIndex) {
      const points = question.isBonus ? 200 : 100;
      setScore(score + points);
      addPoints(points);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      navigate('/');
    }
  };

  if (!question) return null;

  return (
    <div className="flex-1 w-full max-w-md mx-auto overflow-y-auto pb-24 bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center justify-center size-10 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
            <X className="w-5 h-5 text-slate-900 dark:text-white" />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-xs font-bold tracking-widest uppercase text-slate-500">{question.category} Master</h1>
            <div className="flex items-center gap-1 text-amber-500">
              <span className="text-[10px] font-bold">★</span>
              <span className="text-xs font-bold">{score.toLocaleString()} pts</span>
            </div>
          </div>
          <button className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <Lightbulb className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="px-6 py-4">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-primary tracking-wider uppercase">Question {currentIndex + 1} of {questions.length}</span>
          <span className="text-[10px] text-slate-500 font-medium">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex justify-center py-8">
        <div className="relative size-24 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-200 dark:text-slate-800" />
            <circle 
              cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" 
              className={clsx("transition-all duration-1000", timeLeft <= 5 ? "text-red-500" : "text-primary")}
              strokeDasharray="283" 
              strokeDashoffset={283 - (283 * timeLeft) / 15} 
            />
          </svg>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-black leading-none">{timeLeft}</span>
            <span className="text-[8px] font-bold tracking-widest uppercase text-slate-500">Sec</span>
          </div>
        </div>
      </div>

      <div className="px-6 mb-8">
        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg text-center">
          <h2 className="text-xl font-bold leading-snug">{question.text}</h2>
        </div>
      </div>

      <div className="px-6 space-y-3 relative">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === question.correctAnswerIndex;
          
          let stateClass = "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-primary/50";
          if (isAnswered) {
            if (isCorrect) stateClass = "bg-green-500/10 border-green-500 text-green-600 dark:text-green-400";
            else if (isSelected) stateClass = "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400";
            else stateClass = "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-50";
          } else if (isSelected) {
            stateClass = "bg-primary/10 border-primary text-primary";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={isAnswered}
              className={clsx(
                "w-full flex items-center p-4 rounded-xl border-2 transition-all text-left group",
                stateClass
              )}
            >
              <div className={clsx(
                "size-8 rounded-lg flex items-center justify-center font-bold mr-4 transition-colors",
                isAnswered && isCorrect ? "bg-green-500 text-white" :
                isAnswered && isSelected ? "bg-red-500 text-white" :
                "bg-slate-100 dark:bg-slate-700 text-slate-500 group-hover:bg-primary group-hover:text-white"
              )}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="font-semibold text-lg">{opt}</span>
            </button>
          );
        })}

        {/* Floating action buttons mockup */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          <button className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
          </button>
          <button className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-primary font-bold hover:bg-slate-700 transition-colors">
            +1
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex gap-4 z-20">
        <button 
          onClick={() => navigate('/')}
          className="flex-1 py-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Skip Question
        </button>
        <button 
          onClick={handleNext}
          disabled={!isAnswered}
          className={clsx(
            "flex-1 py-4 rounded-xl font-bold shadow-lg transition-all",
            isAnswered 
              ? "bg-primary hover:bg-blue-600 text-white shadow-primary/30" 
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
          )}
        >
          {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
