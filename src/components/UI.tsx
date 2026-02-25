import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Goal } from '../store/useStore';

export const ProgressBar = ({ value, color = "bg-primary" }: { value: number, color?: string }) => (
  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      className={`h-full ${color} transition-all duration-1000`}
    />
  </div>
);

export const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
    {children}
  </div>
);

export const GoalItem = ({ goal, onToggle, onDelete }: { goal: Goal, onToggle: (id: string) => void, onDelete?: (id: string) => void }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-300 transition-all group relative"
  >
    <button 
      onClick={() => onToggle(goal.id)}
      className={`transition-all duration-300 transform active:scale-90 ${goal.isCompleted ? 'text-emerald-500' : 'text-slate-300 group-hover:text-slate-400'}`}
    >
      {goal.isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
    </button>
    <div className="flex-1 flex flex-col min-w-0">
      <span className={`text-sm font-medium truncate ${goal.isCompleted ? 'line-through text-slate-400' : 'text-slate-700'}`}>
        {goal.title}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <div className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {goal.timeframe}
        </span>
      </div>
      {onDelete && (
        <button 
          onClick={() => onDelete(goal.id)}
          className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-500 transition-all"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  </motion.div>
);