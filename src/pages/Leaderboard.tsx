import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ChevronLeft, Search, Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'Weekly' | 'All Time'>('Weekly');
  const leaderboard = useStore((state) => state.leaderboard);
  const navigate = useNavigate();

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="flex-1 w-full max-w-md mx-auto overflow-y-auto pb-24 bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 justify-between w-full">
          <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-900 dark:text-white" />
          </button>
          <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Global Leaderboard</h1>
          <div className="flex w-10 items-center justify-end">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <Search className="w-6 h-6 text-slate-900 dark:text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="flex h-11 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800/50 p-1">
          {['Weekly', 'All Time'].map((tf) => (
            <label key={tf} className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm text-slate-600 dark:text-slate-400 has-[:checked]:text-primary font-semibold text-sm transition-all">
              <span className="truncate">{tf}</span>
              <input
                type="radio"
                name="timeframe"
                value={tf}
                checked={timeframe === tf}
                onChange={(e) => setTimeframe(e.target.value as any)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-around items-end px-4 py-8 mb-4 relative">
        {/* 2nd Place */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="relative">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20 border-4 border-[#C0C0C0] shadow-lg" style={{ backgroundImage: `url(${top3[1]?.avatar})` }}></div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#C0C0C0]">
              <Trophy className="w-8 h-8 fill-current" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#C0C0C0] text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">2nd</div>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm font-bold truncate w-20">{top3[1]?.name}</p>
            <p className="text-primary text-xs font-semibold">{top3[1]?.points.toLocaleString()}</p>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center gap-2 z-10">
          <div className="relative">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-28 border-4 border-[#FFD700] shadow-2xl shadow-[#FFD700]/20" style={{ backgroundImage: `url(${top3[0]?.avatar})` }}></div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#FFD700]">
              <Trophy className="w-12 h-12 fill-current" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FFD700] text-slate-900 text-xs font-bold px-3 py-1 rounded-full border-2 border-background-dark">1st</div>
          </div>
          <div className="text-center mt-2">
            <p className="text-lg font-bold">{top3[0]?.name}</p>
            <p className="text-primary text-sm font-bold">{top3[0]?.points.toLocaleString()}</p>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="relative">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-16 border-4 border-[#CD7F32] shadow-lg" style={{ backgroundImage: `url(${top3[2]?.avatar})` }}></div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#CD7F32]">
              <Trophy className="w-6 h-6 fill-current" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#CD7F32] text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">3rd</div>
          </div>
          <div className="text-center mt-2">
            <p className="text-xs font-bold truncate w-16">{top3[2]?.name}</p>
            <p className="text-primary text-xs font-semibold">{top3[2]?.points.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-2">
        {rest.map((user, index) => {
          const rank = index + 4;
          const isMe = user.id === 'me';

          return (
            <div key={user.id} className={clsx(
              "flex items-center justify-between p-3 rounded-xl border transition-all",
              isMe 
                ? "bg-primary/10 border-primary/20" 
                : "bg-slate-100 dark:bg-slate-800/50 border-transparent hover:border-primary/30"
            )}>
              <div className="flex items-center gap-4">
                <span className={clsx("font-bold w-6 text-center", isMe ? "text-primary" : "text-slate-400 dark:text-slate-500")}>
                  {rank}
                </span>
                <div className={clsx("bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10", isMe && "ring-2 ring-primary")} style={{ backgroundImage: `url(${user.avatar})` }}></div>
                <div>
                  <p className="font-bold text-sm">{user.name}</p>
                  <p className={clsx("text-[10px] uppercase tracking-widest", isMe ? "text-primary/80" : "text-slate-500 dark:text-slate-400")}>
                    {user.level}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-primary font-bold text-sm">{user.points.toLocaleString()}</p>
                <div className={clsx("flex items-center gap-1 justify-end", 
                  user.trend > 0 ? "text-green-500" : user.trend < 0 ? "text-red-500" : "text-slate-400"
                )}>
                  {user.trend > 0 && <><TrendingUp className="w-3 h-3" /><span className="text-[10px] font-bold">{user.trend}</span></>}
                  {user.trend < 0 && <><TrendingDown className="w-3 h-3" /><span className="text-[10px] font-bold">{Math.abs(user.trend)}</span></>}
                  {user.trend === 0 && <Minus className="w-3 h-3" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
