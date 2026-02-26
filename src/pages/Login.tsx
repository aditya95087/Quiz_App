import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-slate-100 p-6">
      <div className="flex items-center justify-between mb-8">
        <button className="p-2 -ml-2 text-slate-300 hover:text-white transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="text-lg font-bold">Login</h1>
        <div className="w-10"></div>
      </div>

      <div className="w-full aspect-[4/3] bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
        <div className="bg-white/90 p-4 rounded-xl shadow-xl">
          <HelpCircle className="w-16 h-16 text-primary" strokeWidth={2.5} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Join the Quiz</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Test your knowledge and compete with players worldwide.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-4 pr-12 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-primary text-sm font-medium hover:text-blue-400 transition-colors">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>

      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800"></div>
        </div>
        <div className="relative bg-background-dark px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
          Or continue with
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl py-3 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="text-sm font-semibold">Google</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl py-3 transition-colors">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.34-.73 3.83-.66 2.16.1 3.47 1.06 4.3 2.26-1.83 1.11-2.26 3.12-1.05 4.62.96 1.18 2.46 1.59 2.46 1.59-1.58 4.32-3.67 3.39-4.56 4.36zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          <span className="text-sm font-semibold">Apple</span>
        </button>
      </div>

      <div className="mt-auto text-center">
        <p className="text-slate-400 text-sm">
          Don't have an account? <a href="#" className="text-primary font-bold hover:text-blue-400 transition-colors">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
