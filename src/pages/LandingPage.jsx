import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Camera,
  CheckCircle2,
  Edit2,
  HeartPulse,
  Mail,
  MapPin,
  MessageCircle,
  RefreshCw,
  Scan,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import BrandLogo from "../components/common/BrandLogo";

const heroHighlights = [
  "Scan label makanan atau minuman dalam beberapa detik.",
  "Lihat hasil analisis dengan susunan yang mudah dibaca.",
  "Edit manual jika hasil baca label perlu dikoreksi.",
  "Gunakan komunitas untuk berbagi pengalaman harian.",
];

const valueCards = [
  {
    icon: Camera,
    title: "Cepat dipakai saat belanja",
    description:
      "Buka scanner, arahkan ke label, lalu cek informasi penting tanpa perlu membaca tabel kecil terlalu lama.",
  },
  {
    icon: BarChart3,
    title: "Ringkasan lebih jelas",
    description:
      "Informasi seperti gula, kalori, karbohidrat, lemak, dan natrium disusun agar lebih mudah dipahami.",
  },
  {
    icon: Users,
    title: "Ada ruang berbagi",
    description:
      "Pengguna dapat berbagi pengalaman, bertanya, dan saling memberi dukungan lewat komunitas.",
  },
];

const featureSections = [
  {
    id: "fitur-scan",
    eyebrow: "Fitur scanner",
    title: "Scan label makanan atau minuman dengan alur yang sederhana",
    description:
      "Tampilan scanner dibuat fokus ke kamera agar label gizi menjadi pusat perhatian. Pengguna cukup mengarahkan kamera, mengambil gambar, lalu melihat hasilnya.",
    image: "/images/scannerpage.svg",
    imageAlt: "Tampilan scanner DiaBites",
    icon: Scan,
    accent: "from-emerald-100 via-teal-50 to-white",
    bullets: [
      "Arahkan kamera ke informasi nilai gizi dan ambil gambar langsung dari aplikasi.",
      "Cocok untuk membaca produk kemasan seperti minuman, camilan, dan makanan siap santap.",
      "Membantu pengguna memahami isi label sebelum memilih produk.",
    ],
    chips: ["Live camera preview", "Fokus ke label", "Mobile friendly"],
  },
  {
    id: "fitur-analisis",
    eyebrow: "Hasil analisis",
    title: "Hasil scan tampil jelas dan tetap bisa diedit manual",
    description:
      "Setelah gambar diambil, DiaBites menampilkan ringkasan gizi dalam tampilan yang lebih rapi. Jika ada angka yang kurang sesuai, pengguna tetap bisa melakukan koreksi manual.",
    image: "/images/analisispage.svg",
    imageAlt: "Tampilan hasil analisis DiaBites",
    icon: Edit2,
    accent: "from-sky-100 via-cyan-50 to-white",
    bullets: [
      "Nilai gizi disusun berdasarkan informasi penting agar mudah dibaca.",
      "Tampilan hasil dibuat ringkas tanpa menghilangkan detail utama.",
      "Fitur edit manual membantu saat hasil baca label perlu disesuaikan.",
    ],
    chips: ["Ringkasan gizi", "Edit manual", "Lebih fleksibel"],
    reverse: true,
  },
  {
    id: "fitur-komunitas",
    eyebrow: "Ruang berbagi",
    title: "Komunitas untuk saling berbagi pengalaman",
    description:
      "Selain membantu membaca label, DiaBites menyediakan ruang komunitas agar pengguna dapat berbagi cerita, bertanya, dan saling mendukung dalam menjaga pola konsumsi.",
    image: "/images/communitypage.svg",
    imageAlt: "Tampilan komunitas DiaBites",
    icon: MessageCircle,
    accent: "from-orange-100 via-amber-50 to-white",
    bullets: [
      "Pengguna dapat menulis postingan singkat tentang produk, kebiasaan makan, atau pertanyaan sehari-hari.",
      "Komunitas membantu pengguna merasa lebih didukung dalam menjaga pola konsumsi.",
      "DiaBites tidak hanya menjadi alat scan, tetapi juga ruang berbagi yang ringan digunakan.",
    ],
    chips: ["Diskusi ringan", "Saling dukung", "Berbagi pengalaman"],
  },
];

