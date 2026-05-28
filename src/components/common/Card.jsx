export const Card = ({ children, className = '', noPadding = false, ...props }) => {
  return (
    <div
      className={`overflow-hidden rounded-[26px] border border-[var(--diabites-green-border)] bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm ${noPadding ? '' : 'p-5'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
