import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from './pages/ProfileSetup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import History from './pages/History'; // <-- IMPORT BARU
import Scanner from './pages/Scanner'; // <-- IMPORT BARU
import ScanResult from './pages/ScanResult';
import Community from './pages/Community'; // <-- IMPORT BARU
import HistoryDetail from './pages/HistoryDetail';
import CommunityDetail from './pages/CommunityDetail';
import LandingPage from './pages/LandingPage';
import PWAInstallPrompt from './components/common/PWAInstallPrompt';

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
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
        }}
      />

      <PWAInstallPrompt />

      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setup-profile" element={<ProfileSetup />} />

        {/* Rute Scanner (Di luar MainLayout supaya full screen dan menutupi BottomBar) */}
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/scan-result" element={<ScanResult />} />
        <Route path="/history/:id" element={<HistoryDetail />} />
        <Route path="/community/:id" element={<CommunityDetail />} />

        {/* Rute Utama (Dengan BottomBar) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} /> {/* <-- UPDATE DI SINI */}
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