const workflowSteps = [
  {
    icon: Camera,
    title: "Buka scanner",
    description:
      "Arahkan kamera ke label makanan atau minuman yang ingin dicek.",
  },
  {
    icon: RefreshCw,
    title: "Tunggu analisis",
    description:
      "DiaBites membaca informasi penting dari label dan menyusunnya menjadi ringkasan.",
  },
  {
    icon: Edit2,
    title: "Koreksi bila perlu",
    description:
      "Jika ada angka yang perlu diperbaiki, edit manual bisa dilakukan dengan cepat.",
  },
  {
    icon: Users,
    title: "Bagikan pengalaman",
    description:
      "Gunakan komunitas untuk bertanya, berdiskusi, atau berbagi pengalaman.",
  },
];

const trustCards = [
  {
    icon: ShieldCheck,
    title: "Lebih yakin saat memilih produk",
    description:
      "Informasi gizi yang biasanya kecil di kemasan disusun ulang agar lebih nyaman dibaca sebelum membeli atau mengonsumsi produk.",
  },
  {
    icon: HeartPulse,
    title: "Dirancang untuk penggunaan harian",
    description:
      "Mulai dari scan cepat sampai ruang komunitas, seluruh alur dibuat ringan untuk digunakan di mobile maupun desktop.",
  },
  {
    icon: CheckCircle2,
    title: "Tetap bisa disesuaikan",
    description:
      "Hasil scan dapat diperiksa kembali dan dikoreksi jika terdapat bagian label yang belum terbaca dengan tepat.",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7fbf8] font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-950">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.24),transparent_34%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.22),transparent_32%)]" />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-[90%] max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <BrandLogo
              className="h-10 w-[9.75rem] sm:w-[10.5rem]"
              imageClassName="scale-[1.72]"
              priority
            />
          </Link>

          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a
              href="#fitur"
              className="transition-colors hover:text-emerald-700"
            >
              Fitur
            </a>
            <a
              href="#alur"
              className="transition-colors hover:text-emerald-700"
            >
              Alur
            </a>
            <a
              href="#komunitas"
              className="transition-colors hover:text-emerald-700"
            >
              Komunitas
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700 sm:inline-flex"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#0f766e_0%,#10b981_52%,#22c55e_100%)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(16,185,129,0.24)] transition hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </nav>

      <section
        id="beranda"
        className="mx-auto w-[90%] max-w-7xl pb-20 pt-28 lg:pb-24 lg:pt-32"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/82 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
              <Sparkles size={16} className="text-orange-500" />
              Baca label gizi dengan lebih cepat dan jelas
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Pahami label makanan tanpa harus menebak-nebak.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              DiaBites membantu pengguna membaca informasi gizi pada makanan dan
              minuman, melihat ringkasan yang lebih mudah dipahami, serta
              berbagi pengalaman melalui komunitas.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {heroHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/78 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur-sm"
                >
                  <div className="mt-0.5 rounded-full bg-emerald-100 p-1 text-emerald-700">
                    <CheckCircle2 size={14} />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0f766e_0%,#10b981_52%,#22c55e_100%)] px-8 py-4 text-base font-semibold text-white shadow-[0_20px_40px_rgba(16,185,129,0.24)] transition hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Coba DiaBites Sekarang
                <ArrowRight size={18} />
              </Link>

              <a
                href="#fitur"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/88 px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-colors hover:border-emerald-300 hover:text-emerald-700"
              >
                Lihat fitur utama
              </a>
            </div>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              <InfoStat label="1 aplikasi" value="Scan, analisis, komunitas" />
              <InfoStat label="3 langkah" value="Foto, cek, pahami" />
              <InfoStat label="Fleksibel" value="Bisa edit manual" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -left-12 top-12 h-56 w-56 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="absolute -right-10 bottom-8 h-56 w-56 rounded-full bg-sky-200/60 blur-3xl" />

            <div className="relative flex items-end justify-center gap-4 px-1 sm:gap-6">
              <AppPreview
                src="/images/homepage.svg"
                alt="Tampilan halaman utama aplikasi DiaBites"
                className="w-[49%] -rotate-6 sm:w-[45%]"
              />
              <AppPreview
                src="/images/scannerpage.svg"
                alt="Tampilan scanner DiaBites"
                className="relative z-10 w-[49%] rotate-6 sm:w-[45%]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100/70 bg-white/70">
        <div className="mx-auto grid w-[90%] max-w-7xl gap-4 py-8 lg:grid-cols-3">
          {valueCards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-[2rem] border border-emerald-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(240,253,250,0.76)_100%)] p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                <Icon size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[90%] max-w-7xl py-20 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <ShieldCheck size={16} />
              Ringan digunakan sehari-hari
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Informasi penting dibuat lebih lega dan mudah dibaca.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Bagian ini dipisahkan dari hero agar tampilan awal tidak padat dan
              pengguna bisa memahami manfaat DiaBites secara bertahap.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {trustCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Icon size={25} />
                </div>
                <h3 className="mt-6 text-lg font-bold leading-7 text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fitur" className="mx-auto w-[90%] max-w-7xl pb-20 lg:pb-24">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <BadgeCheck size={16} />
            Fitur utama DiaBites
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Dari scan label sampai komunitas, semuanya berada dalam satu alur.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            DiaBites membantu pengguna membaca label gizi, memahami hasilnya,
            dan tetap memiliki ruang untuk saling berbagi pengalaman.
          </p>
        </div>

        <div className="space-y-8">
          {featureSections.map((section) => (
            <FeatureSplit key={section.id} {...section} />
          ))}
        </div>
      </section>

      <section
        id="alur"
        className="border-y border-emerald-100/70 bg-[linear-gradient(180deg,#0f172a_0%,#082f49_100%)] py-20 text-white lg:py-24"
      >
        <div className="mx-auto w-[90%] max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-emerald-200">
              <Sparkles size={16} />
              Alur penggunaan
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Cukup foto label, cek hasilnya, lalu gunakan sesuai kebutuhan.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Alur aplikasi dibuat singkat agar tetap nyaman dipakai saat
              berbelanja, di rumah, atau ketika membandingkan beberapa produk.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {workflowSteps.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)] backdrop-blur-sm"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
                    <Icon size={22} />
                  </div>
                  <span className="text-sm font-semibold text-emerald-200/80">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="komunitas"
        className="mx-auto w-[90%] max-w-7xl py-20 lg:py-24"
      >
        <div className="grid items-center gap-10 rounded-[2.6rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.88)_0%,rgba(240,253,250,0.78)_48%,rgba(239,246,255,0.86)_100%)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:grid-cols-[1.02fr_0.98fr] lg:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
              <Users size={16} />
              Komunitas
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ruang berbagi untuk pengguna yang ingin saling mendukung.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Pengguna dapat berdiskusi tentang kebiasaan makan, pengalaman
              memilih produk, atau pertanyaan ringan seputar penggunaan
              aplikasi.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.8rem] border border-sky-100 bg-white/82 p-4">
                <p className="text-sm font-bold text-slate-900">
                  Diskusi lebih ringan
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Pengguna dapat berbagi cerita singkat tanpa alur yang rumit.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-emerald-100 bg-white/82 p-4">
                <p className="text-sm font-bold text-slate-900">
                  Saling memberi dukungan
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Komunitas membantu pengguna merasa tidak sendirian dalam
                  menjaga pola konsumsi.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-6 top-10 h-40 w-40 rounded-full bg-sky-200/60 blur-3xl" />
            <div className="absolute -right-6 bottom-8 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />

            <div className="relative flex items-end justify-center gap-4">
              <AppPreview
                src="/images/analisispage.svg"
                alt="Tampilan hasil analisis DiaBites"
                className="w-[46%] -rotate-6"
              />
              <AppPreview
                src="/images/communitypage.svg"
                alt="Tampilan komunitas DiaBites"
                className="relative z-10 w-[46%] rotate-6"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="mx-auto w-[90%] max-w-6xl pb-20 lg:pb-24">
        <div className="relative overflow-hidden rounded-[2.8rem] bg-[linear-gradient(135deg,#0f766e_0%,#10b981_52%,#22c55e_100%)] px-6 py-12 text-white shadow-[0_28px_70px_rgba(16,185,129,0.30)] sm:px-10 lg:px-14">
          <div className="absolute -right-12 -top-10 h-48 w-48 rounded-full bg-white/18 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-emerald-200/20 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50">
                <ShieldCheck size={16} />
                Mulai gunakan DiaBites
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                Baca label gizi dengan cara yang lebih cepat dan nyaman.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-emerald-50/90">
                Gunakan scanner untuk melihat informasi gizi, periksa hasilnya,
                lalu manfaatkan komunitas untuk berbagi pengalaman.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-emerald-700 shadow-xl transition hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Mulai Gratis
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/24 bg-white/10 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/16"
                >
                  Masuk ke akun
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <AppPreview
                src="/images/homepage.svg"
                alt="Ringkasan halaman utama DiaBites"
                className="mx-auto w-full max-w-[18rem] rotate-6"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const InfoStat = ({ label, value }) => {
  return (
    <div className="rounded-[1.7rem] border border-white/80 bg-white/80 px-4 py-4 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold leading-snug text-slate-900">
        {value}
      </p>
    </div>
  );
};

