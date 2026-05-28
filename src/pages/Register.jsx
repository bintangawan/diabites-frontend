import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useUser } from '../context/UserContext';
import { extractErrorMessage } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const { registerAndLogin } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData((current) => ({
      ...current,
      [event.target.name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    if (!formData.agreeTerms) {
      toast.error('Anda harus menyetujui Syarat dan Ketentuan!');
      return;
    }

    setIsLoading(true);

    try {
      await registerAndLogin({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success('Pendaftaran berhasil! Mari lengkapi profil Anda.');
      navigate('/setup-profile', { replace: true });
    } catch (error) {
      toast.error(extractErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-white max-w-md mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun</h1>
        <p className="text-gray-500">Mulai perjalanan sehatmu bersama DiaBites.</p>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          icon={<User size={20} />}
          type="text"
          placeholder="Nama Lengkap"
          required
        />
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon={<Mail size={20} />}
          type="email"
          placeholder="Email"
          required
        />
        <Input
          name="password"
          value={formData.password}
          onChange={handleChange}
          icon={<Lock size={20} />}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          required
          rightIcon={(
            <div onClick={() => setShowPassword((current) => !current)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          )}
        />
        <Input
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          icon={<Lock size={20} />}
          type={showConfirm ? 'text' : 'password'}
          placeholder="Konfirmasi Password"
          required
          rightIcon={(
            <div onClick={() => setShowConfirm((current) => !current)}>
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          )}
        />

        <div className="flex items-start gap-2 mt-2">
          <input
            type="checkbox"
            id="terms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            Saya setuju dengan <a href="#" className="text-green-600 font-medium hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-green-600 font-medium hover:underline">Kebijakan Privasi</a> DiaBites.
          </label>
        </div>

        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Daftar Sekarang'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Sudah punya akun? <Link to="/login" className="text-green-600 font-semibold hover:underline">Masuk</Link>
      </p>
    </div>
  );
};

export default Register;
