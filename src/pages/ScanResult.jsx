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
      <div className="min-h-screen bg-[linear-gradient(180deg,#effcf5_0%,#eef9ff_100%)] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-6 h-24 w-24">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-emerald-500">
            <RefreshCw className="animate-pulse" size={32} />
          </div>
        </div>
        <h2 className="mb-2 text-xl font-bold text-slate-900">Menganalisis Label...</h2>
        <p className="max-w-xs text-sm leading-relaxed text-slate-500">
          AI DiaBites sedang mengekstraksi data kalori, gula, dan nutrisi lainnya.
        </p>
      </div>
    );
  }

  // Array pembantu untuk render UI nutrisi
  const nutrientList = [
    { label: 'Kalori', value: scanData.nutrients.kalori, unit: 'kcal', color: 'bg-sky-500', max: 500 },
    { label: 'Gula', value: scanData.nutrients.gula, unit: 'g', color: 'bg-amber-400', max: 50 },
    { label: 'Karbohidrat', value: scanData.nutrients.karbohidrat, unit: 'g', color: 'bg-cyan-500', max: 100 },
    { label: 'Lemak', value: scanData.nutrients.lemak, unit: 'g', color: 'bg-emerald-500', max: 50 },
    { label: 'Sodium', value: scanData.nutrients.sodium, unit: 'mg', color: 'bg-orange-400', max: 1000 },
  ];

  return (
    <div className="relative min-h-screen bg-[linear-gradient(180deg,#effcf5_0%,#eef9ff_100%)] pb-24">
      <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-white/70 bg-white/82 px-4 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
        <button
          onClick={() => navigate('/home')}
          className="rounded-2xl bg-slate-50 p-2.5 text-slate-600 transition-colors hover:bg-slate-100"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Hasil Analisis</h1>
          <p className="text-xs text-slate-500">Ringkasan scan label gizi</p>
        </div>
      </header>

      <div className="mx-auto max-w-md space-y-4 p-4">
        <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/85 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-[22px] border border-emerald-100 bg-slate-100 shadow-inner">
          {imageToAnalyze ? (
            <img src={imageToAnalyze} alt="Scanned Label" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm text-slate-400">Gambar Label Gizi</span>
          )}
          </div>
        </div>

        <Card noPadding className="overflow-hidden border-amber-200 bg-[linear-gradient(180deg,#fffdf2_0%,#ffffff_100%)]">
          <div className="flex items-start gap-4 p-5">
            <div className="mt-1">
              <div className="rounded-2xl bg-amber-100 p-2.5 text-amber-700">
                <AlertTriangle size={26} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{scanData.status}</h2>
                <Badge text="Peringatan" status="caution" />
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{scanData.reason}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Kandungan Gizi</h3>
              <span className="text-xs font-medium text-slate-500">Per {scanData.servingSize}</span>
            </div>

            <button
              onClick={handleOpenEdit}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
            >
              <Edit2 size={16} /> Edit
            </button>
          </div>

          <div className="space-y-4">
            {nutrientList.map((item, idx) => (
              <div key={idx}>
                <div className="mb-1.5 flex justify-between text-sm font-medium">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="text-slate-900">{item.value} {item.unit}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6 flex gap-3">
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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="h-[80vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white/98 p-6 shadow-2xl sm:h-auto sm:rounded-[28px]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Koreksi Data Gizi</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-6 text-sm text-slate-500">
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

              <div className="mt-2 border-t border-slate-100 pt-4">
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
