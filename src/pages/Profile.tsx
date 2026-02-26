import { useStore } from '../store/useStore';
import { ChevronLeft, Settings, TrendingUp, TrendingDown, Info, Flame, Trophy, Sparkles, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const currentUser = useStore((state) => state.currentUser);
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full max-w-md mx-auto overflow-y-auto pb-24 bg-background-light dark:bg-background-dark">
      <div className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Profile</h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex p-6">
        <div className="flex w-full flex-col gap-4 items-center">
          <div className="flex gap-4 flex-col items-center">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-primary shadow-xl shadow-primary/20" 
                style={{ backgroundImage: `url(${currentUser?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtg_14SNFewwrPJ6ZrbWcY-1XPJcN-y3b-nrlso6GNyDTgOMPbm9vFlhYhHkXHlXES05pDVKShq9F4rOrUe9n07DV4SYUTt4hcBPCZ038H5FN32ydxtjEU1zga1wJw5GS9xKFbsEhotlTIFdvm8-u-P9dHgrFrX8GSsZff9wZNA0Rxle5OT-SKKwv1-DJXqJDd-dASFK4qYm5xz80FxZarm3sy6OnZSMO_o63GLuPZAw4Tudogx8x1aIKp5A6jWsp1BSd0FJToFKE'})` }}
              ></div>
              <div className="absolute bottom-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-background-dark">
                LVL 42
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight text-center">{currentUser?.name || 'Alex Johnson'}</p>
              <p className="text-primary text-base font-semibold leading-normal text-center">{currentUser?.level || 'Elite Quiz Master'}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal text-center mt-1">Joined January 2023</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 px-4">
        <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-normal">Total Quizzes</p>
          <p className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight">128</p>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <p className="text-green-500 text-xs font-medium">+12%</p>
          </div>
        </div>
        <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-normal">Accuracy</p>
          <p className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight">84%</p>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <p className="text-green-500 text-xs font-medium">+2%</p>
          </div>
        </div>
        <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-normal">Global Rank</p>
          <p className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight">#1,204</p>
          <div className="flex items-center gap-1">
            <TrendingDown className="w-3 h-3 text-red-500" />
            <p className="text-red-500 text-xs font-medium">-15</p>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">Category Performance</h3>
          <Info className="w-5 h-5 text-slate-400" />
        </div>
        <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
          <div className="flex items-end justify-between h-40 gap-2">
            {[
              { label: 'History', height: '65%' },
              { label: 'Science', height: '90%' },
              { label: 'Tech', height: '80%' },
              { label: 'Arts', height: '45%' },
              { label: 'Sports', height: '75%' },
            ].map((cat) => (
              <div key={cat.label} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-primary/20 rounded-t-lg relative" style={{ height: cat.height }}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all" style={{ height: '100%' }}></div>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
        <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight mb-4">Score History</h3>
        <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="relative h-48 w-full">
            <div className="absolute inset-0 flex flex-col justify-between opacity-10">
              <div className="w-full border-t border-slate-900 dark:border-slate-100"></div>
              <div className="w-full border-t border-slate-900 dark:border-slate-100"></div>
              <div className="w-full border-t border-slate-900 dark:border-slate-100"></div>
              <div className="w-full border-t border-slate-900 dark:border-slate-100"></div>
            </div>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="line-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#135bec" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#135bec" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,150 Q50,130 100,160 T200,80 T300,100 T400,40" fill="none" stroke="#135bec" strokeLinecap="round" strokeWidth="4"></path>
              <path d="M0,150 Q50,130 100,160 T200,80 T300,100 T400,40 L400,200 L0,200 Z" fill="url(#line-gradient)"></path>
              <circle cx="100" cy="160" fill="#135bec" r="4"></circle>
              <circle cx="200" cy="80" fill="#135bec" r="4"></circle>
              <circle cx="300" cy="100" fill="#135bec" r="4"></circle>
              <circle cx="400" cy="40" fill="#135bec" r="6" stroke="white" strokeWidth="2"></circle>
            </svg>
            <div className="absolute bottom-[-10px] w-full flex justify-between px-2 text-[10px] text-slate-500">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4 pb-8">
        <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight mb-4">Recent Achievements</h3>
        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          <div className="flex-shrink-0 w-24 flex flex-col items-center gap-2">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
              <Flame className="w-8 h-8 text-primary" />
            </div>
            <span className="text-[10px] text-center font-semibold">7 Day Streak</span>
          </div>
          <div className="flex-shrink-0 w-24 flex flex-col items-center gap-2">
            <div className="size-16 rounded-full bg-yellow-500/10 flex items-center justify-center border-2 border-yellow-500/30">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <span className="text-[10px] text-center font-semibold">First Place</span>
          </div>
          <div className="flex-shrink-0 w-24 flex flex-col items-center gap-2">
            <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center border-2 border-green-500/30">
              <Sparkles className="w-8 h-8 text-green-600" />
            </div>
            <span className="text-[10px] text-center font-semibold">Perfect 10</span>
          </div>
          <div className="flex-shrink-0 w-24 flex flex-col items-center gap-2 opacity-40">
            <div className="size-16 rounded-full bg-slate-500/10 flex items-center justify-center border-2 border-slate-500/30">
              <Lock className="w-8 h-8 text-slate-600" />
            </div>
            <span className="text-[10px] text-center font-semibold">Century</span>
          </div>
        </div>
      </div>
    </div>
  );
}
