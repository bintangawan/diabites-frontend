export const Card = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${noPadding ? '' : 'p-5'} ${className}`}>
      {children}
    </div>
  );
};