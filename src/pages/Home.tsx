import { useStore } from '../store/useStore';
import { Bell, Trophy, Clock, Play, FlaskConical, History, Monitor, Globe, Palette, Dribbble } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const currentUser = useStore((state) => state.currentUser);

  const categories = [
    { id: 'science', name: 'Science', count: 142, icon: FlaskConical, color: 'text-emerald-500', bg: 'bg-emerald-500/10 dark:bg-emerald-500/20' },
    { id: 'history', name: 'History', count: 85, icon: History, color: 'text-orange-500', bg: 'bg-orange-500/10 dark:bg-orange-500/20' },
    { id: 'tech', name: 'Technology', count: 210, icon: Monitor, color: 'text-primary', bg: 'bg-primary/10 dark:bg-primary/20' },
    { id: 'geography', name: 'Geography', count: 64, icon: Globe, color: 'text-purple-500', bg: 'bg-purple-500/10 dark:bg-purple-500/20' },
    { id: 'art', name: 'Art & Design', count: 118, icon: Palette, color: 'text-pink-500', bg: 'bg-pink-500/10 dark:bg-pink-500/20' },
    { id: 'sports', name: 'Sports', count: 93, icon: Dribbble, color: 'text-amber-500', bg: 'bg-amber-500/10 dark:bg-amber-500/20' },
  ];

  return (
    <div className="pb-24">
      <div className="flex items-center bg-white dark:bg-slate-900/50 p-4 sticky top-0 z-40 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 justify-between">
        <div className="flex size-10 shrink-0 items-center overflow-hidden rounded-full border-2 border-primary">
          <img alt="Profile" className="h-full w-full object-cover" src={currentUser?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDOjI1IiBIqPDsIysN91eg3xa4pAIJ82UmiF38PCu24pnRp_xaekkrN1SAfJYI-Q7ar6e8Ucy7qpM88bYC4UcRhJbxGYqf5QaKL1rlkVwvw3KI_X1PtEg4BqWfnT2lwxU38xRL4BzaQOtvJHqizY0IvGycWdLCUIndg2kPyLfg81RQLf8lF1TRJaXK4E9VwO873CLRGYCkHRN4SHXPcO4XC8tjoCtDyU-rQOTUj2WBEWiofCuXvdHi1RigxuER5gjxphHdxOlMx0ac"} />
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Quiz Master</h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex w-full items-center gap-4 bg-primary/10 dark:bg-primary/5 p-4 rounded-xl border border-primary/20">
          <div className="flex flex-col flex-1">
            <p className="text-slate-900 dark:text-white text-xl font-bold leading-tight">{currentUser?.name || 'Alex Johnson'}</p>
            <div className="flex items-center gap-2 mt-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{currentUser?.rank || 'Gold Master Rank'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary text-2xl font-black leading-none">{currentUser?.points?.toLocaleString() || '12,540'}</p>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Points</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="relative overflow-hidden flex flex-col items-stretch justify-start rounded-xl shadow-lg bg-primary text-white p-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Today's Special
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">14h left</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold leading-tight mb-1">Daily Challenge</h3>
            <p className="text-white/80 text-sm font-normal mb-6 leading-snug">
              Master the 'World Wonders' quiz to earn double experience points today.
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <img alt="Player" className="size-6 rounded-full border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTAPZhOK6d5ujH3i9N2NPuHw2T0qiPy2_uLRzr1H9zegQoloHtx9Tq6WcgmOgIe5PY5_9xu3PkextGh7Nnphv_9P3LS9mmHjc8OLyQ7GjFZNuYmVgKQJ9SPDx6L-TPT2r_anjEHyLJY-b7fQekNoYyUDyiy51SEY4uC4Ffa8qdFyGBZk8kPwvekvMiBscIfeeB_Wo57l9L_ztS76-XtyoyyufUTKeJrl3NIK7m82HvRLNV8Z0nTuNajavmxTl0PRFbYGzd2yWj9Kc" />
                <img alt="Player" className="size-6 rounded-full border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP1Fmt6IuVjGV6Sl2qJ8AEWo03uyvQ5kN7YC4fDk2pyd-Wj_s6lzWdQWvreZjoQmJxiwDeE3nlX-3f05ufyFdxxGfkh52qA4KDaK8UpGutM7YllO3ga14Cs44spizj3a_h0tJgaMtYVXXjzZe7ia-KgnNz6_YZI6HC5P3yzRJN3wPprcFpMfbPQMXHGjK0xBhupbzzk3V3NbhiRlG8AV7EbCFBn_8hiMqCNAnZX3kXLY46tn7j71f7MDGnwCGIOd6wtuxYINwTWME" />
                <img alt="Player" className="size-6 rounded-full border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfxpgRwCItUenW6ugiChrHoFzl1Dud6woUFAjytnLxQ4c7EYsydgeJcHDXiEAZFsjcu-GAETjMho5Jdf9gjikmXx_KUDC6PJ5pdpfRxxYiSpHooheyv7O1-3uNpeNNv45wxUBzzLl3I2Wzxe4BkNDYJGJZz1V9KqMAhvOwhIGB081wcbBlVnMzDDCVbq7WaoNTY38yHrTwK4Au3tt9wNZtOyWS12p01ig_EbLIQ51NhM7yOPBIhtO107nFnY56rmqf5AfZhaCZ07k" />
                <div className="size-6 rounded-full border-2 border-primary bg-slate-800 flex items-center justify-center text-[8px] font-bold">+12k</div>
              </div>
              
              <Link to="/quiz/play" className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-white text-primary text-sm font-bold shadow-sm active:scale-95 transition-transform">
                <span>Start Now</span>
                <Play className="w-4 h-4 fill-current" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-900 dark:text-white text-lg font-bold">Quiz Categories</h2>
          <button className="text-primary text-xs font-bold uppercase tracking-wider">See All</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-3 shadow-sm cursor-pointer hover:border-primary/50 transition-colors">
                <div className={`size-10 rounded-lg ${cat.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${cat.color}`} />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">{cat.name}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-0.5">{cat.count} Questions</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
