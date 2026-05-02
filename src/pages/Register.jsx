import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', agreeTerms: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validasi Manual
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Password dan Konfirmasi Password tidak cocok!');
    }
    if (!formData.agreeTerms) {
      return toast.error('Anda harus menyetujui Syarat dan Ketentuan!');
    }

    // Simulasi proses API (Dummy Flow)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Dummy set token ke local storage
      localStorage.setItem('dummy_token', 'register_token_123');
      toast.success('Pendaftaran berhasil! Mari lengkapi profil Anda.');
      navigate('/setup-profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-white max-w-md mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun</h1>
        <p className="text-gray-500">Mulai perjalanan sehatmu bersama DiaBites.</p>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <Input 
          name="name" value={formData.name} onChange={handleChange}
          icon={<User size={20} />} type="text" placeholder="Nama Lengkap" required 
        />
        <Input 
          name="email" value={formData.email} onChange={handleChange}
          icon={<Mail size={20} />} type="email" placeholder="Email" required 
        />
        <Input 
          name="password" value={formData.password} onChange={handleChange}
          icon={<Lock size={20} />} type={showPassword ? 'text' : 'password'} placeholder="Password" required 
          rightIcon={<div onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</div>}
        />
        <Input 
          name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
          icon={<Lock size={20} />} type={showConfirm ? 'text' : 'password'} placeholder="Konfirmasi Password" required 
          rightIcon={<div onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}</div>}
        />
        
        <div className="flex items-start gap-2 mt-2">
          <input 
            type="checkbox" id="terms" name="agreeTerms" 
            checked={formData.agreeTerms} onChange={handleChange}
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