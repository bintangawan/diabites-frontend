import { Outlet } from 'react-router-dom';
import BottomBar from '../components/layout/BottomBar';
import GlobalHeader from '../components/layout/GlobalHeader';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--diabites-green-surface)] font-sans text-slate-900">
      <main
        data-app-shell="true"
        className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden border-x border-white/60 bg-white/96 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl"
      >
        <GlobalHeader />

        <div
          data-app-scroll="true"
          className="flex-1 overflow-y-auto overscroll-y-contain pb-32"
        >
          <Outlet />
        </div>

        <BottomBar />
      </main>
    </div>
  );
};

export default MainLayout;
