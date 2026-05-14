import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import { Card } from '../components/common/Card';
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

const Home = () => {
  const { userProfile } = useUser();
  const userName = userProfile?.name || 'Bintang Kurniawan';

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const profileSummary = [
    {
      label: 'Berat',
      value: userProfile?.weight ? `${userProfile.weight} kg` : '-',
      detail: 'dipakai untuk target personal',
      icon: Target,
      iconClass: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Kondisi',
      value: userProfile?.diabetesType || '-',
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
    <div className="relative overflow-hidden px-4 pb-10 pt-5 sm:px-5">
      <div className="absolute -right-10 -top-8 h-40 w-40 rounded-full bg-emerald-200/50 blur-3xl" />
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

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,#14b8a6_0%,#10b981_55%,#22c55e_100%)] text-lg font-bold text-white shadow-[0_20px_40px_rgba(16,185,129,0.28)]">
          {getInitials(userName)}
        </div>
      </header>

      <Card
        noPadding
        className="relative mb-6 overflow-hidden border-emerald-200/80 bg-[linear-gradient(135deg,#0f766e_0%,#10b981_48%,#22c55e_100%)] text-white shadow-[0_24px_60px_rgba(16,185,129,0.22)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_36%)]" />
        <div className="relative p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
                <Sparkles size={14} />
                Daily Wellness
              </span>
              <h2 className="mt-3 text-2xl font-bold">Target Kalori Harian</h2>
              <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-emerald-50/90">
                Jaga porsi tetap seimbang agar energi harian terpenuhi tanpa membuat kadar gula melonjak.
              </p>
            </div>
            <div className="rounded-2xl bg-white/16 p-3 text-white/90 shadow-lg shadow-emerald-950/10">
              <Target size={28} />
            </div>
          </div>

          <div className="mb-4 flex items-end justify-between gap-3">
            <h3 className="text-3xl font-bold tracking-tight">
              1,850 <span className="text-lg font-medium text-emerald-100">kcal</span>
            </h3>
            <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold text-white/90">
              45% terpenuhi
            </span>
          </div>

          <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-emerald-950/20">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#fefce8_0%,#ffffff_50%,#dcfce7_100%)]"
              style={{ width: '45%' }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-emerald-50/90">
            <span>Terisi 830 kcal hari ini</span>
            <span>Sisa 1,020 kcal</span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/18 bg-white/12 px-3 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-50/75">Gula</p>
              <p className="mt-1 text-lg font-semibold">15 g</p>
            </div>
            <div className="rounded-2xl border border-white/18 bg-white/12 px-3 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-50/75">Karbo</p>
              <p className="mt-1 text-lg font-semibold">35 g</p>
            </div>
            <div className="rounded-2xl border border-white/18 bg-white/12 px-3 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-50/75">Target</p>
              <p className="mt-1 text-lg font-semibold">Stabil</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Activity size={18} className="text-emerald-600" />
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
        <Card className="border-emerald-100/90">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
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
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#0f766e_0%,#10b981_52%,#22c55e_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(16,185,129,0.20)] transition-transform hover:-translate-y-0.5"
          >
            Buka Scanner
            <ArrowRight size={16} />
          </Link>
        </Card>

        <Card className="border-white/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(240,253,250,0.92)_100%)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <HeartPulse size={18} className="text-emerald-600" />
                Aktivitas Sehat Hari Ini
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Checklist kecil ini membantu keputusan makan terasa lebih ringan dan terukur.
              </p>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-700">
              3 langkah
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {dailyChecklist.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-emerald-100/80 bg-white/90 px-4 py-3"
              >
                <div className="mt-0.5 rounded-full bg-emerald-100 p-1 text-emerald-700">
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
