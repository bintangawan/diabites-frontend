import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ChevronLeft,
  Edit2,
  Loader2,
  RefreshCw,
  Save,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import ImagePreviewModal from '../components/common/ImagePreviewModal';
import { Input } from '../components/common/Input';
import { useUser } from '../context/UserContext';
import { extractErrorMessage, scanApi } from '../services/api';
import { toScanViewModel } from '../utils/viewModels';

const SCAN_DRAFT_STORAGE_KEY = 'diabites_scan_draft';
const scanAnalysisRequests = new Map();

const readStoredDraft = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(SCAN_DRAFT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const persistDraft = (draft) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!draft) {
    sessionStorage.removeItem(SCAN_DRAFT_STORAGE_KEY);
    return;
  }

  sessionStorage.setItem(SCAN_DRAFT_STORAGE_KEY, JSON.stringify(draft));
};

const notifyDataRefresh = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('diabites:data-refresh'));
  }
};

const normalizeDraft = (payload) => ({
  productName: payload.productName || '',
  imageUrl: payload.imageUrl,
  servingSize: payload.servingSize || '',
  calories: Number(payload.calories || 0),
  sugar: Number(payload.sugar || 0),
  carbohydrates: Number(payload.carbohydrates || 0),
  fat: Number(payload.fat || 0),
  sodium: Number(payload.sodium || 0),
  recommendation: payload.recommendation ?? null,
  needsManualReview: Boolean(payload.needsManualReview),
  reviewReasons: payload.reviewReasons || [],
});

const getAnalysisRequest = (scanKey, uploadedFile) => {
  if (!scanKey) {
    return scanApi.analyze(uploadedFile);
  }

  if (!scanAnalysisRequests.has(scanKey)) {
    scanAnalysisRequests.set(scanKey, scanApi.analyze(uploadedFile));
  }

  return scanAnalysisRequests.get(scanKey);
};

const ScanResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, refreshDashboard } = useUser();
  const uploadedFile = location.state?.file || null;
  const previewUrl = location.state?.previewUrl || null;
  const scanKey = location.state?.scanKey || null;
  const [isAnalyzing, setIsAnalyzing] = useState(Boolean(uploadedFile));
  const [isSaving, setIsSaving] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [scanDraft, setScanDraft] = useState(() => readStoredDraft());
  const [editFormData, setEditFormData] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const analyzeImage = async () => {
      if (!uploadedFile) {
        if (!readStoredDraft()) {
          navigate('/scanner', { replace: true });
        }
        setIsAnalyzing(false);
        return;
      }

      setIsAnalyzing(true);

      try {
        const result = await getAnalysisRequest(scanKey, uploadedFile);
        if (!isMounted) {
          return;
        }

        const nextDraft = normalizeDraft(result);
        setScanDraft(nextDraft);
        persistDraft(nextDraft);

        if (nextDraft.needsManualReview) {
          toast('Sebagian data gizi perlu dicek ulang secara manual.');
        }
      } catch (error) {
        toast.error(extractErrorMessage(error));
        if (isMounted) {
          navigate('/scanner', { replace: true });
        }
      } finally {
        if (isMounted) {
          setIsAnalyzing(false);
        }
      }
    };

    analyzeImage();

    return () => {
      isMounted = false;
    };
  }, [navigate, scanKey, uploadedFile]);

  const scanView = useMemo(() => (
    scanDraft
      ? toScanViewModel(
          {
            id: 'draft',
            ...scanDraft,
          },
          userProfile?.healthProfile,
        )
      : null
  ), [scanDraft, userProfile?.healthProfile]);

  const displayReason = scanDraft?.needsManualReview && scanDraft.reviewReasons?.length
    ? scanDraft.reviewReasons.join(' ')
    : scanView?.reason;
  const displayStatusLabel = scanDraft?.needsManualReview ? 'Perlu Dicek' : scanView?.statusLabel;
  const displayBadgeText = scanDraft?.needsManualReview ? 'Edit Manual' : scanView?.badgeText;

  const displayedImage = scanView?.imageUrl || previewUrl;

  const handleOpenEdit = () => {
    if (!scanDraft) {
      return;
    }

    setEditFormData({
      servingSize: scanDraft.servingSize,
      calories: scanDraft.calories,
      sugar: scanDraft.sugar,
      carbohydrates: scanDraft.carbohydrates,
      fat: scanDraft.fat ?? 0,
      sodium: scanDraft.sodium,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (event) => {
    setEditFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();

    const nextDraft = normalizeDraft({
      ...scanDraft,
      servingSize: editFormData.servingSize,
      calories: editFormData.calories,
      sugar: editFormData.sugar,
      carbohydrates: editFormData.carbohydrates,
      fat: editFormData.fat,
      sodium: editFormData.sodium,
      recommendation: null,
      needsManualReview: false,
      reviewReasons: [],
    });

    setScanDraft(nextDraft);
    persistDraft(nextDraft);
    setIsEditModalOpen(false);
    toast.success('Nilai gizi berhasil diperbarui!');
  };

  const handleSaveScan = async () => {
    if (!scanDraft) {
      return;
    }

    if (scanDraft.needsManualReview) {
      toast('Lengkapi atau koreksi data gizi manual sebelum disimpan.');
      handleOpenEdit();
      return;
    }

    setIsSaving(true);

    try {
      await scanApi.save({
        productName: scanDraft.productName,
        imageUrl: scanDraft.imageUrl,
        servingSize: scanDraft.servingSize,
        calories: scanDraft.calories,
        sugar: scanDraft.sugar,
        carbohydrates: scanDraft.carbohydrates,
        fat: scanDraft.fat,
        sodium: scanDraft.sodium,
        recommendation: scanDraft.recommendation,
      });

      persistDraft(null);

      try {
        await refreshDashboard();
        notifyDataRefresh();
      } catch {
        notifyDataRefresh();
      }

      toast.success('Scan berhasil disimpan!');
      navigate('/scanner', { replace: true });
    } catch (error) {
      toast.error(extractErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--diabites-green-surface)] p-6 text-center">
        <div className="relative mb-6 h-24 w-24">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--diabites-green-soft)]" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[var(--diabites-green)] border-t-transparent" />
          <div className="absolute inset-0 flex items-center justify-center text-[var(--diabites-green)]">
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

  if (!scanView) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-[var(--diabites-green-surface)] pb-24">
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
          <button
            type="button"
            onClick={() => displayedImage && setIsPreviewOpen(true)}
            className="flex h-44 w-full items-center justify-center overflow-hidden rounded-[22px] border border-[var(--diabites-green-border)] bg-slate-100 shadow-inner"
          >
            {displayedImage ? (
              <img src={displayedImage} alt="Scanned Label" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm text-slate-400">Gambar Label Gizi</span>
            )}
          </button>
        </div>

        <Card noPadding className="overflow-hidden border-amber-200 bg-white">
          <div className="flex items-start gap-4 p-5">
            <div className="mt-1">
              <div className="rounded-2xl bg-amber-100 p-2.5 text-amber-700">
                <AlertTriangle size={26} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{displayStatusLabel}</h2>
                <Badge text={displayBadgeText} status={scanDraft?.needsManualReview ? 'caution' : scanView.statusLabel} />
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{displayReason}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Kandungan Gizi</h3>
              <span className="text-xs font-medium text-slate-500">Per {scanView.servingSize}</span>
            </div>

            <button
              onClick={handleOpenEdit}
              className="flex items-center gap-1.5 rounded-xl bg-[var(--diabites-green-soft)] px-3 py-2 text-sm font-medium text-[var(--diabites-green)] transition-colors hover:bg-[var(--diabites-green-panel)]"
            >
              <Edit2 size={16} /> Edit
            </button>
          </div>

          <div className="space-y-4">
            {scanView.nutrients.map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex justify-between text-sm font-medium">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="text-slate-900">{item.value} {item.unit}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" fullWidth onClick={() => navigate('/scanner')} className="!py-3.5">
            <RefreshCw size={18} /> Scan Ulang
          </Button>
          <Button fullWidth className="!py-3.5" onClick={handleSaveScan} disabled={isSaving}>
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Simpan
          </Button>
        </div>
      </div>

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
                <Input type="number" label="Kalori (kcal)" name="calories" value={editFormData.calories || ''} onChange={handleEditChange} required />
                <Input type="number" label="Gula (g)" name="sugar" value={editFormData.sugar || ''} onChange={handleEditChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input type="number" label="Karbohidrat (g)" name="carbohydrates" value={editFormData.carbohydrates || ''} onChange={handleEditChange} required />
                <Input type="number" label="Lemak (g)" name="fat" value={editFormData.fat ?? 0} onChange={handleEditChange} required />
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

      <ImagePreviewModal
        src={displayedImage}
        alt={scanView.name}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

export default ScanResult;
