import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { extractErrorMessage } from '../services/api';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { userProfile, saveHealthProfile, refreshProfile } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: userProfile?.age || '',
    gender: userProfile?.gender || 'male',
    weight: userProfile?.weight || '',
    height: userProfile?.height || '',
    diabetesType: userProfile?.diabetesType || 'type2',
    activityLevel: userProfile?.activityLevel || 'light',
  });

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await saveHealthProfile({
        age: Number(formData.age),
        gender: formData.gender,
        weight: Number(formData.weight),
        height: Number(formData.height),
        diabetesType: formData.diabetesType,
        activityLevel: formData.activityLevel,
      });

      await refreshProfile();
      toast.success('Profil berhasil disimpan!');
      navigate('/home', { replace: true });
    } catch (error) {
      toast.error(extractErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6 max-w-md mx-auto">
      <div className="mt-8 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lengkapi Profil Kesehatan</h1>
        <p className="text-sm text-gray-500 mt-1">Data ini digunakan untuk personalisasi rekomendasi nutrisi.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        <div className="flex gap-4">
          <Input name="age" type="number" label="Usia" placeholder="Thn" value={formData.age} onChange={handleChange} required className="w-1/2" />
          <div className="flex flex-col gap-1.5 w-1/2">
            <label className="text-sm font-medium text-gray-700 ml-1">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-500">
              <option value="male">Pria</option>
              <option value="female">Wanita</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <Input name="weight" type="number" label="Berat (kg)" placeholder="0" value={formData.weight} onChange={handleChange} required className="w-1/2" />
          <Input name="height" type="number" label="Tinggi (cm)" placeholder="0" value={formData.height} onChange={handleChange} required className="w-1/2" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Tipe Diabetes</label>
          <select name="diabetesType" value={formData.diabetesType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-500">
            <option value="type1">Tipe 1</option>
            <option value="type2">Tipe 2</option>
            <option value="gestational">Gestasional</option>
            <option value="prediabetes">Prediabetes</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Tingkat Aktivitas Fisik</label>
          <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-500">
            <option value="sedentary">Jarang Olahraga</option>
            <option value="light">Ringan (1-3x / minggu)</option>
            <option value="moderate">Sedang (3-5x / minggu)</option>
            <option value="active">Aktif (6-7x / minggu)</option>
          </select>
        </div>

        <div className="mt-auto pt-6">
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Simpan & Lanjutkan'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetup;
