import React, { useState, useMemo } from 'react';
import { Trophy, Plus, Sparkles, Rocket } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Card, ProgressBar, GoalItem } from './UI';
import { AddGoalModal } from './AddGoalModal';
import { AddCareerPathModal } from './AddCareerPathModal';

export const Dashboard = ({ onSelectPath }: { onSelectPath: (id: string) => void }) => {
  const { careerPaths, goals, toggleGoal } = useStore();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isAddVisionOpen, setIsAddVisionOpen] = useState(false);
  
  const activeMonthlyGoals = goals.filter(g => g.timeframe === 'monthly' && !g.isCompleted);
  
  const stats = useMemo(() => {
    const total = goals.length;
    const completed = goals.filter(g => g.isCompleted).length;
    return {
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
      total,
      completed
    };
  }, [goals]);

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
             <div className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black text-indigo-600 uppercase tracking-widest">Overview</div>
             <Sparkles size={14} className="text-indigo-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Strategic Roadmap</h1>
          <p className="text-slate-500 text-lg">Focus on the vision, execute on the steps.</p>
        </div>
        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Global Progress</p>
            <p className="text-4xl font-black text-slate-900 leading-none">{stats.percent}%</p>
          </div>
          <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl rotate-3">
            <Trophy size={32} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Active Career Paths</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {careerPaths.map((path) => {
              const pathGoals = goals.filter(g => g.careerPathId === path.id);
              const progress = pathGoals.length > 0 
                ? (pathGoals.filter(g => g.isCompleted).length / pathGoals.length) * 100 
                : 0;

              return (
                <Card key={path.id} className="group cursor-pointer overflow-hidden rounded-[2.5rem]">
                  <div 
                    onClick={() => onSelectPath(path.id)}
                    className="h-52 relative overflow-hidden"
                  >
                    <img src={path.image} alt={path.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${path.color} ring-4 ring-white/10`} />
                        <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">Strategy</span>
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight">{path.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <p className="text-sm text-slate-500 font-medium leading-relaxed min-h-[40px]">
                      {path.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Momentum</span>
                        <span className="text-slate-900">{Math.round(progress)}%</span>
                      </div>
                      <ProgressBar value={progress} color={path.color} />
                    </div>
                  </div>
                </Card>
              );
            })}
            <button 
              onClick={() => setIsAddVisionOpen(true)}
              className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all gap-4 h-[350px] group"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                <Plus size={32} />
              </div>
              <span className="font-black text-xs uppercase tracking-widest">Add New Vision</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Action List (Monthly)</h2>
          <Card className="p-8 bg-slate-50/50 min-h-[500px] rounded-[2.5rem] border-slate-100 flex flex-col">
            <div className="space-y-3 flex-1">
              <AnimatePresence mode="popLayout">
                {activeMonthlyGoals.length > 0 ? (
                  activeMonthlyGoals.map((goal) => (
                    <GoalItem key={goal.id} goal={goal} onToggle={toggleGoal} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-sm border border-slate-100">
                      <Rocket size={32} className="text-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-black text-slate-900 uppercase tracking-widest text-xs">Horizon Clear</p>
                      <p className="text-sm text-slate-500 font-medium">No pending monthly tasks.</p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={() => setIsAddGoalOpen(true)}
              className="w-full mt-8 py-5 px-4 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm text-xs font-black uppercase tracking-widest text-slate-900 hover:shadow-md hover:border-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Quick Strategic Goal
            </button>
          </Card>
        </div>
      </div>

      <AddGoalModal isOpen={isAddGoalOpen} onClose={() => setIsAddGoalOpen(false)} />
      <AddCareerPathModal isOpen={isAddVisionOpen} onClose={() => setIsAddVisionOpen(false)} />
    </div>
  );
};