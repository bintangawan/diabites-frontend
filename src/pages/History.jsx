import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

const History = () => {
  const navigate = useNavigate();

  // Dummy data riwayat scan yang diperkaya dengan detail
  const historyData = [
    { 
      id: 1, name: 'Susu UHT Coklat', date: 'Hari ini, 14:30', status: 'Not Recommended', servingSize: '250 ml',
      reason: 'Produk ini mengandung gula sangat tinggi (24g) yang melebihi batas aman sekali minum untuk penyandang diabetes.',
      nutrients: [
        { label: 'Kalori', value: 150, unit: 'kcal', color: 'bg-blue-500', max: 500 },
        { label: 'Gula', value: 24, unit: 'g', color: 'bg-rose-500', max: 50 },
        { label: 'Karbohidrat', value: 30, unit: 'g', color: 'bg-purple-500', max: 100 },
        { label: 'Lemak', value: 4, unit: 'g', color: 'bg-emerald-500', max: 50 },
        { label: 'Sodium', value: 120, unit: 'mg', color: 'bg-amber-500', max: 1000 },
      ]
    },
    { 
      id: 2, name: 'Roti Gandum Utuh', date: 'Kemarin, 08:15', status: 'Recommended', servingSize: '2 keping (60g)',
      reason: 'Kandungan serat tinggi dan gula sangat rendah. Aman dikonsumsi sebagai sumber karbohidrat kompleks.',
      nutrients: [
        { label: 'Kalori', value: 120, unit: 'kcal', color: 'bg-blue-500', max: 500 },
        { label: 'Gula', value: 2, unit: 'g', color: 'bg-emerald-500', max: 50 },
        { label: 'Karbohidrat', value: 22, unit: 'g', color: 'bg-purple-500', max: 100 },
        { label: 'Lemak', value: 2, unit: 'g', color: 'bg-emerald-500', max: 50 },
        { label: 'Sodium', value: 150, unit: 'mg', color: 'bg-amber-500', max: 1000 },
      ]
    },
    { 
      id: 3, name: 'Minuman Isotonik', date: '10 Mei 2026', status: 'Caution', servingSize: '350 ml',
      reason: 'Mengandung gula sedang (15g). Boleh dikonsumsi hanya jika Anda sedang melakukan aktivitas fisik berat atau hipoglikemia.',
      nutrients: [
        { label: 'Kalori', value: 140, unit: 'kcal', color: 'bg-blue-500', max: 500 },
        { label: 'Gula', value: 15, unit: 'g', color: 'bg-amber-500', max: 50 },
        { label: 'Karbohidrat', value: 35, unit: 'g', color: 'bg-purple-500', max: 100 },
        { label: 'Lemak', value: 0, unit: 'g', color: 'bg-emerald-500', max: 50 },
        { label: 'Sodium', value: 200, unit: 'mg', color: 'bg-amber-500', max: 1000 },
      ]
    },
  ];

  const handleGoToDetail = (item) => {
    // Navigasi ke halaman detail dan bawa data item-nya
    navigate(`/history/${item.id}`, { state: { item } });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      <div className="px-6 py-4 bg-white mb-2 shadow-sm">
        <h1 className="text-lg font-bold text-slate-900">Riwayat Scan</h1>
        <p className="text-xs text-slate-500">Daftar produk yang pernah Anda analisis</p>
      </div>

      <div className="p-4">
        {/* Search & Filter */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari produk..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-100 focus:border-teal-500 outline-none transition-all"
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 active:scale-95 transition-all">
            <Filter size={20} />
          </button>
        </div>

        {/* List Riwayat */}
        {/* List Riwayat */}
        <div className="space-y-3">
          {historyData.map((item) => (
            <Card 
              key={item.id} 
              noPadding 
              className="cursor-pointer hover:border-teal-300 transition-all hover:shadow-md"
            >
              {/* Gunakan items-start agar sejajar dari atas, dan gap-3 untuk jarak pas */}
              <div 
                className="p-4 flex items-start gap-3"
                onClick={() => handleGoToDetail(item)}
              >
                
                {/* 1. KIRI: Avatar (Pakai shrink-0 agar ukurannya tidak pernah gepeng) */}
                <div className="w-12 h-12 shrink-0 bg-slate-100 rounded-xl flex items-center justify-center text-lg font-bold text-slate-400">
                  {item.name.charAt(0)}
                </div>

                {/* 2. TENGAH: Info Teks (Pakai flex-1 dan min-w-0 agar bisa memotong teks kepanjangan) */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-slate-400 truncate mb-1.5">{item.date}</p>
                  
                  {/* Bagian Gizi: flex-wrap dinonaktifkan dengan whitespace-nowrap di child */}
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 whitespace-nowrap">🔥 {item.nutrients[0].value} kcal</span>
                    <span className={`flex items-center gap-1 whitespace-nowrap ${item.nutrients[1].value > 10 ? 'text-rose-500 font-medium' : 'text-emerald-500 font-medium'}`}>
                      🧊 {item.nutrients[1].value}g gula
                    </span>
                  </div>
                </div>

                {/* 3. KANAN: Badge & Panah (Pakai shrink-0 agar area status aman) */}
                <div className="flex flex-col items-end justify-between self-stretch shrink-0 ml-1">
                  <Badge text={item.status} />
                  <ChevronRight size={18} className="text-slate-300 mb-1" />
                </div>

              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;