const FeatureSplit = ({
  id,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  icon: Icon,
  accent,
  bullets,
  chips,
  reverse = false,
}) => {
  return (
    <section
      id={id}
      className="grid items-center gap-8 rounded-[2.6rem] border border-white/80 bg-white/78 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.07)] lg:grid-cols-2 lg:p-8"
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          <Icon size={16} />
          {eyebrow}
        </span>
        <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>

        <div className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <div
              key={bullet}
              className="flex items-start gap-3 rounded-2xl bg-slate-50/80 px-4 py-3"
            >
              <div className="mt-0.5 rounded-full bg-emerald-100 p-1 text-emerald-700">
                <CheckCircle2 size={14} />
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{bullet}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className={reverse ? "lg:order-1" : ""}>
        <div
          className={`relative overflow-hidden rounded-[2.3rem] bg-gradient-to-br ${accent} p-5`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_40%)]" />
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="relative mx-auto h-auto w-full max-w-[31rem] object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.13)]"
          />
        </div>
      </div>
    </section>
  );
};

const AppPreview = ({ src, alt, className = "" }) => {
  return (
    <div
      className={`drop-shadow-[0_28px_55px_rgba(15,23,42,0.16)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-auto w-full object-contain"
      />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-16">
      <div className="mx-auto w-[90%] max-w-7xl">
        <div className="grid gap-12 border-b border-slate-200 pb-14 lg:grid-cols-[1.25fr_0.7fr_0.7fr_1.15fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <BrandLogo
                className="h-10 w-[9.75rem] sm:w-[10.5rem]"
                imageClassName="scale-[1.72]"
                priority
              />
            </Link>

            <h3 className="mt-10 text-lg font-bold text-slate-900">DiaBites</h3>

            <div className="mt-6 space-y-5 text-slate-600">
              <div className="flex gap-4">
                <MapPin size={24} className="mt-1 shrink-0 text-slate-400" />
                <p className="leading-7">
                  Jl. Indonesia Merdeka No. 1945, Rengasdengklok, Indonesia
                </p>
              </div>

              <div className="flex items-center gap-4">
                <MessageCircle size={24} className="shrink-0 text-slate-400" />
                <p>+62 878 4118 5404</p>
              </div>

              <div className="flex items-center gap-4">
                <Mail size={24} className="shrink-0 text-slate-400" />
                <p>support@diabites.site</p>
              </div>
            </div>

            <h3 className="mt-9 text-lg font-bold text-slate-900">
              Temukan Kami
            </h3>

            <div className="mt-5 flex items-center gap-5 text-slate-400">
              <Facebook
                className="transition hover:text-emerald-600"
                size={25}
              />
              <Twitter
                className="transition hover:text-emerald-600"
                size={25}
              />
              <Instagram
                className="transition hover:text-emerald-600"
                size={25}
              />
              <Youtube
                className="transition hover:text-emerald-600"
                size={27}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">Perusahaan</h3>
            <ul className="mt-7 space-y-5 text-base text-slate-600">
              <li>
                <a
                  href="#beranda"
                  className="transition hover:text-emerald-600"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a href="#fitur" className="transition hover:text-emerald-600">
                  Fitur
                </a>
              </li>
              <li>
                <a href="#alur" className="transition hover:text-emerald-600">
                  Alur
                </a>
              </li>
              <li>
                <a
                  href="#komunitas"
                  className="transition hover:text-emerald-600"
                >
                  Komunitas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">Lainnya</h3>
            <ul className="mt-7 space-y-5 text-base text-slate-600">
              <li>
                <a href="#" className="transition hover:text-emerald-600">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-emerald-600">
                  Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-emerald-600">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-emerald-600">
                  Syarat dan Ketentuan
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Install DiaBites
            </h3>

            <div className="mt-7 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-950 px-5 py-4 text-white shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  Progressive Web App
                </p>
                <p className="mt-1 text-lg font-bold leading-tight">
                  Install langsung dari browser
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-[1.6rem] border border-emerald-100 bg-emerald-50/80 p-5">
              <p className="text-sm font-semibold leading-6 text-slate-700">
                DiaBites membantu pengguna membaca dan memahami informasi gizi
                pada produk makanan maupun minuman.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <BrandLogo
                className="h-10 w-[9.75rem] sm:w-[10.5rem]"
                imageClassName="scale-[1.72]"
                priority
              />
            </Link>
            <p className="mt-4 text-sm text-slate-700">
              Copyright © 2026. All rights reserved
            </p>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-2xl font-bold tracking-tight text-slate-900">
              DiaBites
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              Nutrition Label Scanner
            </p>
          </div>
        </div>

        <div className="pb-12 text-sm leading-7 text-slate-400">
          <p>
            DiaBites membantu menampilkan informasi dari label gizi agar lebih
            mudah dibaca. Informasi yang ditampilkan tetap perlu disesuaikan
            dengan kebutuhan masing-masing pengguna.
          </p>
          <p className="mt-4">
            Aplikasi ini tidak menggantikan saran dokter, ahli gizi, atau tenaga
            kesehatan profesional. Pengguna disarankan berkonsultasi dengan
            pihak yang berwenang apabila memiliki kondisi kesehatan tertentu.
          </p>
        </div>
      </div>
    </footer>
  );
};

const Facebook = ({ size = 25, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M14 8.5V6.75c0-.5.1-.85.32-1.05.2-.22.58-.33 1.12-.33H17V2.25c-.7-.08-1.42-.13-2.15-.13-1.5 0-2.68.43-3.54 1.3C10.44 4.3 10 5.55 10 7.19V8.5H7.5V12H10v9.75h4V12h2.9l.45-3.5H14Z" />
  </svg>
);

const Twitter = ({ size = 25, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M13.9 10.47 21.35 2h-1.76l-6.47 7.35L7.96 2H2l7.81 11.12L2 22h1.76l6.84-7.78L16.06 22H22l-8.1-11.53Zm-2.42 2.75-.8-1.11L4.39 3.3h2.72l5.08 7.12.79 1.11 6.6 9.25h-2.72l-5.38-7.56Z" />
  </svg>
);

const Instagram = ({ size = 25, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const Youtube = ({ size = 27, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M21.58 7.19a2.68 2.68 0 0 0-1.88-1.9C18.04 4.85 12 4.85 12 4.85s-6.04 0-7.7.44a2.68 2.68 0 0 0-1.88 1.9A28.05 28.05 0 0 0 2 12a28.05 28.05 0 0 0 .42 4.81 2.68 2.68 0 0 0 1.88 1.9c1.66.44 7.7.44 7.7.44s6.04 0 7.7-.44a2.68 2.68 0 0 0 1.88-1.9A28.05 28.05 0 0 0 22 12a28.05 28.05 0 0 0-.42-4.81ZM10 15.15v-6.3L15.2 12 10 15.15Z" />
  </svg>
);
export default LandingPage;
