export const Button = ({ 
  children, variant = 'primary', fullWidth = false, className = '', ...props 
}) => {
  const baseStyle = "flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";
  
  const variants = {
    primary: "bg-[linear-gradient(135deg,#0f766e_0%,#10b981_52%,#22c55e_100%)] text-white shadow-[0_18px_36px_rgba(16,185,129,0.24)] hover:brightness-[1.03]",
    secondary: "bg-emerald-50 text-emerald-700 shadow-[0_12px_28px_rgba(16,185,129,0.10)] hover:bg-emerald-100",
    danger: "bg-orange-50 text-orange-700 shadow-[0_12px_28px_rgba(249,115,22,0.10)] hover:bg-orange-100",
    outline: "border border-slate-200 bg-white/90 text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.06)] hover:border-emerald-300 hover:text-emerald-700"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
};
