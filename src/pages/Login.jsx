import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulasi API Login
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // Dummy check sederhana
      if (formData.email && formData.password) {
        localStorage.setItem('dummy_token', 'login_token_123');
        toast.success('Selamat datang kembali!');
        navigate('/home');
      } else {
        toast.error('Email dan Password wajib diisi!');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-white max-w-md mx-auto">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold text-green-600">D</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h1>
        <p className="text-gray-500">Masuk untuk melanjutkan ke DiaBites.</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input 
          name="email" value={formData.email} onChange={handleChange}
          icon={<Mail size={20} />} type="email" placeholder="Email" required 
        />
        <Input 
          name="password" value={formData.password} onChange={handleChange}
          icon={<Lock size={20} />} type={showPassword ? 'text' : 'password'} placeholder="Password" required 
          rightIcon={<div onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</div>}
        />
        
        <div className="flex justify-end">
          <a href="#" className="text-sm text-green-600 font-medium hover:underline">Lupa Password?</a>
        </div>

        <Button type="submit" className="mt-2" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Masuk'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Belum punya akun? <Link to="/register" className="text-green-600 font-semibold hover:underline">Daftar</Link>
      </p>
    </div>
  );
};

export default Login;