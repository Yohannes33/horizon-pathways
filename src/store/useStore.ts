import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Timeframe = '5y' | '1y' | '6m' | 'monthly';

export interface Goal {
  id: string;
  careerPathId: string;
  title: string;
  timeframe: Timeframe;
  parentGoalId?: string;
  isCompleted: boolean;
  dueDate?: string;
  createdAt: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  motivation?: string;
  createdAt: string;
  color: string;
  image: string;
}

export interface WeeklyReview {
  id: string;
  weekStartDate: string;
  summary: string;
  priorities: string[];
  completedGoalIds: string[];
  createdAt: string;
}

interface CareerStore {
  careerPaths: CareerPath[];
  goals: Goal[];
  reviews: WeeklyReview[];
  addCareerPath: (path: Omit<CareerPath, 'id' | 'createdAt'>) => void;
  deleteCareerPath: (id: string) => void;
  updateCareerPath: (id: string, path: Partial<CareerPath>) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'isCompleted'>) => void;
  toggleGoal: (id: string) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  addReview: (review: Omit<WeeklyReview, 'id' | 'createdAt'>) => void;
}

export const useStore = create<CareerStore>()(
  persist(
    (set) => ({
      careerPaths: [
        { 
          id: '1', 
          title: 'Software Architect', 
          description: 'Mastering distributed systems and cloud infrastructure.', 
          motivation: 'To build resilient systems that serve millions.',
          createdAt: new Date().toISOString(), 
          color: 'bg-indigo-500',
          image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/42e95c56-4525-4d12-a02d-2eb0bd5219e6/vision-1-indigo-38e23525-1772018734398.webp'
        },
        { 
          id: '2', 
          title: 'Technical Writer', 
          description: 'Sharing knowledge through clear, concise documentation.', 
          motivation: 'To make complex technology accessible to everyone.',
          createdAt: new Date().toISOString(), 
          color: 'bg-emerald-500',
          image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/42e95c56-4525-4d12-a02d-2eb0bd5219e6/vision-2-emerald-bfb2f5b3-1772018733887.webp'
        },
        { 
          id: '3', 
          title: 'Data Scientist', 
          description: 'Becoming an expert in machine learning and data storytelling.', 
          motivation: 'To uncover insights that drive meaningful change.',
          createdAt: new Date().toISOString(), 
          color: 'bg-violet-500',
          image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/42e95c56-4525-4d12-a02d-2eb0bd5219e6/vision-3-violet-fbd1631f-1772018733999.webp'
        }
      ],
      goals: [
        { id: 'g1', careerPathId: '1', title: 'Senior Software Architect Role', timeframe: '5y', isCompleted: false, createdAt: new Date().toISOString() },
        { id: 'g2', careerPathId: '1', title: 'Master Distributed Systems Design', timeframe: '1y', parentGoalId: 'g1', isCompleted: false, createdAt: new Date().toISOString() },
        { id: 'g3', careerPathId: '1', title: 'Complete Advanced Kubernetes Cert', timeframe: '6m', parentGoalId: 'g2', isCompleted: false, createdAt: new Date().toISOString() },
        { id: 'g4', careerPathId: '1', title: 'Study CAP Theorem & Consensus', timeframe: 'monthly', parentGoalId: 'g3', isCompleted: true, createdAt: new Date().toISOString() },
        
        { id: 'g5', careerPathId: '2', title: 'Publish Best-Selling Tech Book', timeframe: '5y', isCompleted: false, createdAt: new Date().toISOString() },
        { id: 'g6', careerPathId: '2', title: 'Write 24 Deep-Dive Blog Posts', timeframe: '1y', parentGoalId: 'g5', isCompleted: false, createdAt: new Date().toISOString() },
        { id: 'g7', careerPathId: '2', title: 'Establish Writing Daily Habit', timeframe: 'monthly', isCompleted: true, createdAt: new Date().toISOString() },
      ],
      reviews: [],
      addCareerPath: (path) => set((state) => ({
        careerPaths: [...state.careerPaths, { ...path, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]
      })),
      deleteCareerPath: (id) => set((state) => ({
        careerPaths: state.careerPaths.filter(p => p.id !== id),
        goals: state.goals.filter(g => g.careerPathId !== id)
      })),
      updateCareerPath: (id, path) => set((state) => ({
        careerPaths: state.careerPaths.map(p => p.id === id ? { ...p, ...path } : p)
      })),
      addGoal: (goal) => set((state) => ({
        goals: [...state.goals, { ...goal, id: crypto.randomUUID(), createdAt: new Date().toISOString(), isCompleted: false }]
      })),
      toggleGoal: (id) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, isCompleted: !g.isCompleted } : g)
      })),
      updateGoal: (id, updates) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, ...updates } : g)
      })),
      deleteGoal: (id) => set((state) => ({
        goals: state.goals.filter(g => g.id !== id)
      })),
      addReview: (review) => set((state) => ({
        reviews: [...state.reviews, { ...review, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]
      })),
    }),
    { name: 'career-tracker-storage' }
  )
);