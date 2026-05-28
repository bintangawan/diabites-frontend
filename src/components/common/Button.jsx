export const Button = ({ 
  children, variant = 'primary', fullWidth = false, className = '', ...props 
}) => {
  const baseStyle = "flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";
  
  const variants = {
    primary: "bg-[var(--diabites-green)] text-white shadow-[0_18px_36px_var(--diabites-green-shadow)] hover:bg-[var(--diabites-green-dark)]",
    secondary: "bg-[var(--diabites-green-soft)] text-[var(--diabites-green)] shadow-[0_12px_28px_var(--diabites-green-shadow-soft)] hover:bg-[var(--diabites-green-panel)]",
    danger: "bg-orange-50 text-orange-700 shadow-[0_12px_28px_rgba(249,115,22,0.10)] hover:bg-orange-100",
    outline: "border border-slate-200 bg-white/90 text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.06)] hover:border-[var(--diabites-green-border)] hover:text-[var(--diabites-green)]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
};
