import { create } from 'zustand';

export interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options: string[];
  correctAnswerIndex: number;
  isBonus?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  rank: string;
  level: string;
  avatar: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  level: string;
  avatar: string;
  trend: number;
}

interface StoreState {
  currentUser: User | null;
  questions: Question[];
  leaderboard: LeaderboardEntry[];
  login: (email: string) => void;
  logout: () => void;
  addQuestion: (q: Omit<Question, 'id'>) => void;
  updateQuestion: (id: string, q: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  addPoints: (points: number) => void;
}

const initialQuestions: Question[] = [
  {
    id: '1',
    text: 'Which city is known as the "City of Light" and serves as the capital of France?',
    category: 'Geography',
    difficulty: 'Easy',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswerIndex: 2,
  },
  {
    id: '2',
    text: 'Who wrote the play "Romeo and Juliet"?',
    category: 'Literature',
    difficulty: 'Easy',
    options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
    correctAnswerIndex: 0,
  },
  {
    id: '3',
    text: 'What is the square root of 144?',
    category: 'Mathematics',
    difficulty: 'Medium',
    options: ['10', '12', '14', '16'],
    correctAnswerIndex: 1,
  },
  {
    id: '4',
    text: 'In what year did the French Revolution begin?',
    category: 'History',
    difficulty: 'Hard',
    options: ['1776', '1789', '1804', '1815'],
    correctAnswerIndex: 1,
  },
];

const mockLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'Alex Johnson', points: 12450, level: 'Elite Quiz Master', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTCuMgqINiTIfC3nAvt7zNajtDx5aJJL8AZlmn5ZV0Ds4O4bvk405w5XX27-r-7D1ODpYk8dkkfpGNS5LcCjPceXGABQQ6Qlek3QEoYggQHDoT8mDGSOjy6G3zIczhVX1Nd1wZJP1SKW6GhBf6FRcg8pdH0nHmiSWNrgY9OVoP7pq7RcqXHnWylWnLuuU6-2GXWAKcJM6yo6Sn7_ldM6-7t4afaiGctizLr2EJlfYXms0Fv0h5WR9neraTyEOcFYwhN85XFP2ocew', trend: 0 },
  { id: '2', name: 'Sarah Jenkins', points: 10840, level: 'Master', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVunhgJCqQcexJoq-4TJimNCUynzRFCh0PlAdqX7F--0Th-s89a7lZt-vZNQwYpEYW7BYRnkciFnYQ5ihPTu6Y-4X7N0YErAxllByiKngag7zoOIhWgurW-lvTqGoWVLOcqXun_uTJyV1jSsFTfp8WmiF-xe_cF9hvqmWbhScW3QLKB311WGMdIPN92XGluBrAXFVfHS1-pj8NfwYcE7n6WHI4LIyVQtgGEcHY498KbRz6fnFjgQCusrUt8waOeqUwc1WMVPKXP8U', trend: 0 },
  { id: '3', name: 'Mike Ross', points: 9210, level: 'Expert', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDknoR4C4wUtFwgJfwpk13vwdwcQLSrZst7J0bChS59lFzeBt_tRH7YCaAsOnFtoUup9JpB3hG68h82F0xXNerX7KI7MtYNAe8LMxeILFvEIEQZ4foO8MyN5kSg9MoZ0OyJQ-SETZl9FKoBUt38rppXYiipijlEnaqmiotZkDNkOM0-_Up5Hkaj7tLwlAKygsOo99R29-vyswh9c1tZLgUVHSpWpvZ4R7am9AcpDD7tFSB0RmMhlowaP92I_xLhcqlOVnd6U5_pCPU', trend: 0 },
  { id: '4', name: 'Elena Rodriguez', points: 8750, level: 'Master Level', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT2TbjuYm2KzKoxiUKeH6qoiUKs5KRs2313dvUBKgb9ltGsE6PXkMHtGJhWIHofhdiHME2GyzUi2ZaNB9USwciwDywPYYC1yI6vbjnyda9HBefqWIpKx0NQxCbHFo1MfP_pGjwmC6LycMEt7hnTI-INqeAuDK2vAjvgJyfMKNqCBAMjyA7wZH3bjZ9uEQvFaDW00EMI03zBnZHPNlYiQYmM2t2Va5uQByzqALS7qcOIJTc3uruhRt7riFfPbCpG5RkhhhKDwZ-ra8', trend: 2 },
  { id: 'me', name: 'You (Daniel)', points: 8420, level: 'Expert Level', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPIWRa0uEPTi_cGxu8kIYRG9tqE6RNkbvwh9IIUDp7BTH7lEvJu6IjEYjWpmzlDnW0aADLeVePPELGVhucjvSXT3KRxrVcDfXmPLPxEr7C-oktEjyINLFSeuITzymgobD10KnwhP3aNasrZiNerT7-QlLCYiI-fV3kZg44ZYwCu_Ejq-C7flsvTRDqwFRIvgJN3XJ4KriKLMJX0FhgwW2is57f7R1it47HfbwBLGDhGahfLKMuTGTr2khGbUqGiC_5H8eJjI3uMiM', trend: 0 },
  { id: '6', name: 'Jordan Smith', points: 7900, level: 'Veteran Level', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXljqVTpEZIq8_ZuqXjPhbjMJmFewX6mUjbhYDy3a_BppFz9Qu0QJ0U6jDW49Q6irqfL2P91bEkbLie2tzOsuejlaW5_wVIQoMQkKhzrrILfJet0VHKd0jWM8gocxem3789LJmGd2eEMQ_1OupU7hP8blATtN79S7_KU-euUF9q2vyBz7NMTFbu7Zl71t_p5uCCfChU17KWcMVJvOnKSkTZazkHve3IPvt3BawGISKfbTFuQ1rhPYL9RDWq0gyNrAiDq20EVCwN18', trend: -1 },
  { id: '7', name: 'Chloe Wang', points: 7540, level: 'Advanced Level', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv4URWUod57FWVodRmOGGbh1Uvyr7T6OjYjwzvivtBJ1cr5iFkBaBguoo7GgL7nufScZ2WNiD2eT1XrMsdCHbwsLXCjDmEIT02E4jJ89ibxHxN0xy6V_udPMh01BHO9zerk9PdUOSVmq_r16Hj1aPKNLncP-X6bE-S_vH9iv7Pnb4Nn6IT6zJ6QSBXUZ4CMO0i8vPTwWHxNuOpYV5XjR-E-Fy7n0qf8rqLxxWwD2c3zDE3OMeEZIpfUHHxBK-zwz6Fy-ubEIU6HIA', trend: 4 },
  { id: '8', name: 'Lucas Meyer', points: 7210, level: 'Intermediate Level', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1OMNwqDuDxlc5VPgqq1F9ClCTrf0UjVj9hssvAU-5cXtA_mqq29xRrm7ISUPfFDUmLirXuhNJzME7V-2X57fs5XOKKskyVTf-a_CYYVdT9AWJSbNaAJ4mJmZleaTrTE9tF33dal3GOmW58fnQv7cmgowXOCIMcTmkPJj1d1YJfOE0DAftY0wBZs3wlFWRaLQPqbuUIfz71JojE77-rv4s6Qo-S3PONCIIF06wd0cxD54KfS53WU7dB8zuEXqOHbscGNhGrDGvH3s', trend: 0 },
];

export const useStore = create<StoreState>((set) => ({
  currentUser: null,
  questions: initialQuestions,
  leaderboard: mockLeaderboard,
  login: (email) => set({
    currentUser: {
      id: 'me',
      name: 'Daniel',
      email,
      points: 8420,
      rank: 'Gold Master Rank',
      level: 'Expert Level',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPIWRa0uEPTi_cGxu8kIYRG9tqE6RNkbvwh9IIUDp7BTH7lEvJu6IjEYjWpmzlDnW0aADLeVePPELGVhucjvSXT3KRxrVcDfXmPLPxEr7C-oktEjyINLFSeuITzymgobD10KnwhP3aNasrZiNerT7-QlLCYiI-fV3kZg44ZYwCu_Ejq-C7flsvTRDqwFRIvgJN3XJ4KriKLMJX0FhgwW2is57f7R1it47HfbwBLGDhGahfLKMuTGTr2khGbUqGiC_5H8eJjI3uMiM'
    }
  }),
  logout: () => set({ currentUser: null }),
  addQuestion: (q) => set((state) => ({
    questions: [...state.questions, { ...q, id: Date.now().toString() }]
  })),
  updateQuestion: (id, q) => set((state) => ({
    questions: state.questions.map((question) => question.id === id ? { ...question, ...q } : question)
  })),
  deleteQuestion: (id) => set((state) => ({
    questions: state.questions.filter((q) => q.id !== id)
  })),
  addPoints: (points) => set((state) => {
    if (!state.currentUser) return state;
    const newPoints = state.currentUser.points + points;
    
    // Update leaderboard
    const newLeaderboard = state.leaderboard.map(entry => 
      entry.id === 'me' ? { ...entry, points: newPoints } : entry
    ).sort((a, b) => b.points - a.points);

    return {
      currentUser: { ...state.currentUser, points: newPoints },
      leaderboard: newLeaderboard
    };
  })
}));
