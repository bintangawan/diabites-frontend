import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import BrandLogo from '../components/common/BrandLogo';
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
    <div className="min-h-screen flex flex-col justify-center px-6 bg-[var(--diabites-green-surface)] max-w-md mx-auto">
      <div className="mb-10 text-center">
        <div className="mb-4 flex justify-center">
          <BrandLogo
            className="h-10 w-[9.75rem] sm:w-[10.5rem]"
            imageClassName="scale-[1.72]"
            priority
          />
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
          <a href="#" className="text-sm text-[var(--diabites-green)] font-medium hover:underline">Lupa Password?</a>
        </div>

        <Button
          type="submit"
          className="mt-2 !bg-[var(--diabites-green)] !shadow-[0_18px_36px_var(--diabites-green-shadow)] hover:!bg-[var(--diabites-green-dark)]"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Masuk'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Belum punya akun? <Link to="/register" className="text-[var(--diabites-green)] font-semibold hover:underline">Daftar</Link>
      </p>
    </div>
  );
};

export default Login;
