/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import EditQuestion from './pages/EditQuestion';
import QuizPlay from './pages/QuizPlay';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const currentUser = useStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/edit/:id" element={<EditQuestion />} />
          <Route path="/quiz/play" element={<QuizPlay />} />
          <Route path="/quiz" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
