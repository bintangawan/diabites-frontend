import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image as ImageIcon, Flashlight, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const Scanner = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isFlashOn, setIsFlashOn] = useState(false);

  // Fungsi untuk trigger input file yang disembunyikan
  const openCameraOrGallery = () => {
    fileInputRef.current?.click();
  };

  // Dummy handle ketika gambar dipilih/difoto
  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      toast.success('Gambar berhasil diambil! Mengekstraksi gizi...');
      // Nanti di sini kita arahkan ke halaman hasil (ScanResult)
      navigate('/scan-result', { state: { image: URL.createObjectURL(file) } });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-between font-sans">
      {/* Header Controls */}
      <div className="w-full flex justify-between items-center p-6 pt-safe mt-4 z-10">
        <button onClick={() => navigate(-1)} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
          <X size={24} />
        </button>
        <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white/80 text-sm font-medium">
          Arahkan ke Label Gizi
        </div>
        <button 
          onClick={() => setIsFlashOn(!isFlashOn)} 
          className={`p-3 backdrop-blur-md rounded-full transition-all ${isFlashOn ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          <Flashlight size={24} />
        </button>
      </div>

      {/* Viewfinder / Scanner Frame UI */}
      <div className="relative w-72 h-96 flex items-center justify-center">
        {/* Sudut-sudut bingkai scanner */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-500 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-500 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-500 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-500 rounded-br-xl"></div>
        
        {/* Animasi Garis Laser Scan */}
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-[ping_3s_ease-in-out_infinite]"></div>
        
        <p className="text-white/40 text-center text-sm px-8">
          Pastikan teks Kalori, Gula, Lemak, dll terlihat jelas.
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="w-full bg-black/60 backdrop-blur-xl pb-safe pt-6 rounded-t-[40px] flex flex-col items-center">
        <div className="flex items-center justify-center gap-12 w-full px-8 pb-10">
          
          {/* Tombol Gallery */}
          <button onClick={openCameraOrGallery} className="flex flex-col items-center gap-2 p-3 text-white/70 hover:text-white transition-colors">
            <div className="p-4 bg-white/10 rounded-full">
              <ImageIcon size={28} />
            </div>
            <span className="text-xs font-medium">Galeri</span>
          </button>

          {/* Tombol Shutter Utama */}
          <button onClick={openCameraOrGallery} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 active:scale-95 transition-transform">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
               <Camera size={32} className="text-gray-900" />
            </div>
          </button>

          {/* Spacer untuk menyeimbangkan layout */}
          <div className="w-[76px]"></div>
        </div>
      </div>

      {/* Input File Hidden (Magic-nya di sini) */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageCapture}
        accept="image/*" 
        capture="environment" 
        className="hidden" 
      />
    </div>
  );
};

export default Scanner;