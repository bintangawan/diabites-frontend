import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Filter, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useUser } from '../context/UserContext';
import { extractErrorMessage, scanApi } from '../services/api';
import { toScanViewModel } from '../utils/viewModels';

const History = () => {
  const navigate = useNavigate();
  const { userProfile } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadHistory = async () => {
      setIsLoading(true);

      try {
        const { items } = await scanApi.getHistory({ page: 1, limit: 100 });
        if (!isMounted) {
          return;
        }

        setHistoryItems(items);
      } catch (error) {
        toast.error(extractErrorMessage(error));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayItems = useMemo(() => (
    historyItems
      .map((item) => toScanViewModel(item, userProfile?.healthProfile))
      .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [historyItems, searchTerm, userProfile?.healthProfile]);

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      <div className="px-6 py-4 bg-white mb-2 shadow-sm">
        <h1 className="text-lg font-bold text-slate-900">Riwayat Scan</h1>
        <p className="text-xs text-slate-500">Daftar produk yang pernah Anda analisis</p>
      </div>

      <div className="p-4">
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-100 focus:border-teal-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={() => setSearchTerm('')}
            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
          >
            <Filter size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {isLoading && (
            <Card className="text-sm text-slate-500">Memuat riwayat scan...</Card>
          )}

          {!isLoading && displayItems.length === 0 && (
            <Card className="text-sm text-slate-500">
              Belum ada riwayat scan yang cocok dengan pencarian Anda.
            </Card>
          )}

          {!isLoading && displayItems.map((item) => (
            <Card
              key={item.id}
              noPadding
              className="cursor-pointer hover:border-teal-300 transition-all hover:shadow-md"
            >
              <div
                className="p-4 flex items-start gap-3"
                onClick={() => navigate(`/history/${item.id}`)}
              >
                <div className="w-12 h-12 shrink-0 bg-slate-100 rounded-xl flex items-center justify-center text-lg font-bold text-slate-400">
                  {item.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-slate-400 truncate mb-1.5">{item.dateLabel}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 whitespace-nowrap">Kal {item.nutrition.calories} kcal</span>
                    <span className={`flex items-center gap-1 whitespace-nowrap ${item.nutrition.sugar > 10 ? 'text-rose-500 font-medium' : 'text-emerald-500 font-medium'}`}>
                      Gula {item.nutrition.sugar}g
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch shrink-0 ml-1">
                  <Badge text={item.statusLabel} status={item.statusKey} />
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
