import { useEffect } from 'react';
import { X } from 'lucide-react';

const ImagePreviewModal = ({ src, alt, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !src) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/78 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau gambar"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/92 p-2 text-slate-700 shadow-lg transition-colors hover:bg-white"
        aria-label="Tutup pratinjau"
      >
        <X size={20} />
      </button>

      <div
        className="flex max-h-[90vh] w-full max-w-4xl items-center justify-center rounded-[1.8rem] bg-white/96 p-3 shadow-[0_28px_70px_rgba(15,23,42,0.28)] sm:p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[82vh] w-full rounded-[1.2rem] object-contain"
        />
      </div>
    </div>
  );
};

export default ImagePreviewModal;
