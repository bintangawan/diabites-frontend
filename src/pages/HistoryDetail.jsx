import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ChevronLeft, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useUser } from '../context/UserContext';
import { extractErrorMessage, scanApi } from '../services/api';
import { normalizeStatus } from '../utils/helpers';
import { toScanViewModel } from '../utils/viewModels';

const HistoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userProfile } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [scan, setScan] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadDetail = async () => {
      setIsLoading(true);

      try {
        const result = await scanApi.getById(id);
        if (!isMounted) {
          return;
        }

        setScan(result);
      } catch (error) {
        toast.error(extractErrorMessage(error));
        if (isMounted) {
          navigate('/history', { replace: true });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDetail();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const item = useMemo(() => (
    scan ? toScanViewModel(scan, userProfile?.healthProfile) : null
  ), [scan, userProfile?.healthProfile]);

  const getStatusUI = (status) => {
    switch (normalizeStatus(status)) {
      case 'recommended':
        return {
          icon: <CheckCircle size={32} className="text-emerald-600" />,
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-900',
        };
      case 'caution':
        return {
          icon: <AlertTriangle size={32} className="text-amber-600" />,
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-900',
        };
      case 'not recommended':
        return {
          icon: <XCircle size={32} className="text-rose-600" />,
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          text: 'text-rose-900',
        };
      default:
        return {
          icon: <AlertTriangle size={32} className="text-slate-600" />,
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          text: 'text-slate-900',
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <Card className="text-sm text-slate-500">Memuat detail scan...</Card>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const statusUI = getStatusUI(item.statusKey);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans max-w-md mx-auto shadow-2xl relative">
      <header className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">Detail Riwayat</h1>
          <p className="text-xs text-slate-500">{item.dateLabel}</p>
        </div>
      </header>

      <div className="p-4 space-y-4 pb-24">
        <div className="w-full h-48 bg-slate-200 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-200 shadow-inner relative">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="absolute inset-0 h-full w-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          {!item.imageUrl && (
            <span className="text-6xl font-bold text-slate-300 drop-shadow-md">
              {item.name.charAt(0)}
            </span>
          )}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl font-bold">{item.name}</h2>
          </div>
        </div>

        <Card noPadding className={`${statusUI.border} ${statusUI.bg} overflow-hidden`}>
          <div className="p-5 flex items-start gap-4">
            <div className="mt-1 shrink-0">
              {statusUI.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className={`text-xl font-bold ${statusUI.text}`}>{item.statusLabel}</h2>
                <Badge status={item.statusKey} text={item.badgeText} />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {item.reason}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900">Kandungan Gizi</h3>
            <span className="text-xs font-medium text-slate-500">Per {item.servingSize}</span>
          </div>

          <div className="space-y-4 mt-2">
            {item.nutrients.map((nut) => (
              <div key={nut.label}>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-600">{nut.label}</span>
                  <span className="text-slate-900">{nut.value} {nut.unit}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${nut.color} transition-all duration-500`}
                    style={{ width: `${Math.min((nut.value / nut.max) * 100, 100)}%` }}
                  />
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
