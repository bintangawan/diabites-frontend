import { Activity } from 'lucide-react';

const GlobalHeader = () => {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 flex justify-center items-center h-14 w-full">
      <div className="flex items-center gap-2 text-teal-600">
        <Activity size={24} strokeWidth={2.5} />
        <span className="font-bold text-lg tracking-tight">DiaBites</span>
      </div>
    </div>
  );
};

export default GlobalHeader;