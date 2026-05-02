import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Save, RefreshCw, AlertTriangle, Edit2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';

const ScanResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const imageToAnalyze = location.state?.image || null;

  // Ubah dummyResult menjadi State agar bisa diedit
  const [scanData, setScanData] = useState({
    productName: "Minuman Kemasan (Hasil Scan)",
    servingSize: "250 ml",
    status: "Caution", 
    reason: "Produk ini memiliki kadar gula (15g) yang mendekati batas maksimal harian untuk profil Anda. Kurangi konsumsi karbohidrat lain hari ini.",
    nutrients: {
      kalori: 140,
      gula: 15,
      karbohidrat: 35,
      lemak: 0,
      sodium: 150
    }
  });

  // State sementara untuk form di dalam Modal
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handler Buka Modal
  const handleOpenEdit = () => {
    // Salin data saat ini ke form edit
    setEditFormData({
      servingSize: scanData.servingSize,
      kalori: scanData.nutrients.kalori,
      gula: scanData.nutrients.gula,
      karbohidrat: scanData.nutrients.karbohidrat,
      lemak: scanData.nutrients.lemak,
      sodium: scanData.nutrients.sodium,
    });
    setIsEditModalOpen(true);
  };

  // Handler Perubahan Input di Modal
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Handler Simpan Editan
  const handleSaveEdit = (e) => {
    e.preventDefault();
    // Update state utama dengan data dari form
    setScanData((prev) => ({
      ...prev,
      servingSize: editFormData.servingSize,
      nutrients: {
        kalori: Number(editFormData.kalori),
        gula: Number(editFormData.gula),
        karbohidrat: Number(editFormData.karbohidrat),
        lemak: Number(editFormData.lemak),
        sodium: Number(editFormData.sodium),
      }
    }));
    setIsEditModalOpen(false);
    toast.success('Nilai gizi berhasil diperbarui!');
    
    // Note: Nanti di sini kita bisa panggil fungsi untuk hitung ulang 
    // status rekomendasi berdasarkan angka yang baru.
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-green-500">
            <RefreshCw className="animate-pulse" size={32} />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Menganalisis Label...</h2>
        <p className="text-gray-500 text-sm">AI DiaBites sedang mengekstraksi data kalori, gula, dan nutrisi lainnya.</p>
      </div>
    );
  }

  // Array pembantu untuk render UI nutrisi
  const nutrientList = [
    { label: 'Kalori', value: scanData.nutrients.kalori, unit: 'kcal', color: 'bg-blue-500', max: 500 },
    { label: 'Gula', value: scanData.nutrients.gula, unit: 'g', color: 'bg-yellow-500', max: 50 },
    { label: 'Karbohidrat', value: scanData.nutrients.karbohidrat, unit: 'g', color: 'bg-purple-500', max: 100 },
    { label: 'Lemak', value: scanData.nutrients.lemak, unit: 'g', color: 'bg-green-500', max: 50 },
    { label: 'Sodium', value: scanData.nutrients.sodium, unit: 'mg', color: 'bg-orange-500', max: 1000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      <header className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
        <button onClick={() => navigate('/home')} className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Hasil Analisis</h1>
      </header>

      <div className="p-4 space-y-4 max-w-md mx-auto">
        <div className="w-full h-40 bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-200 shadow-inner">
          {imageToAnalyze ? (
            <img src={imageToAnalyze} alt="Scanned Label" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-sm">Gambar Label Gizi</span>
          )}
        </div>

        <Card noPadding className="border-yellow-200 bg-yellow-50 overflow-hidden">
          <div className="p-5 flex items-start gap-4">
            <div className="mt-1">
              <AlertTriangle size={32} className="text-yellow-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-900">{scanData.status}</h2>
                <Badge text="Peringatan" status="caution" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {scanData.reason}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-bold text-gray-900">Kandungan Gizi</h3>
              <span className="text-xs font-medium text-gray-500">Per {scanData.servingSize}</span>
            </div>
            
            {/* Tombol Edit Manual */}
            <button 
              onClick={handleOpenEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
            >
              <Edit2 size={16} /> Edit
            </button>
          </div>
          
          <div className="space-y-4">
            {nutrientList.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="text-gray-900">{item.value} {item.unit}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${item.color} transition-all duration-500`} style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" fullWidth onClick={() => navigate('/scanner')} className="!py-3.5">
            <RefreshCw size={18} /> Scan Ulang
          </Button>
          <Button fullWidth className="!py-3.5" onClick={() => navigate('/history')}>
            <Save size={18} /> Simpan
          </Button>
        </div>
      </div>

      {/* OVERLAY MODAL EDIT MANUAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl h-[80vh] sm:h-auto overflow-y-auto">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Koreksi Data Gizi</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              Perbaiki nilai gizi jika hasil baca otomatis (OCR) kurang akurat sesuai label kemasan.
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <Input label="Ukuran Porsi (Serving Size)" name="servingSize" value={editFormData.servingSize || ''} onChange={handleEditChange} placeholder="Cth: 250 ml atau 2 keping" required />
              
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" label="Kalori (kcal)" name="kalori" value={editFormData.kalori || ''} onChange={handleEditChange} required />
                <Input type="number" label="Gula (g)" name="gula" value={editFormData.gula || ''} onChange={handleEditChange} required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" label="Karbohidrat (g)" name="karbohidrat" value={editFormData.karbohidrat || ''} onChange={handleEditChange} required />
                <Input type="number" label="Lemak (g)" name="lemak" value={editFormData.lemak || ''} onChange={handleEditChange} required />
              </div>

              <Input type="number" label="Sodium / Natrium (mg)" name="sodium" value={editFormData.sodium || ''} onChange={handleEditChange} required />

              <div className="pt-4 mt-2 border-t border-gray-100">
                <Button type="submit" fullWidth className="!py-3.5">
                  Simpan Perubahan
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default ScanResult;