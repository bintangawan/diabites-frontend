import { useEffect, useState } from 'react';
import { Share2, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const IOS_PATTERN = /iphone|ipad|ipod/i;
const BOTTOM_BAR_ROUTES = new Set(['/home', '/history', '/community', '/profile']);
const HIDDEN_ROUTES = ['/scanner', '/scan-result'];

const isStandaloneMode = () =>
  window.matchMedia('(display-mode: standalone)').matches
  || window.navigator.standalone === true;

const isIosDevice = () =>
  IOS_PATTERN.test(window.navigator.userAgent)
  || (window.navigator.userAgent.includes('Mac') && window.navigator.maxTouchPoints > 1);

const PWAInstallPrompt = () => {
  const { pathname } = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const updateStandaloneState = () => {
      const installed = isStandaloneMode();
      setStandalone(installed);
      setIosHint(!installed && isIosDevice());
    };

    const handleAppInstalled = () => {
      setStandalone(true);
      setIosHint(false);
      toast.success('DiaBites berhasil ditambahkan ke perangkat ini.');
    };

    updateStandaloneState();

    const mediaQuery = window.matchMedia('(display-mode: standalone)');

    window.addEventListener('appinstalled', handleAppInstalled);
    mediaQuery.addEventListener?.('change', updateStandaloneState);
    mediaQuery.addListener?.(updateStandaloneState);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener?.('change', updateStandaloneState);
      mediaQuery.removeListener?.(updateStandaloneState);
    };
  }, []);

  const handleIosHelp = () => {
    toast('Gunakan tombol Bagikan di Safari, lalu pilih "Add to Home Screen".', {
      icon: 'i',
    });
  };

  const hasBottomBar = BOTTOM_BAR_ROUTES.has(pathname);
  const shouldHide =
    standalone || dismissed || HIDDEN_ROUTES.some((route) => pathname.startsWith(route));
  const shouldShowIosHint = iosHint;

  if (shouldHide || !shouldShowIosHint) {
    return null;
  }

  return (
    <div
      className={`fixed inset-x-0 z-[120] flex justify-center px-4 ${
        hasBottomBar ? 'bottom-24' : 'bottom-4'
      }`}
    >
      <div className="w-full max-w-md rounded-[1.8rem] border border-[var(--diabites-green-border)] bg-white/96 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--diabites-green-soft)] text-[var(--diabites-green)]">
            <Share2 size={20} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900">Simpan DiaBites ke layar utama</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Di iPhone atau iPad, buka menu Bagikan di Safari lalu pilih Add to Home Screen.
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleIosHelp}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-[var(--diabites-green-border)] hover:text-[var(--diabites-green)]"
              >
                <Share2 size={14} />
                Lihat Cara
              </button>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                aria-label="Tutup prompt install"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
