import { Outlet } from 'react-router-dom';
import BottomBar from '../components/layout/BottomBar';
import GlobalHeader from '../components/layout/GlobalHeader';

const MainLayout = () => {
  return (
    // Background luar (Untuk layar besar)
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      
      {/* Kontainer ukuran HP (max-w-md) di tengah layar */}
      <main className="flex-1 w-full max-w-md mx-auto relative shadow-2xl min-h-screen bg-white overflow-x-hidden flex flex-col">
        
        {/* Logo Aplikasi di paling atas */}
        <GlobalHeader />
        
        {/* Konten Halaman */}
        <div className="pb-24 flex-1">
          <Outlet />
        </div>
        
        {/* Navigasi Bawah */}
        <BottomBar />
      </main>
    </div>
  );
};

export default MainLayout;