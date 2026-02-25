import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Calendar, 
  ChevronRight, 
  Settings,
  LogOut,
} from 'lucide-react';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import { Dashboard } from './components/Dashboard';
import { PathDetail } from './components/PathDetail';
import { WeeklyReviewPage } from './components/WeeklyReview';

export default function App() {
  const { careerPaths } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'review' | 'path'>('dashboard');
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);

  const currentPath = useMemo(() => 
    careerPaths.find(p => p.id === selectedPathId), 
  [selectedPathId, careerPaths]);

  const handleSelectPath = (id: string) => {
    setSelectedPathId(id);
    setActiveTab('path');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 flex font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" richColors theme="light" />
      
      {/* Sidebar Navigation */}
      <aside className="w-80 border-r border-slate-100 p-10 flex flex-col gap-12 sticky top-0 h-screen hidden md:flex z-40 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl rotate-3">
            <Target size={32} />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black tracking-tighter leading-none">VISTA</span>
            <span className="text-[10px] font-black text-slate-300 tracking-[0.4em] mt-1">STRATEGY</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          <button
            onClick={() => { setActiveTab('dashboard'); setSelectedPathId(null); }}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] transition-all duration-500 font-black text-sm uppercase tracking-widest ${
              activeTab === 'dashboard' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 -translate-y-1' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard size={24} />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('review'); setSelectedPathId(null); }}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] transition-all duration-500 font-black text-sm uppercase tracking-widest ${
              activeTab === 'review' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 -translate-y-1' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calendar size={24} />
            <span>Strategy Review</span>
          </button>

          <div className="pt-12 pb-4 px-6">
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Active Domains</h3>
          </div>

          <div className="space-y-1.5">
            {careerPaths.map(path => (
              <button
                key={path.id}
                onClick={() => {
                  setSelectedPathId(path.id);
                  setActiveTab('path');
                }}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-[1.25rem] transition-all duration-300 group ${
                  selectedPathId === path.id 
                    ? 'bg-slate-100 text-slate-900 font-black' 
                    : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50 font-bold'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${path.color} ${selectedPathId === path.id ? 'scale-125 shadow-lg' : 'opacity-40'}`} />
                  <span className="text-sm tracking-tight">{path.title}</span>
                </div>
                <ChevronRight 
                  size={16} 
                  className={`transition-all duration-500 ${selectedPathId === path.id ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-40'}`} 
                />
              </button>
            ))}
          </div>
        </nav>

        <div className="pt-8 border-t border-slate-50 space-y-2">
          <button className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-widest transition-colors">
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-rose-500 font-black text-xs uppercase tracking-widest transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-10 md:px-16 md:py-16">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Dashboard onSelectPath={handleSelectPath} />
              </motion.div>
            )}

            {activeTab === 'path' && currentPath && (
              <motion.div
                key={`path-${currentPath.id}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <PathDetail 
                  path={currentPath} 
                  onBack={() => setActiveTab('dashboard')}
                />
              </motion.div>
            )}

            {activeTab === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <WeeklyReviewPage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-slate-100 px-8 py-6 flex justify-around items-center z-50 rounded-t-[2.5rem] shadow-2xl">
        <button 
          onClick={() => { setActiveTab('dashboard'); setSelectedPathId(null); }} 
          className={`p-4 rounded-2xl transition-all ${activeTab === 'dashboard' ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 -translate-y-2' : 'text-slate-400'}`}
        >
          <LayoutDashboard size={24} />
        </button>
        <button 
          onClick={() => { setActiveTab('review'); setSelectedPathId(null); }} 
          className={`p-4 rounded-2xl transition-all ${activeTab === 'review' ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 -translate-y-2' : 'text-slate-400'}`}
        >
          <Calendar size={24} />
        </button>
        <div className="w-px h-10 bg-slate-100 mx-4" />
        {careerPaths.slice(0, 2).map(path => (
          <button 
            key={path.id}
            onClick={() => { setSelectedPathId(path.id); setActiveTab('path'); }} 
            className={`p-4 rounded-2xl transition-all ${selectedPathId === path.id ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 -translate-y-2' : 'text-slate-400'}`}
          >
            <div className={`w-5 h-5 rounded-full ${path.color} border-2 border-white shadow-sm`} />
          </button>
        ))}
      </div>
    </div>
  );
}