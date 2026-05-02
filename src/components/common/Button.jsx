export const Button = ({ 
  children, variant = 'primary', fullWidth = false, className = '', ...props 
}) => {
  const baseStyle = "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20",
    secondary: "bg-teal-50 hover:bg-teal-100 text-teal-700",
    danger: "bg-rose-50 hover:bg-rose-100 text-rose-600",
    outline: "border-2 border-slate-200 hover:border-teal-600 hover:text-teal-600 text-slate-600"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
};