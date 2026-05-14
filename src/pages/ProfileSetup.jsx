import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUser } from '../context/UserContext.jsx';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { setUserProfile } = useUser();
  const [formData, setFormData] = useState({
    age: '', gender: 'male', weight: '', height: '',
    diabetesType: 'Type 2', activityLevel: 'light'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile(formData);
    toast.success('Profil berhasil disimpan!', { icon: '🎉' });
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6 max-w-md mx-auto">
      <div className="mt-8 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lengkapi Profil Kesehatan</h1>
        <p className="text-sm text-gray-500 mt-1">Data ini digunakan untuk personalisasi rekomendasi nutrisi.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        <div className="flex gap-4">
          <Input name="age" type="number" label="Usia" placeholder="Thn" onChange={handleChange} required className="w-1/2" />
          <div className="flex flex-col gap-1.5 w-1/2">
            <label className="text-sm font-medium text-gray-700 ml-1">Gender</label>
            <select name="gender" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-500">
              <option value="male">Pria</option>
              <option value="female">Wanita</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <Input name="weight" type="number" label="Berat (kg)" placeholder="0" onChange={handleChange} required className="w-1/2" />
          <Input name="height" type="number" label="Tinggi (cm)" placeholder="0" onChange={handleChange} required className="w-1/2" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Tipe Diabetes</label>
          <select name="diabetesType" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-500">
            <option value="Type 1">Tipe 1</option>
            <option value="Type 2">Tipe 2</option>
            <option value="Gestational">Gestasional</option>
            <option value="None">Tidak Ada / Pencegahan</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Tingkat Aktivitas Fisik</label>
          <select name="activityLevel" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-500">
            <option value="sedentary">Jarang Olahraga</option>
            <option value="light">Ringan (1-3x / minggu)</option>
            <option value="moderate">Sedang (3-5x / minggu)</option>
            <option value="active">Aktif (6-7x / minggu)</option>
          </select>
        </div>

        <div className="mt-auto pt-6">
          <Button type="submit" fullWidth>Simpan & Lanjutkan</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetup;
