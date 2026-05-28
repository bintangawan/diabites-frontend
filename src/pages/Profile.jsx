import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  ChevronRight,
  HeartPulse,
  Loader2,
  Lock,
  LogOut,
  Settings,
  User,
  X,
} from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { buildAssetUrl, extractErrorMessage } from '../services/api';
import { formatDiabetesType, getInitials } from '../utils/helpers';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const {
    userProfile,
    updateProfile,
    saveHealthProfile,
    changePassword,
    logout,
  } = useUser();

  const [activeModal, setActiveModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState('');
  const [formData, setFormData] = useState({});
  const [passwords, setPasswords] = useState({
    oldPass: '',
    newPass: '',
    confirmPass: '',
  });

  const profilePhotoUrl = buildAssetUrl(userProfile?.profilePhoto);

  const openModal = (type) => {
    if (type === 'personal') {
      setFormData({
        name: userProfile?.name || '',
        email: userProfile?.email || '',
      });
    }

    if (type === 'health') {
      setFormData({
        age: userProfile?.age || '',
        gender: userProfile?.gender || 'male',
        weight: userProfile?.weight || '',
        height: userProfile?.height || '',
        diabetesType: userProfile?.diabetesType || 'type2',
        activityLevel: userProfile?.activityLevel || 'light',
      });
    }

    if (type === 'password') {
      setPasswords({ oldPass: '', newPass: '', confirmPass: '' });
    }

    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsSubmitting('');
  };

  const handleFormChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePassChange = (event) => {
    setPasswords((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUploadPhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsSubmitting('photo');

    try {
      await updateProfile({ photo: file });
      toast.success('Foto profil berhasil diperbarui!');
    } catch (error) {
      toast.error(extractErrorMessage(error));
    } finally {
      setIsSubmitting('');
      event.target.value = '';
    }
  };

  const savePersonal = async (event) => {
    event.preventDefault();
    setIsSubmitting('personal');

    try {
      await updateProfile({ name: formData.name });
      toast.success('Profil pribadi berhasil diperbarui!');
      closeModal();
    } catch (error) {
      toast.error(extractErrorMessage(error));
      setIsSubmitting('');
    }
  };

  const saveHealth = async (event) => {
    event.preventDefault();
    setIsSubmitting('health');

    try {
      await saveHealthProfile({
        age: Number(formData.age),
        gender: formData.gender,
        weight: Number(formData.weight),
        height: Number(formData.height),
        diabetesType: formData.diabetesType,
        activityLevel: formData.activityLevel,
      });
      toast.success('Data kesehatan berhasil diperbarui!');
      closeModal();
    } catch (error) {
      toast.error(extractErrorMessage(error));
      setIsSubmitting('');
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();

    if (passwords.newPass !== passwords.confirmPass) {
      toast.error('Konfirmasi password baru tidak cocok!');
      return;
    }

    setIsSubmitting('password');

    try {
      await changePassword({
        currentPassword: passwords.oldPass,
        newPassword: passwords.newPass,
      });
      toast.success('Password berhasil diubah!');
      closeModal();
    } catch (error) {
      toast.error(extractErrorMessage(error));
      setIsSubmitting('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Berhasil keluar akun.');
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <div className="p-6 pb-24 relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-4">Profil Saya</h1>

      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[var(--diabites-green)] text-xl font-bold text-white shadow-md"
        >
          {profilePhotoUrl ? (
            <img src={profilePhotoUrl} alt={userProfile?.name || 'Foto profil'} className="h-full w-full object-cover" />
          ) : isSubmitting === 'photo' ? (
            <Loader2 className="animate-spin" size={22} />
          ) : (
            getInitials(userProfile?.name)
          )}
        </button>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{userProfile?.name || 'Pengguna DiaBites'}</h2>
          <p className="text-sm text-gray-500">{userProfile?.email || '-'}</p>
          <p className="text-xs text-gray-400 mt-1">Ketuk avatar untuk mengganti foto</p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleUploadPhoto}
        className="hidden"
      />

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Pengaturan Akun</h3>
          <Card noPadding className="divide-y divide-gray-100">
            <MenuItem icon={<User size={18} />} label="Edit Profil Pribadi" onClick={() => openModal('personal')} color="blue" />
            <MenuItem icon={<HeartPulse size={18} />} label="Edit Data Kesehatan" onClick={() => openModal('health')} color="green" />
            <MenuItem icon={<Lock size={18} />} label="Ganti Password" onClick={() => openModal('password')} color="purple" />
          </Card>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Lainnya</h3>
          <Card noPadding className="divide-y divide-gray-100">
            <MenuItem icon={<Settings size={18} />} label="Syarat & Ketentuan" onClick={() => toast('Fitur ini akan segera hadir!')} color="gray" />
          </Card>
        </div>
      </div>

      <Button variant="danger" fullWidth onClick={handleLogout} className="mt-8">
        <LogOut size={18} /> Keluar Akun
      </Button>

      {activeModal === 'personal' && (
        <ModalWrapper title="Profil Pribadi" onClose={closeModal}>
          <form onSubmit={savePersonal} className="space-y-4">
            <Input label="Nama Lengkap" name="name" value={formData.name || ''} onChange={handleFormChange} required />
            <Input type="email" label="Email" name="email" value={formData.email || ''} readOnly />
            <Button type="submit" fullWidth className="mt-4" disabled={isSubmitting === 'personal'}>
              {isSubmitting === 'personal' ? <Loader2 className="animate-spin" size={20} /> : 'Simpan Profil'}
            </Button>
          </form>
        </ModalWrapper>
      )}

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
              <select name="diabetesType" value={formData.diabetesType || 'type2'} onChange={handleFormChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 bg-white outline-none">
                <option value="type1">Tipe 1</option>
                <option value="type2">Tipe 2</option>
                <option value="gestational">Gestasional</option>
                <option value="prediabetes">Prediabetes</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 ml-1">Tingkat Aktivitas Fisik</label>
              <select name="activityLevel" value={formData.activityLevel || 'light'} onChange={handleFormChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 bg-white outline-none">
                <option value="sedentary">Jarang Olahraga</option>
                <option value="light">Ringan (1-3x / minggu)</option>
                <option value="moderate">Sedang (3-5x / minggu)</option>
                <option value="active">Aktif (6-7x / minggu)</option>
              </select>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
              Kondisi saat ini: <span className="font-semibold text-slate-700">{formatDiabetesType(formData.diabetesType)}</span>
            </div>

            <Button type="submit" fullWidth className="mt-4" disabled={isSubmitting === 'health'}>
              {isSubmitting === 'health' ? <Loader2 className="animate-spin" size={20} /> : 'Simpan Data Kesehatan'}
            </Button>
          </form>
        </ModalWrapper>
      )}

      {activeModal === 'password' && (
        <ModalWrapper title="Ganti Password" onClose={closeModal}>
          <form onSubmit={savePassword} className="space-y-4">
            <Input type="password" label="Password Lama" name="oldPass" value={passwords.oldPass} onChange={handlePassChange} required />
            <Input type="password" label="Password Baru" name="newPass" value={passwords.newPass} onChange={handlePassChange} required />
            <Input type="password" label="Konfirmasi Password Baru" name="confirmPass" value={passwords.confirmPass} onChange={handlePassChange} required />
            <Button type="submit" fullWidth className="mt-4" disabled={isSubmitting === 'password'}>
              {isSubmitting === 'password' ? <Loader2 className="animate-spin" size={20} /> : 'Perbarui Password'}
            </Button>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
};

const MenuItem = ({ icon, label, onClick, color }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-[var(--diabites-green-soft)] text-[var(--diabites-green)]',
    purple: 'bg-purple-50 text-purple-600',
    gray: 'bg-gray-50 text-gray-600',
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
