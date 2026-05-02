import { useUser } from '../context/UserContext';
import { Card } from '../components/common/Card';
import { Target, Activity } from 'lucide-react';

const Home = () => {
  const { userProfile } = useUser();

  // Mockup nama user (Nanti bisa disesuaikan agar ambil dari global state/backend)
  const userName = userProfile?.name || 'Bintang Kurniawan';

  // Fungsi Auto-Generate Initials biar sama dengan halaman Profile
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6 mt-4">
        <div>
          <p className="text-sm text-gray-500">Selamat datang kembali,</p>
          <h1 className="text-2xl font-bold text-gray-900">{userName} 👋</h1>
        </div>
        
        {/* Avatar yang sudah diganti pakai inisial dan gradient hijau */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
          {getInitials(userName)}
        </div>
      </header>

      <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white border-none shadow-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-green-100 text-sm font-medium mb-1">Target Kalori Harian</p>
            <h2 className="text-3xl font-bold">1,850 <span className="text-lg font-normal text-green-200">kcal</span></h2>
          </div>
          <Target className="text-green-200 opacity-80" size={32} />
        </div>
        <div className="w-full bg-green-900/40 rounded-full h-2 mb-2 overflow-hidden">
          <div className="bg-white h-2 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <p className="text-xs text-green-100 text-right">Terisi 830 kcal hari ini</p>
      </Card>

      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
        <Activity size={18} className="text-green-600"/> Ringkasan Profilmu
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center p-4">
          <p className="text-xs text-gray-500 font-medium">Berat</p>
          <p className="text-lg font-bold text-gray-900">{userProfile?.weight || '-'} kg</p>
        </Card>
        <Card className="text-center p-4">
          <p className="text-xs text-gray-500 font-medium">Kondisi</p>
          <p className="text-lg font-bold text-green-600">{userProfile?.diabetesType || '-'}</p>
        </Card>
      </div>
    </div>
  );
};

export default Home;