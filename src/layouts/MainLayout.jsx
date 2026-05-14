import { Outlet } from 'react-router-dom';
import BottomBar from '../components/layout/BottomBar';
import GlobalHeader from '../components/layout/GlobalHeader';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#effcf5_0%,#eef9ff_54%,#fffdf5_100%)] font-sans text-slate-900">
      <main
        data-app-shell="true"
        className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden border-x border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(247,252,255,0.98)_45%,rgba(244,252,247,0.98)_100%)] shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl"
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
