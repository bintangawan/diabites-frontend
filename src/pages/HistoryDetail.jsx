import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

const HistoryDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Menangkap data yang dikirim dari halaman History
  const item = location.state?.item;

  // Jika user iseng akses URL langsung tanpa klik dari History, kembalikan ke History
  if (!item) {
    navigate('/history');
    return null;
  }

  // Helper untuk menentukan UI berdasarkan status
  const getStatusUI = (status) => {
    switch (status?.toLowerCase()) {
      case 'recommended':
        return { icon: <CheckCircle size={32} className="text-emerald-600" />, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900' };
      case 'caution':
        return { icon: <AlertTriangle size={32} className="text-amber-600" />, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900' };
      case 'not recommended':
        return { icon: <XCircle size={32} className="text-rose-600" />, bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-900' };
      default:
        return { icon: <AlertTriangle size={32} className="text-slate-600" />, bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-900' };
    }
  };

  const statusUI = getStatusUI(item.status);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans max-w-md mx-auto shadow-2xl relative">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">Detail Riwayat</h1>
          <p className="text-xs text-slate-500">{item.date}</p>
        </div>
      </header>

      <div className="p-4 space-y-4 pb-24">
        
        {/* Gambar Preview (Mockup) */}
        <div className="w-full h-48 bg-slate-200 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-200 shadow-inner relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          {/* Karena belum ada backend gambar, kita pakai placeholder inisial nama produk */}
          <span className="text-6xl font-bold text-slate-300 drop-shadow-md">
            {item.name.charAt(0)}
          </span>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl font-bold">{item.name}</h2>
          </div>
        </div>

        {/* Status Rekomendasi Utama */}
        <Card noPadding className={`${statusUI.border} ${statusUI.bg} overflow-hidden`}>
          <div className="p-5 flex items-start gap-4">
            <div className="mt-1 shrink-0">
              {statusUI.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className={`text-xl font-bold ${statusUI.text}`}>{item.status}</h2>
                <Badge status={item.status} text={item.status === 'Recommended' ? 'Aman' : item.status === 'Caution' ? 'Peringatan' : 'Bahaya'} />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {item.reason}
              </p>
            </div>
          </div>
        </Card>

        {/* Detail Nutrisi (Read-Only) */}
        <Card>
          <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900">Kandungan Gizi</h3>
            <span className="text-xs font-medium text-slate-500">Per {item.servingSize}</span>
          </div>
          
          <div className="space-y-4 mt-2">
            {item.nutrients.map((nut, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-600">{nut.label}</span>
                  <span className="text-slate-900">{nut.value} {nut.unit}</span>
                </div>
                {/* Visualisasi Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${nut.color} transition-all duration-500`} 
                    style={{ width: `${Math.min((nut.value / nut.max) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default HistoryDetail;