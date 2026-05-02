import { getStatusColor } from '../../utils/helpers';

export const Badge = ({ text, status, className = '' }) => {
  const colorClass = getStatusColor(status || text);

  return (
    // Tambahan KUNCI: whitespace-nowrap agar teks tidak pernah turun baris
    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border whitespace-nowrap tracking-wide ${colorClass.bg} ${colorClass.text} ${colorClass.border} ${className}`}>
      {text}
    </span>
  );
};