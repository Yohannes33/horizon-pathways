import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useStore } from '../store/useStore';

interface AddCareerPathModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = [
  { name: 'Indigo', value: 'bg-indigo-500', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/42e95c56-4525-4d12-a02d-2eb0bd5219e6/vision-indigo-91a006e0-1772019067595.webp' },
  { name: 'Emerald', value: 'bg-emerald-500', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/42e95c56-4525-4d12-a02d-2eb0bd5219e6/vision-emerald-bd6bea4a-1772019068610.webp' },
  { name: 'Rose', value: 'bg-rose-500', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/42e95c56-4525-4d12-a02d-2eb0bd5219e6/vision-rose-1bad369c-1772019067908.webp' },
  { name: 'Violet', value: 'bg-violet-500', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/42e95c56-4525-4d12-a02d-2eb0bd5219e6/vision-3-violet-fbd1631f-1772018733999.webp' },
];

export const AddCareerPathModal = ({ isOpen, onClose }: AddCareerPathModalProps) => {
  const { addCareerPath } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [motivation, setMotivation] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in the title and description');
      return;
    }

    addCareerPath({
      title,
      description,
      motivation,
      color: COLORS[selectedColorIndex].value,
      image: COLORS[selectedColorIndex].image,
    });

    toast.success('Vision added successfully! ✨');
    setTitle('');
    setDescription('');
    setMotivation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">New Strategic Vision</h3>
            <p className="text-sm text-slate-500 font-medium">Define a new career domain to master.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Vision Title</label>
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Creative Director, Principal Engineer"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-slate-900 transition-all font-medium text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Core Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does success look like in this domain?"
                rows={3}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-slate-900 transition-all font-medium resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Motivation</label>
              <input
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Why does this matter to you?"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-slate-900 transition-all font-medium"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Visual Identity</label>
              <div className="grid grid-cols-4 gap-4">
                {COLORS.map((color, idx) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                      selectedColorIndex === idx ? 'border-slate-900 ring-2 ring-slate-900 ring-offset-2' : 'border-transparent'
                    }`}
                  >
                    <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 ${color.value} opacity-20`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
          >
            <Sparkles size={18} />
            Initialize Vision
          </button>
        </form>
      </motion.div>
    </div>
  );
};