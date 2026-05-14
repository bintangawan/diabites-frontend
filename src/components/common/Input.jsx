export const Input = ({ label, error, icon, rightIcon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-slate-700 ml-1">{label}</label>}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-slate-400 pointer-events-none">{icon}</div>
        )}
        <input
          className={`w-full px-4 py-3 rounded-xl border ${
            error ? 'border-orange-300 focus:ring-orange-100 focus:border-orange-400' : 'border-slate-200 focus:border-emerald-400 focus:ring-emerald-100'
          } bg-white/95 outline-none shadow-sm focus:ring-4 transition-all ${icon ? 'pl-11' : ''} ${rightIcon ? 'pr-11' : ''}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-orange-500 ml-1 mt-0.5">{error}</span>}
    </div>
  );
};
