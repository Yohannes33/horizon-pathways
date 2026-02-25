import React, { useState, useMemo } from 'react';
import { CalendarDays, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useStore } from '../store/useStore';
import { Card } from './UI';

export const WeeklyReviewPage = () => {
  const { goals, addReview } = useStore();
  const [reflection, setReflection] = useState('');
  const completedGoals = useMemo(() => goals.filter(g => g.isCompleted), [goals]);

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-20 animate-in fade-in duration-700">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2.5rem] border border-indigo-100 mb-2 rotate-3 shadow-xl shadow-indigo-100/50">
          <CalendarDays size={48} />
        </div>
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Strategic Weekly Review</h1>
          <p className="text-slate-500 text-xl font-medium mt-2">Week ending {format(new Date(), 'MMMM do, yyyy')}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Weekly Momentum</h3>
            <Card className="p-8 bg-emerald-50/20 border-emerald-100 rounded-[2.5rem]">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-emerald-200">
                  <TrendingUp size={32} />
                </div>
                <div>
                  <p className="text-4xl font-black text-slate-900 leading-none">{completedGoals.length}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Objectives Achieved</p>
                </div>
              </div>
              <div className="space-y-4">
                {completedGoals.slice(0, 5).map((g) => (
                  <div key={g.id} className="flex items-start gap-4 text-sm font-bold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="truncate">{g.title}</span>
                  </div>
                ))}
                {completedGoals.length === 0 && (
                  <div className="py-10 text-center space-y-2">
                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest">No achievements yet</p>
                    <p className="text-sm text-slate-500 font-medium italic">Every small step counts. Keep moving forward.</p>
                  </div>
                )}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Priority Pipeline</h3>
            <div className="space-y-4">
              {goals.filter(g => !g.isCompleted).slice(0, 4).map((g) => (
                <div key={g.id} className="p-5 bg-white rounded-[1.5rem] border border-slate-100 text-sm font-black text-slate-600 flex items-center justify-between group hover:border-slate-300 transition-all cursor-pointer shadow-sm">
                  <span className="truncate pr-4">{g.title}</span>
                  <ChevronRight size={16} className="shrink-0 text-slate-300 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-3 space-y-10">
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Mindset Reflection</h3>
            <Card className="p-2 rounded-[2.5rem]">
              <textarea 
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What was your strategic breakthrough this week? What friction points did you encounter?"
                className="w-full h-80 p-8 rounded-[2.3rem] border-none focus:ring-0 text-slate-700 text-xl leading-relaxed placeholder:text-slate-200 resize-none font-medium"
              />
            </Card>
          </section>

          <section className="space-y-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Next Week's Strategic Intent</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-6 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-xl shadow-slate-200 shrink-0">
                    {i}
                  </div>
                  <input 
                    type="text" 
                    placeholder={`Define mission priority ${i}...`}
                    className="flex-1 bg-transparent border-b-4 border-slate-50 focus:border-slate-900 py-4 text-2xl font-black placeholder:text-slate-100 outline-none transition-all"
                  />
                </div>
              ))}
            </div>
          </section>

          <button 
            onClick={() => {
              if (!reflection.trim()) {
                toast.error('Please record your mindset reflection.');
                return;
              }
              addReview({
                weekStartDate: new Date().toISOString(),
                summary: reflection,
                priorities: [],
                completedGoalIds: completedGoals.map(g => g.id)
              });
              toast.success('Strategy session logged. Ready for the next horizon! \\u2728');
              setReflection('');
            }}
            className="w-full py-6 bg-slate-900 text-white font-black text-xl rounded-[2.5rem] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98] mt-6 flex items-center justify-center gap-3"
          >
            Finalize Weekly Strategy
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};