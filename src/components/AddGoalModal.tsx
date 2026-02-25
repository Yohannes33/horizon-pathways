import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useStore, Timeframe } from '../store/useStore';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPathId?: string;
  initialTimeframe?: Timeframe;
}

export const AddGoalModal = ({ isOpen, onClose, initialPathId, initialTimeframe }: AddGoalModalProps) => {
  const { careerPaths, addGoal } = useStore();
  const [title, setTitle] = useState('');
  const [pathId, setPathId] = useState(initialPathId || (careerPaths[0]?.id || ''));
  const [timeframe, setTimeframe] = useState<Timeframe>(initialTimeframe || 'monthly');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !pathId) return;
    
    addGoal({
      title,
      careerPathId: pathId,
      timeframe,
    });
    
    toast.success('Goal added successfully!');
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl space-y-8"
      >
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">Define Goal</h3>
            <p className="text-sm text-slate-500 font-medium">Break your vision into steps.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">What's the goal?</label>
              <input 
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Design system architecture"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-slate-900 transition-all font-medium"
              />
            </div>

            {!initialPathId && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Select Path</label>
                <select 
                  value={pathId}
                  onChange={(e) => setPathId(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-slate-900 transition-all font-medium appearance-none"
                >
                  {careerPaths.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
            )}

            {!initialTimeframe && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Select Timeframe</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['5y', '1y', '6m', 'monthly'] as Timeframe[]).map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setTimeframe(tf)}
                      className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${
                        timeframe === tf 
                        ? 'border-slate-900 bg-slate-900 text-white shadow-lg' 
                        : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Create Strategic Goal
          </button>
        </form>
      </motion.div>
    </div>
  );
};