import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, HelpCircle, User, Settings } from 'lucide-react';
import { clsx } from 'clsx';

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/leaderboard', icon: Trophy, label: 'Rank' },
    { path: '/quiz', icon: HelpCircle, label: 'Quiz' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 pb-6 pt-3 flex gap-2 z-50">
      {navItems.map((item) => {
        const isActive = path === item.path || (item.path !== '/' && path.startsWith(item.path));
        const Icon = item.icon;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              "flex flex-1 flex-col items-center justify-center gap-1 transition-colors",
              isActive ? "text-primary" : "text-slate-400 dark:text-slate-500 hover:text-primary"
            )}
          >
            <div className="relative">
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              {item.label === 'Rank' && isActive && (
                <div className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full"></div>
              )}
            </div>
            <p className={clsx("text-[10px] leading-normal tracking-wide", isActive ? "font-bold" : "font-medium")}>
              {item.label}
            </p>
          </Link>
        );
      })}
    </nav>
  );
}
