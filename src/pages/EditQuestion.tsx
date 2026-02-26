import { useState, useEffect } from 'react';
import { useStore, Question } from '../store/useStore';
import { ChevronLeft, Trash2, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { clsx } from 'clsx';

export default function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const questions = useStore((state) => state.questions);
  const addQuestion = useStore((state) => state.addQuestion);
  const updateQuestion = useStore((state) => state.updateQuestion);
  const deleteQuestion = useStore((state) => state.deleteQuestion);

  const isNew = id === 'new';
  const existingQuestion = questions.find(q => q.id === id);

  const [text, setText] = useState('');
  const [category, setCategory] = useState('Geography');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [isBonus, setIsBonus] = useState(false);

  useEffect(() => {
    if (!isNew && existingQuestion) {
      setText(existingQuestion.text);
      setCategory(existingQuestion.category);
      setDifficulty(existingQuestion.difficulty);
      setOptions(existingQuestion.options);
      setCorrectAnswerIndex(existingQuestion.correctAnswerIndex);
      setIsBonus(existingQuestion.isBonus || false);
    }
  }, [isNew, existingQuestion]);

  const handleSave = () => {
    const questionData: Omit<Question, 'id'> = {
      text,
      category,
      difficulty,
      options,
      correctAnswerIndex,
      isBonus
    };

    if (isNew) {
      addQuestion(questionData);
    } else if (id) {
      updateQuestion(id, questionData);
    }
    navigate('/admin');
  };

  const handleDelete = () => {
    if (id && !isNew) {
      deleteQuestion(id);
      navigate('/admin');
    }
  };

  return (
    <div className="flex-1 w-full max-w-md mx-auto overflow-y-auto pb-24 bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold tracking-tight">{isNew ? 'New Question' : 'Edit Question'}</h1>
          <button onClick={handleDelete} className="flex items-center justify-center size-10 rounded-full hover:bg-red-500/20 text-red-500 transition-colors">
            {!isNew && <Trash2 className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        <div>
          <label className="block text-xs font-bold tracking-wider uppercase text-slate-500 mb-2">Question Content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What is the capital of France?"
            className="w-full h-32 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-slate-500 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="Geography">Geography</option>
              <option value="History">History</option>
              <option value="Science">Science</option>
              <option value="Literature">Literature</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-slate-500 mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold tracking-wider uppercase text-slate-500">Answer Options</label>
            <span className="text-xs text-slate-500">Select correct one</span>
          </div>
          <div className="space-y-3">
            {options.map((opt, idx) => (
              <div key={idx} className={clsx(
                "flex items-center gap-3 p-3 rounded-xl border transition-all",
                correctAnswerIndex === idx 
                  ? "bg-primary/10 border-primary/50" 
                  : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              )}>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[idx] = e.target.value;
                    setOptions(newOpts);
                  }}
                  placeholder={`Option ${idx + 1}`}
                  className="flex-1 bg-transparent border-none focus:outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
                />
                <button
                  onClick={() => setCorrectAnswerIndex(idx)}
                  className={clsx(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    correctAnswerIndex === idx 
                      ? "border-primary bg-primary" 
                      : "border-slate-400 dark:border-slate-600"
                  )}
                >
                  {correctAnswerIndex === idx && <div className="w-2 h-2 bg-white rounded-full" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-500 fill-current" />
            </div>
            <div>
              <p className="font-bold text-sm">Bonus Question</p>
              <p className="text-xs text-slate-500">Double points if correct</p>
            </div>
          </div>
          <button 
            onClick={() => setIsBonus(!isBonus)}
            className={clsx(
              "w-12 h-6 rounded-full transition-colors relative",
              isBonus ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
            )}
          >
            <div className={clsx(
              "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
              isBonus ? "left-7" : "left-1"
            )} />
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex gap-4 z-20">
        <button onClick={() => navigate(-1)} className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          Cancel
        </button>
        <button onClick={handleSave} className="flex-1 py-3.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold shadow-lg shadow-primary/30 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
