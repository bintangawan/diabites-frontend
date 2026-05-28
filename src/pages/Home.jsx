import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Camera,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';
import { Card } from '../components/common/Card';
import { buildAssetUrl, scanApi } from '../services/api';
import { formatDiabetesType, getInitials } from '../utils/helpers';

const getTodayRange = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  const value = `${year}-${month}-${date}`;

  return {
    startDate: value,
    endDate: value,
  };
};

const Home = () => {
  const { userProfile, dashboard, refreshDashboard } = useUser();
  const [todayTotals, setTodayTotals] = useState({ sugar: 0, carbohydrates: 0 });

  const loadTodayTotals = useCallback(async (isMountedRef) => {
    try {
      const { items } = await scanApi.getHistory({
        ...getTodayRange(),
        page: 1,
        limit: 100,
      });

      if (!isMountedRef.current) {
        return;
      }

      setTodayTotals({
        sugar: items.reduce((total, item) => total + Number(item.sugar || 0), 0),
        carbohydrates: items.reduce((total, item) => total + Number(item.carbohydrates || 0), 0),
      });
    } catch {
      if (isMountedRef.current) {
        setTodayTotals({ sugar: 0, carbohydrates: 0 });
      }
    }
  }, []);

  useEffect(() => {
    const isMountedRef = { current: true };

    loadTodayTotals(isMountedRef);

    const handleDataRefresh = async () => {
      try {
        await refreshDashboard();
        await loadTodayTotals(isMountedRef);
      } catch {
        if (isMountedRef.current) {
          setTodayTotals({ sugar: 0, carbohydrates: 0 });
        }
      }
    };

    window.addEventListener('diabites:data-refresh', handleDataRefresh);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener('diabites:data-refresh', handleDataRefresh);
    };
  }, [loadTodayTotals, refreshDashboard, userProfile?.id]);

  const userName = userProfile?.name || 'Pengguna DiaBites';
  const profilePhotoUrl = buildAssetUrl(userProfile?.profilePhoto);
  const calorieLimit = Number(dashboard?.dailyCalorieLimit || 0);
  const todayCalories = Number(dashboard?.todayCalories || 0);
  const progress = calorieLimit ? Math.min((todayCalories / calorieLimit) * 100, 100) : 0;
  const remainingCalories = calorieLimit ? Math.max(calorieLimit - todayCalories, 0) : 0;
  const targetLabel = !calorieLimit
    ? 'Belum ada'
    : todayCalories > calorieLimit
      ? 'Lewat'
      : todayCalories > calorieLimit * 0.8
        ? 'Terjaga'
        : 'Stabil';

  const profileSummary = [
    {
      label: 'Berat',
      value: userProfile?.weight ? `${userProfile.weight} kg` : '-',
      detail: 'dipakai untuk target personal',
      icon: Target,
      iconClass: 'bg-[var(--diabites-green-soft)] text-[var(--diabites-green)]',
    },
    {
      label: 'Kondisi',
      value: userProfile?.diabetesType ? formatDiabetesType(userProfile.diabetesType) : '-',
      detail: 'profil rekomendasi aktif',
      icon: ShieldCheck,
      iconClass: 'bg-sky-50 text-sky-600',
    },
    {
      label: 'Tinggi',
      value: userProfile?.height ? `${userProfile.height} cm` : '-',
      detail: 'membantu hitung kebutuhan energi',
      icon: TrendingUp,
      iconClass: 'bg-orange-50 text-orange-600',
    },
    {
      label: 'Usia',
      value: userProfile?.age ? `${userProfile.age} th` : '-',
      detail: 'membuat analisis lebih relevan',
      icon: Activity,
      iconClass: 'bg-violet-50 text-violet-600',
    },
  ];

  const dailyChecklist = [
    'Scan label sebelum membeli camilan atau minuman kemasan.',
    'Pilih produk dengan gula lebih rendah agar kadar tetap stabil.',
    'Gunakan riwayat scan untuk membandingkan pilihan yang lebih aman.',
  ];

  return (
    <div className="relative min-h-full overflow-hidden px-4 pb-10 pt-5 sm:px-5">
      <div className="absolute -right-10 -top-8 h-40 w-40 rounded-full bg-[var(--diabites-green-panel-glow)] blur-3xl" />
      <div className="absolute -left-12 top-32 h-32 w-32 rounded-full bg-sky-200/40 blur-3xl" />

      <header className="relative mb-6 flex items-start justify-between gap-4">
        <div className="max-w-[15rem]">
          <p className="text-sm font-medium text-slate-500">Selamat datang kembali</p>
          <h1 className="mt-1 text-[1.85rem] font-bold leading-tight text-slate-900">
            {userName}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Pantau asupan harian dengan tampilan yang lebih rapi, cepat, dan nyaman dibaca.
          </p>
        </div>

        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] text-lg font-bold text-white"
          style={{
            backgroundColor: 'var(--diabites-green)',
            boxShadow: '0 20px 40px var(--diabites-green-shadow)',
          }}
        >
          {profilePhotoUrl ? (
            <img src={profilePhotoUrl} alt={userName} className="h-full w-full object-cover" />
          ) : (
            getInitials(userName)
          )}
        </div>
      </header>

      <Card
        noPadding
        className="relative mb-6 overflow-hidden text-white"
        style={{
          backgroundColor: 'var(--diabites-green)',
          borderColor: 'var(--diabites-green-border)',
          boxShadow: '0 24px 60px var(--diabites-green-shadow)',
        }}
      >
        <div className="relative p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
                <Sparkles size={14} />
                Daily Wellness
              </span>
              <h2 className="mt-3 text-2xl font-bold">Target Kalori Harian</h2>
              <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-white/88">
                Jaga porsi tetap seimbang agar energi harian terpenuhi tanpa membuat kadar gula melonjak.
              </p>
            </div>
            <div className="rounded-2xl bg-white/14 p-3 text-white/90 shadow-lg shadow-black/10">
              <Target size={28} />
            </div>
          </div>

          <div className="mb-4 flex items-end justify-between gap-3">
            <h3 className="text-3xl font-bold tracking-tight">
              {calorieLimit ? calorieLimit.toLocaleString('id-ID') : '-'} <span className="text-lg font-medium text-white/74">kcal</span>
            </h3>
            <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold text-white/90">
              {Math.round(progress)}% terpenuhi
            </span>
          </div>

          <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-white/18">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-white/84">
            <span>Terisi {todayCalories.toLocaleString('id-ID')} kcal hari ini</span>
            <span>Sisa {remainingCalories.toLocaleString('id-ID')} kcal</span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/18 bg-white/12 px-3 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/70">Gula</p>
              <p className="mt-1 text-lg font-semibold">{todayTotals.sugar.toLocaleString('id-ID')} g</p>
            </div>
            <div className="rounded-2xl border border-white/18 bg-white/12 px-3 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/70">Karbo</p>
              <p className="mt-1 text-lg font-semibold">{todayTotals.carbohydrates.toLocaleString('id-ID')} g</p>
            </div>
            <div className="rounded-2xl border border-white/18 bg-white/12 px-3 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/70">Target</p>
              <p className="mt-1 text-lg font-semibold">{targetLabel}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Activity size={18} className="text-[var(--diabites-green)]" />
          Ringkasan Profilmu
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Data ini membantu hasil scan menjadi lebih personal.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {profileSummary.map(({ label, value, detail, icon: Icon, iconClass }) => (
          <Card key={label} className="rounded-[24px] p-4">
            <div className={`mb-4 inline-flex rounded-2xl p-3 ${iconClass}`}>
              <Icon size={20} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {label}
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{detail}</p>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4">
        <Card className="border-[var(--diabites-green-border)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--diabites-green-soft)] px-3 py-1 text-[11px] font-semibold text-[var(--diabites-green)]">
                <Camera size={14} />
                Mulai lebih cepat
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                Scan label gizi tanpa ribet
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Gunakan kamera untuk membaca kandungan kalori, gula, karbohidrat, lemak, dan natrium dalam satu alur yang lebih jelas.
              </p>
            </div>
            <div className="rounded-2xl bg-sky-50 p-3 text-sky-600">
              <Camera size={22} />
            </div>
          </div>

          <Link
            to="/scanner"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-[var(--diabites-green)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_var(--diabites-green-shadow)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--diabites-green-dark)]"
          >
            Buka Scanner
            <ArrowRight size={16} />
          </Link>
        </Card>

        <Card className="border-white/90 bg-[var(--diabites-green-surface)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <HeartPulse size={18} className="text-[var(--diabites-green)]" />
                Aktivitas Sehat Hari Ini
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Checklist kecil ini membantu keputusan makan terasa lebih ringan dan terukur.
              </p>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-700">
              {dashboard?.todayScansCount || 0} scan
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {dailyChecklist.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-[var(--diabites-green-border)] bg-white/90 px-4 py-3"
              >
                <div className="mt-0.5 rounded-full bg-[var(--diabites-green-soft)] p-1 text-[var(--diabites-green)]">
                  <ShieldCheck size={14} />
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
