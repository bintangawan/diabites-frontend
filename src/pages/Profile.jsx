import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUser } from '../context/UserContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Settings, LogOut, ChevronRight, User, HeartPulse, Lock, X } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useUser();

  // State untuk mengontrol visibilitas Modal
  const [activeModal, setActiveModal] = useState(null); // 'personal', 'health', 'password', atau null

  // Dummy Data User (Karena belum ada backend, kita buat mock-up yang terasa personal)
  const [userData, setUserData] = useState({
    name: 'Bintang Kurniawan',
    email: 'bintang@diabites.id'
  });

  // State Form Sementara untuk di dalam Modal
  const [formData, setFormData] = useState({});
  const [passwords, setPasswords] = useState({ oldPass: '', newPass: '', confirmPass: '' });

  // Fungsi Auto-Generate Initials untuk Avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Handler Buka Modal
  const openModal = (type) => {
    if (type === 'personal') setFormData({ ...userData });
    if (type === 'health') setFormData({ ...userProfile });
    if (type === 'password') setPasswords({ oldPass: '', newPass: '', confirmPass: '' });
    setActiveModal(type);
  };

  const closeModal = () => setActiveModal(null);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePassChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  // Handlers Submit
  const savePersonal = (e) => {
    e.preventDefault();
    setUserData(formData);
    toast.success('Profil pribadi berhasil diperbarui!');
    closeModal();
  };

  const saveHealth = (e) => {
    e.preventDefault();
    setUserProfile(formData);
    toast.success('Data kesehatan berhasil diperbarui!');
    closeModal();
  };

  const savePassword = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirmPass) {
      return toast.error('Konfirmasi password baru tidak cocok!');
    }
    toast.success('Password berhasil diubah!');
    closeModal();
  };

  const handleLogout = () => {
    toast.success('Berhasil keluar akun.');
    setUserProfile(null);
    navigate('/login');
  };

  return (
    <div className="p-6 pb-24 relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-4">Profil Saya</h1>

      {/* Header Profile dengan Auto-Generated Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
          {getInitials(userData.name)}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{userData.name}</h2>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Seksi Pengaturan Akun */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Pengaturan Akun</h3>
          <Card noPadding className="divide-y divide-gray-100">
            <MenuItem icon={<User size={18} />} label="Edit Profil Pribadi" onClick={() => openModal('personal')} color="blue" />
            <MenuItem icon={<HeartPulse size={18} />} label="Edit Data Kesehatan" onClick={() => openModal('health')} color="green" />
            <MenuItem icon={<Lock size={18} />} label="Ganti Password" onClick={() => openModal('password')} color="purple" />
          </Card>
        </div>

        {/* Seksi Preferensi (Bisa ditambah nanti) */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Lainnya</h3>
          <Card noPadding className="divide-y divide-gray-100">
            <MenuItem icon={<Settings size={18} />} label="Syarat & Ketentuan" onClick={() => toast('Fitur ini akan segera hadir!', { icon: '🚧' })} color="gray" />
          </Card>
        </div>

      </div>

      <Button variant="danger" fullWidth onClick={handleLogout} className="mt-8">
        <LogOut size={18} /> Keluar Akun
      </Button>


      {/* =========================================
          MODALS AREA 
          ========================================= */}
      
      {/* Modal Edit Profil Pribadi */}
      {activeModal === 'personal' && (
        <ModalWrapper title="Profil Pribadi" onClose={closeModal}>
          <form onSubmit={savePersonal} className="space-y-4">
            <Input label="Nama Lengkap" name="name" value={formData.name || ''} onChange={handleFormChange} required />
            <Input type="email" label="Email" name="email" value={formData.email || ''} onChange={handleFormChange} required />
            <Button type="submit" fullWidth className="mt-4">Simpan Profil</Button>
          </form>
        </ModalWrapper>
      )}

      {/* Modal Edit Data Kesehatan */}
      {activeModal === 'health' && (
        <ModalWrapper title="Data Kesehatan" onClose={closeModal}>
          <form onSubmit={saveHealth} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" label="Usia (Thn)" name="age" value={formData.age || ''} onChange={handleFormChange} required />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Gender</label>
                <select name="gender" value={formData.gender || 'male'} onChange={handleFormChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 bg-white outline-none">
                  <option value="male">Pria</option>
                  <option value="female">Wanita</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" label="Berat (kg)" name="weight" value={formData.weight || ''} onChange={handleFormChange} required />
              <Input type="number" label="Tinggi (cm)" name="height" value={formData.height || ''} onChange={handleFormChange} required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 ml-1">Tipe Diabetes</label>
              <select name="diabetesType" value={formData.diabetesType || 'Type 2'} onChange={handleFormChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 bg-white outline-none">
                <option value="Type 1">Tipe 1</option>
                <option value="Type 2">Tipe 2</option>
                <option value="Gestational">Gestasional</option>
                <option value="None">Tidak Ada / Pencegahan</option>
              </select>
            </div>

            <Button type="submit" fullWidth className="mt-4">Simpan Data Kesehatan</Button>
          </form>
        </ModalWrapper>
      )}

      {/* Modal Ganti Password */}
      {activeModal === 'password' && (
        <ModalWrapper title="Ganti Password" onClose={closeModal}>
          <form onSubmit={savePassword} className="space-y-4">
            <Input type="password" label="Password Lama" name="oldPass" value={passwords.oldPass} onChange={handlePassChange} required />
            <Input type="password" label="Password Baru" name="newPass" value={passwords.newPass} onChange={handlePassChange} required />
            <Input type="password" label="Konfirmasi Password Baru" name="confirmPass" value={passwords.confirmPass} onChange={handlePassChange} required />
            <Button type="submit" fullWidth className="mt-4">Perbarui Password</Button>
          </form>
        </ModalWrapper>
      )}

    </div>
  );
};

// --- Komponen Pembantu (Hanya dipakai di file ini) ---

const MenuItem = ({ icon, label, onClick, color }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    gray: 'bg-gray-50 text-gray-600'
  };

  return (
    <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors" onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>{icon}</div>
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </div>
  );
};

const ModalWrapper = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
    <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl h-[80vh] sm:h-auto overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
          <X size={20} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Profile;