import React, { useState } from 'react';
import { ChevronLeft, Sparkles, Target, TrendingUp, Clock, CalendarDays, Plus, ArrowDownCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useStore, CareerPath, Timeframe } from '../store/useStore';
import { GoalItem } from './UI';
import { AddGoalModal } from './AddGoalModal';

export const PathDetail = ({ path, onBack }: { path: CareerPath, onBack: () => void }) => {
  const { goals, toggleGoal, deleteGoal } = useStore();
  const pathGoals = goals.filter(g => g.careerPathId === path.id);
  
  const [modalState, setModalState] = useState<{ isOpen: boolean, timeframe: Timeframe | null }>({
    isOpen: false,
    timeframe: null
  });

  const timeframeOrder: Timeframe[] = ['5y', '1y', '6m', 'monthly'];
  const labels: Record<Timeframe, { title: string; desc: string; icon: any; color: string; bgColor: string }> = {
    '5y': { title: '5-Year Vision', desc: 'The North Star', icon: Target, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    '1y': { title: '1-Year Goals', desc: 'Major Milestones', icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    '6m': { title: '6-Month Focus', desc: 'Core Momentum', icon: TrendingUp, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    'monthly': { title: 'Monthly Action', desc: 'Tactical Steps', icon: CalendarDays, color: 'text-orange-600', bgColor: 'bg-orange-50' }
  };

  const openAddModal = (tf: Timeframe) => setModalState({ isOpen: true, timeframe: tf });

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-500 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-black text-[10px] uppercase tracking-[0.3em]"
      >
        <ChevronLeft size={14} />
        Back to Strategy
      </button>

      <div className="relative h-80 md:h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl">
        <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-14 left-14 right-14 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/20">
              <Sparkles size={12} />
              Strategic Domain
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">{path.title}</h1>
            <p className="text-slate-200 text-xl font-medium opacity-90 max-w-xl leading-relaxed">{path.description}</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 text-white min-w-[200px] shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-3">Domain Mastery</p>
                <div className="flex items-end gap-2">
                  <p className="text-6xl font-black leading-none">{Math.round((pathGoals.filter(g => g.isCompleted).length / pathGoals.length) * 100 || 0)}</p>
                  <span className="text-2xl font-black opacity-50 pb-1">%</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start relative">
        {/* Connection Arrows (Desktop Only) */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-100 -z-10 hidden lg:block" />
        
        {timeframeOrder.map((tf, idx) => {
          const Icon = labels[tf].icon;
          const filteredGoals = pathGoals.filter(g => g.timeframe === tf);
          
          return (
            <div key={tf} className="flex flex-col gap-6">
              <div className="space-y-4 px-2">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${labels[tf].bgColor} flex items-center justify-center shadow-sm ${labels[tf].color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">{labels[tf].title}</h3>
                    <p className="text-[10px] text-slate-400 mt-1.5 italic font-medium">{labels[tf].desc}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredGoals.map((goal) => (
                    <GoalItem key={goal.id} goal={goal} onToggle={toggleGoal} onDelete={deleteGoal} />
                  ))}
                </AnimatePresence>
                
                <button 
                  onClick={() => openAddModal(tf)}
                  className="w-full py-5 border-2 border-dashed border-slate-100 rounded-[1.5rem] text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 hover:text-slate-500 transition-all flex items-center justify-center gap-2 group"
                >
                  <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                  Add {tf} Objective
                </button>
              </div>

              {idx < 3 && (
                <div className="lg:hidden flex justify-center py-4 opacity-10">
                  <ArrowDownCircle size={32} className="text-slate-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AddGoalModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ isOpen: false, timeframe: null })}
        initialPathId={path.id}
        initialTimeframe={modalState.timeframe!}
      />
    </div>
  );
};