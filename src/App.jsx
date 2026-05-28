import { useLayoutEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from './pages/ProfileSetup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import History from './pages/History';
import Scanner from './pages/Scanner';
import ScanResult from './pages/ScanResult';
import Community from './pages/Community';
import HistoryDetail from './pages/HistoryDetail';
import CommunityDetail from './pages/CommunityDetail';
import LandingPage from './pages/LandingPage';
import PWAInstallPrompt from './components/common/PWAInstallPrompt';
import { useUser } from './context/UserContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const appScroll = document.querySelector('[data-app-scroll="true"]');
    if (appScroll) {
      appScroll.scrollTop = 0;
    }
  }, [pathname]);

  return null;
};

const BootSplash = () => (
  <div className="flex min-h-screen items-center justify-center bg-[var(--diabites-green-surface)] px-6">
    <div className="rounded-[2rem] border border-white/80 bg-white/90 px-6 py-5 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div className="mx-auto mb-3 h-12 w-12 animate-spin rounded-full border-4 border-[var(--diabites-green-soft)] border-t-[var(--diabites-green)]" />
      <p className="text-sm font-semibold text-slate-700">Menyiapkan akun Anda...</p>
    </div>
  </div>
);

const ProtectedRoute = () => {
  const { isAuthenticated, isBootstrapping } = useUser();

  if (isBootstrapping) {
    return <BootSplash />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated, isBootstrapping } = useUser();

  if (isBootstrapping) {
    return <BootSplash />;
  }

  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

function App() {
  return (
    <>
      <ScrollToTop />

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '16px',
            background: '#ffffff',
            color: '#0f172a',
            boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
          },
          success: { iconTheme: { primary: '#2a7c37', secondary: '#fff' } },
        }}
      />

      <PWAInstallPrompt />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/setup-profile" element={<ProfileSetup />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/scan-result" element={<ScanResult />} />
          <Route path="/history/:id" element={<HistoryDetail />} />
          <Route path="/community/:id" element={<CommunityDetail />} />

          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
