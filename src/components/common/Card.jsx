export const Card = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`overflow-hidden rounded-[26px] border border-emerald-100/70 bg-white/95 shadow-[0_18px_45px_rgba(15,118,110,0.08)] backdrop-blur-sm ${noPadding ? '' : 'p-5'} ${className}`}>
      {children}
    </div>
  );
};
