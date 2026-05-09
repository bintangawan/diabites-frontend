import { Routes, Route, Navigate } from 'react-router-dom';
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

// Placeholder untuk halaman Favorites yang belum kita buat
const Placeholder = ({ title }) => <div className="p-6 text-center text-gray-500 mt-20">{title} Page (Coming Soon)</div>;

function App() {
  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: { fontFamily: 'Poppins, sans-serif', borderRadius: '12px' },
          success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
        }}
      />

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