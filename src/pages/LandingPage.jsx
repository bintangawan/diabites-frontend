import { Link } from 'react-router-dom';
import { Activity, Scan, HeartPulse, Users, ArrowRight, ShieldCheck, Camera, Sparkles, CheckCircle2, TrendingDown, Quote, EyeOff, Calculator, AlertTriangle, BarChart3, BadgeCheck, Star } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200 selection:text-teal-900 overflow-x-hidden">
      
      {/* ==================================
          NAVBAR
          ================================== */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-teal-600">
            <Activity size={28} strokeWidth={2.5} />
            <span className="font-bold text-xl tracking-tight text-slate-900">DiaBites</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100">
              <BadgeCheck size={14} />
              Asisten Gizi Cerdas
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#fitur" className="hover:text-teal-600 transition-colors">Fitur</a>
            <a href="#cara-kerja" className="hover:text-teal-600 transition-colors">Cara Kerja</a>
            <a href="#testimoni" className="hover:text-teal-600 transition-colors">Testimoni</a>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">Masuk</Link>
            <Link to="/register" className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-full shadow-md shadow-teal-600/20 transition-all active:scale-95">
              Daftar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* ==================================
          SECTION 1: HERO (HOOK UTAMA)
          ================================== */}
      <section id="beranda" className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Background Blob untuk meramaikan */}
        <div className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: 'radial-gradient(rgba(45,212,191,0.18) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
        <div className="absolute top-40 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 text-teal-700 text-sm font-bold mb-6 shadow-sm">
              <Sparkles size={16} className="text-amber-500" />
              DiaBites — Eat Wiser, Live Better.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Pilih Makanan Tepat, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Tanpa Pusing</span> Baca Label.
            </h1>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed max-w-lg">
              Berhenti menebak-nebak! DiaBites adalah asisten pribadi berbasis AI yang membantu Anda—para pejuang diabetes—memahami nilai gizi dengan cepat dan jelas.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600 mb-8">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-teal-600 mt-0.5" />
                <span>Scan label hanya dengan kamera ponsel.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-teal-600 mt-0.5" />
                <span>Rekomendasi aman sesuai profil Anda.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-teal-600 mt-0.5" />
                <span>Hitung karbo, gula, dan kalori otomatis.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-teal-600 mt-0.5" />
                <span>Riwayat konsumsi rapi dan mudah dilacak.</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white text-base font-bold rounded-full transition-all group shadow-lg shadow-teal-600/25">
                Coba Scan Sekarang <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#cara-kerja" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-800 text-base font-bold rounded-full border border-slate-200 hover:border-teal-300 hover:text-teal-700 transition-all">
                Lihat Cara Kerja
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              <div className="rounded-2xl bg-white/80 border border-slate-100 px-4 py-3 text-center shadow-sm">
                <div className="text-lg font-extrabold text-slate-900">3 Langkah</div>
                <div className="text-[11px] text-slate-500">Proses Sederhana</div>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-100 px-4 py-3 text-center shadow-sm">
                <div className="text-lg font-extrabold text-slate-900">Scan Sekali</div>
                <div className="text-[11px] text-slate-500">Hasil Langsung</div>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-100 px-4 py-3 text-center shadow-sm">
                <div className="text-lg font-extrabold text-slate-900">Aman Jelas</div>
                <div className="text-[11px] text-slate-500">Tanpa Tebak-tebakan</div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-100">
                <ShieldCheck size={14} className="text-teal-600" />
                Privasi data terjaga
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-100">
                <BadgeCheck size={14} className="text-teal-600" />
                Rekomendasi ramah diabetes
              </span>
            </div>
          </div>

          {/* Kanan: Mockup UI + Ilustrasi Kesehatan */}
          <div className="relative w-full max-w-lg mx-auto lg:ml-auto">
            <div className="absolute -top-16 -right-10 w-48 h-48 bg-emerald-200/50 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-amber-200/40 rounded-full blur-3xl -z-10"></div>

            <div className="relative">
              <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border-8 border-slate-50 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                <div className="w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                  <div className="bg-white px-4 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2"><Activity size={16} className="text-teal-600"/> Hasil Analisis</div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-1 rounded-full">AI Scan</span>
                  </div>
                  <div className="h-36 bg-slate-800 relative overflow-hidden flex items-center justify-center">
                    <Scan size={40} className="text-teal-400" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,1)] animate-[ping_3s_ease-in-out_infinite]"></div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex gap-3">
                      <ShieldCheck size={20} className="text-rose-600 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-rose-900">Not Recommended</div>
                        <div className="text-[10px] text-rose-700 mt-0.5">Kadar gula (24g) melebihi batas aman harian Anda.</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-3/4"></div></div>
                      <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-11/12"></div></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute hidden sm:flex -left-10 -bottom-8 bg-white/90 backdrop-blur border border-slate-100 rounded-2xl px-4 py-3 shadow-lg items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <HeartPulse size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Gula Harian</div>
                  <div className="text-[10px] text-slate-500">Terkontrol</div>
                  <div className="mt-1 h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-3/5"></div>
                  </div>
                </div>
              </div>

              <div className="absolute hidden sm:flex -right-8 top-10 bg-white/90 backdrop-blur border border-slate-100 rounded-2xl px-4 py-3 shadow-lg items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Karbo</div>
                  <div className="text-[10px] text-slate-500">18g per porsi</div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-100 bg-white/80 backdrop-blur p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <HeartPulse size={22} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Ilustrasi Kesehatan</div>
                    <div className="text-xs text-slate-500">Stabil, terukur, aman</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">Live</span>
              </div>
              <div className="relative mt-4 h-28 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-100/60 border border-emerald-100 overflow-hidden">
                <div className="absolute left-5 top-5 w-14 h-14 bg-white rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-center">
                  <div className="relative w-8 h-8">
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-emerald-500 rounded-full"></div>
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute right-6 top-6 w-20 h-10 bg-white rounded-full border border-slate-100 shadow-sm flex items-center justify-between px-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-200"></div>
                  <div className="h-2 w-8 bg-emerald-200 rounded-full"></div>
                </div>
                <div className="absolute left-6 bottom-5 w-28 h-10 bg-white rounded-full border border-slate-100 flex items-center gap-2 px-2 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-rose-200"></div>
                  <div className="h-2 w-10 bg-rose-200 rounded-full"></div>
                  <div className="h-2 w-6 bg-rose-200 rounded-full"></div>
                </div>
                <svg className="absolute inset-0" viewBox="0 0 300 120" fill="none" preserveAspectRatio="none">
                  <path d="M0,70 L60,70 L85,35 L110,90 L140,55 L170,70 L220,70 L245,45 L270,90 L300,70" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-slate-50 border border-slate-100 py-2">
                  <div className="text-xs font-bold text-slate-900">Gula</div>
                  <div className="text-[10px] text-slate-500">Terkontrol</div>
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-100 py-2">
                  <div className="text-xs font-bold text-slate-900">Karbo</div>
                  <div className="text-[10px] text-slate-500">Terukur</div>
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-100 py-2">
                  <div className="text-xs font-bold text-slate-900">Kalori</div>
                  <div className="text-[10px] text-slate-500">Seimbang</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          SECTION 2: THE PROBLEM (KENAPA DIABITES?)
          ================================== */}
      <section id="masalah" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Sering Kebingungan Saat Belanja?</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-12">
            Informasi gizi di kemasan sering kali ditulis sangat kecil, membingungkan, dan tidak memberitahu apakah produk tersebut <strong>aman untuk kondisi tubuh Anda</strong>. Keputusan yang salah bisa berdampak buruk bagi kadar gula darah. Di sinilah DiaBites hadir sebagai solusi.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="relative p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <div className="absolute top-4 right-4 text-5xl font-extrabold text-slate-100">01</div>
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-4 shadow-sm">
                <EyeOff size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Teks Terlalu Kecil</h3>
              <p className="text-sm text-slate-500">Susah dibaca dengan cepat saat sedang berbelanja di minimarket.</p>
            </div>
            <div className="relative p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <div className="absolute top-4 right-4 text-5xl font-extrabold text-slate-100">02</div>
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-4 shadow-sm">
                <Calculator size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Ribet Hitung Porsi</h3>
              <p className="text-sm text-slate-500">Angka gizi sering menipu karena tidak dihitung berdasarkan porsi konsumsi aktual.</p>
            </div>
            <div className="relative p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <div className="absolute top-4 right-4 text-5xl font-extrabold text-slate-100">03</div>
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-4 shadow-sm">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Kurang Konteks</h3>
              <p className="text-sm text-slate-500">Tidak ada peringatan apakah produk tersebut aman untuk tipe diabetes Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          SECTION 3: HOW IT WORKS (CARA KERJA)
          ================================== */}
      <section id="cara-kerja" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold mb-4">Semudah Menghitung 1, 2, 3</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Tidak perlu input manual yang rumit. DiaBites bekerja secara otomatis untuk Anda.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Garis penghubung (muncul di layar besar) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-slate-700 via-teal-500 to-slate-700"></div>

            <div className="relative text-center bg-slate-800/60 border border-slate-700 rounded-3xl p-8 backdrop-blur">
              <div className="w-24 h-24 mx-auto bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center mb-6 relative z-10 text-teal-400">
                <Camera size={36} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 text-white font-bold rounded-full flex items-center justify-center border-4 border-slate-900">1</div>
              </div>
              <h3 className="text-xl font-bold mb-2">Foto Label Gizi</h3>
              <p className="text-slate-400 text-sm">Arahkan kamera ke tabel informasi nilai gizi di belakang kemasan.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-teal-200 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                <Camera size={14} /> Sekali jepret
              </span>
            </div>

            <div className="relative text-center bg-slate-800/60 border border-slate-700 rounded-3xl p-8 backdrop-blur">
              <div className="w-24 h-24 mx-auto bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center mb-6 relative z-10 text-teal-400">
                <Scan size={36} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 text-white font-bold rounded-full flex items-center justify-center border-4 border-slate-900">2</div>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Menganalisis</h3>
              <p className="text-slate-400 text-sm">Teknologi OCR kami secara otomatis membaca teks dan angka pada label.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-teal-200 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                <Sparkles size={14} /> Baca otomatis
              </span>
            </div>

            <div className="relative text-center bg-slate-800/60 border border-slate-700 rounded-3xl p-8 backdrop-blur">
              <div className="w-24 h-24 mx-auto bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center mb-6 relative z-10 text-teal-400">
                <CheckCircle2 size={36} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 text-white font-bold rounded-full flex items-center justify-center border-4 border-slate-900">3</div>
              </div>
              <h3 className="text-xl font-bold mb-2">Terima Rekomendasi</h3>
              <p className="text-slate-400 text-sm">Dapatkan status keamanan produk berdasarkan profil kesehatan pribadi Anda.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-teal-200 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                <ShieldCheck size={14} /> Aman dan jelas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          SECTION 4: BENTO GRID FEATURES
          ================================== */}
      <section id="fitur" className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Fitur Lengkap DiaBites</h2>
            <p className="text-slate-500 max-w-xl">Desain yang ramah pengguna, berpadu dengan teknologi cerdas di balik layar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]">
            {/* Box 1 */}
            <div className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden relative group hover:border-teal-300 transition-all">
              <div className="relative z-10 max-w-sm">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-4">
                  <HeartPulse size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Personalisasi BMR & TDEE</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Sistem kami menyesuaikan rekomendasi berdasarkan usia, gender, berat badan, serta tipe diabetes Anda untuk akurasi maksimal.</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                  <div className="text-xs font-bold text-slate-900">Profil Pribadi</div>
                  <div className="text-[10px] text-slate-500">Lebih relevan</div>
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                  <div className="text-xs font-bold text-slate-900">Target Harian</div>
                  <div className="text-[10px] text-slate-500">Lebih terarah</div>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <HeartPulse size={250} className="text-teal-600" />
              </div>
            </div>

            {/* Box 2 */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-8 group hover:border-teal-300 transition-all">
              <div className="flex-1">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Komunitas Pejuang Diabetes</h3>
                <p className="text-slate-500 text-sm max-w-md">Tidak berjuang sendirian. Bagikan pengalaman, resep camilan rendah gula, dan dapatkan dukungan moral dari pengguna DiaBites lainnya melalui fitur Ruang Berbagi.</p>
              </div>
              <div className="w-full sm:w-1/3 h-full bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-4">
                <div className="w-full bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-full"></div>
                    <div className="h-2 w-20 bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full mb-1"></div>
                  <div className="h-2 w-3/4 bg-slate-100 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <Camera size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Scan Cepat</h3>
                <p className="text-xs text-slate-500">Cukup foto label gizi, semua angka terbaca otomatis.</p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Peringatan Cerdas</h3>
                <p className="text-xs text-slate-500">Notifikasi aman/tidak aman langsung terbaca.</p>
              </div>
            </div>

            {/* Box 5 */}
            <div className="md:col-span-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 flex flex-col border-none relative overflow-hidden text-white shadow-md">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                <TrendingDown size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Pantau Asupan</h3>
              <p className="text-sm text-white/90">Ketahui secara pasti berapa banyak gula, karbo, dan kalori yang telah masuk.</p>
              <div className="mt-6 h-2.5 w-full bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white/80 w-2/3"></div>
              </div>
            </div>

            {/* Box 6 */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Laporan & Riwayat</h3>
                <p className="text-sm text-slate-500">Lihat tren konsumsi harian dan evaluasi pola makan Anda dengan rapi.</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-50 border border-slate-100">Mingguan</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-50 border border-slate-100">Bulanan</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-50 border border-slate-100">Custom</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          SECTION 5: SOCIAL PROOF / TESTIMONIALS
          ================================== */}
      <section id="testimoni" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Kata Mereka yang Telah Mencoba</h2>
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-10">
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <span className="ml-2 text-xs text-slate-500">Umpan balik positif dari komunitas</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <Quote className="text-teal-200 mb-4" size={32} />
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">"Gak nyangka ternyata biskuit yang biasa saya makan gulanya tinggi banget. Untung sekarang ada DiaBites, tinggal jepret langsung tau aman atau nggak."</p>
              <div className="font-bold text-slate-900 text-sm">Bapak Anton (52 th)</div>
              <div className="text-xs text-teal-600 font-medium">Diabetes Tipe 2</div>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <Quote className="text-teal-200 mb-4" size={32} />
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">"Sangat ngebantu buat aku yang diabetes gestasional. Jadi lebih yakin pas mau milih cemilan di supermarket tanpa harus googling sana-sini."</p>
              <div className="font-bold text-slate-900 text-sm">Ibu Rina (28 th)</div>
              <div className="text-xs text-teal-600 font-medium">Diabetes Gestasional</div>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <Quote className="text-teal-200 mb-4" size={32} />
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">"Fitur komunitasnya bikin aplikasi ini beda dari yang lain. Bisa saling semangatin dan bagi info makanan yang aman. Keren banget!"</p>
              <div className="font-bold text-slate-900 text-sm">Dimas (35 th)</div>
              <div className="text-xs text-teal-600 font-medium">Diabetes Tipe 1</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          SECTION 6: FINAL CTA & FOOTER
          ================================== */}
      <section id="cta" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-teal-600 to-emerald-700 rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-teal-600/30 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-emerald-400/30 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Siap Menjalani Hidup Lebih Sehat?</h2>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan komunitas yang saling mendukung. Jadikan DiaBites asisten harian Anda untuk keputusan konsumsi yang lebih bijak.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-700 text-lg font-bold rounded-full transition-all hover:scale-105 shadow-xl">
                Buat Akun Gratis Sekarang
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-full border border-white/30 hover:bg-white/20 transition-all">
                Masuk
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-teal-100">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                <ShieldCheck size={14} />
                Privasi aman
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                <Sparkles size={14} />
                Rekomendasi jelas
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                <CheckCircle2 size={14} />
                Mulai gratis
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-8 border-t border-slate-100 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-teal-600">
            <Activity size={24} strokeWidth={2.5} />
            <span className="font-bold text-lg text-slate-900">DiaBites</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="#fitur" className="hover:text-teal-600 transition-colors">Fitur</a>
            <a href="#cara-kerja" className="hover:text-teal-600 transition-colors">Cara Kerja</a>
            <a href="#testimoni" className="hover:text-teal-600 transition-colors">Testimoni</a>
          </div>
          <p className="text-xs text-slate-400 text-center md:text-right">
            &copy; 2026 DiaBites Project. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;