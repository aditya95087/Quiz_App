import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ChevronLeft, Settings, Search, ChevronDown, SlidersHorizontal, History, HelpCircle, Edit2, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

export default function Admin() {
  const questions = useStore((state) => state.questions);
  const deleteQuestion = useStore((state) => state.deleteQuestion);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredQuestions = questions.filter(q => 
    q.text.toLowerCase().includes(search.toLowerCase()) || 
    q.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 w-full max-w-md mx-auto overflow-y-auto pb-24 bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold tracking-tight">Question Manager</h1>
          </div>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm placeholder-slate-500 text-slate-900 dark:text-slate-100" 
            placeholder="Search by category or difficulty..." 
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          <button className="flex shrink-0 items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
            All Categories
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex shrink-0 items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-800">
            Difficulty
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button className="flex shrink-0 items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-800">
            Recent
            <History className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-xl flex justify-between items-center border border-primary/20">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">Total Questions</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{questions.length.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">Active</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">98%</p>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 space-y-3 pb-24">
        {filteredQuestions.map((q) => {
          let bgClass = "bg-emerald-100 dark:bg-emerald-900/30";
          let iconClass = "text-emerald-600 dark:text-emerald-400";
          let diffClass = "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
          
          if (q.difficulty === 'Medium') {
            bgClass = "bg-amber-100 dark:bg-amber-900/30";
            iconClass = "text-amber-600 dark:text-amber-400";
            diffClass = "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
          } else if (q.difficulty === 'Hard') {
            bgClass = "bg-red-100 dark:bg-red-900/30";
            iconClass = "text-red-600 dark:text-red-400";
            diffClass = "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
          }

          return (
            <div key={q.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className={clsx("size-10 rounded-lg flex items-center justify-center shrink-0", bgClass)}>
                <HelpCircle className={clsx("w-6 h-6", iconClass)} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 dark:text-slate-100 leading-tight mb-1">{q.text}</h3>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{q.category}</span>
                  <span className={clsx("text-[10px] uppercase font-bold px-2 py-0.5 rounded", diffClass)}>{q.difficulty}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => navigate(`/admin/edit/${q.id}`)} className="text-slate-400 hover:text-primary transition-colors">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button onClick={() => deleteQuestion(q.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </main>

      <button 
        onClick={() => navigate('/admin/edit/new')}
        className="fixed bottom-24 right-6 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center hover:scale-105 transition-transform active:scale-95 z-20"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
