import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  const location = useLocation();
  const hideNavPaths = ['/login', '/quiz/play'];
  const shouldShowNav = !hideNavPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto shadow-2xl overflow-x-hidden font-display text-slate-900 dark:text-slate-100">
      <Outlet />
      {shouldShowNav && <BottomNav />}
    </div>
  );
}
