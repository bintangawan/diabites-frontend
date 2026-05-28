import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useUser } from '../context/UserContext';
import { extractErrorMessage } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const result = await login(formData);
      toast.success('Selamat datang kembali!');
      navigate(result.me.healthProfile ? '/home' : '/setup-profile', { replace: true });
    } catch (error) {
      toast.error(extractErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
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
