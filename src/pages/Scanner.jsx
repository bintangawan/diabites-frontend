import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Camera,
  Flashlight,
  Image as ImageIcon,
  LoaderCircle,
  RefreshCw,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const isMobileDevice = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  return (
    Boolean(navigator.userAgentData?.mobile) ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  );
};

const createScanKey = () => (
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `scan-${Date.now()}-${Math.random().toString(36).slice(2)}`
);

const Scanner = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraReloadKey, setCameraReloadKey] = useState(0);
  const [cameraStatus, setCameraStatus] = useState("loading");
  const [cameraError, setCameraError] = useState("");
  const [cameraLabel, setCameraLabel] = useState("Menyiapkan live preview...");
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const prefersEnvironmentCamera = isMobileDevice();

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsFlashOn(false);
  };

  useEffect(() => {
    let isMounted = true;

    const attachStream = async (stream) => {
      if (!isMounted) {
        stream.getTracks().forEach((track) => track.stop());
        return false;
      }

      streamRef.current = stream;

      const videoElement = videoRef.current;
      if (!videoElement) {
        return false;
      }

      videoElement.srcObject = stream;

      try {
        await videoElement.play();
      } catch {
        // Browser akan mencoba memutar ulang setelah metadata siap.
      }

      const [track] = stream.getVideoTracks();
      const settings = track?.getSettings?.() || {};
      const usingEnvironment = settings.facingMode === "environment";

      setCameraStatus("ready");
      setCameraError("");
      setCameraLabel(
        usingEnvironment ? "Kamera belakang aktif" : "Kamera default aktif",
      );

      return true;
    };

    const startCamera = async () => {
      stopCamera();
      setCameraStatus("loading");
      setCameraError("");
      setCameraLabel("Menyiapkan live preview...");

      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraStatus("error");
        setCameraError("Browser ini belum mendukung akses kamera.");
        setCameraLabel("Kamera belum siap");
        return;
      }

      const constraintsList = prefersEnvironmentCamera
        ? [
            {
              audio: false,
              video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 1280 },
                height: { ideal: 720 },
              },
            },
            {
              audio: false,
              video: {
                facingMode: { ideal: "user" },
                width: { ideal: 1280 },
                height: { ideal: 720 },
              },
            },
            { audio: false, video: true },
          ]
        : [
            {
              audio: false,
              video: {
                facingMode: "user",
                width: { ideal: 1280 },
                height: { ideal: 720 },
              },
            },
            { audio: false, video: true },
          ];

      let lastError;

      for (const constraints of constraintsList) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          const attached = await attachStream(stream);
          if (attached) {
            return;
          }
        } catch (error) {
          lastError = error;
        }
      }

      if (!isMounted) {
        return;
      }

      const permissionDenied =
        lastError?.name === "NotAllowedError" ||
        lastError?.name === "SecurityError";
      const unavailable =
        lastError?.name === "NotFoundError" ||
        lastError?.name === "OverconstrainedError";

      setCameraStatus("error");
      setCameraLabel("Kamera belum siap");
      setCameraError(
        permissionDenied
          ? "Izin kamera ditolak. Aktifkan izin kamera di browser lalu coba lagi."
          : unavailable
            ? "Kamera tidak tersedia pada perangkat ini."
            : "Kamera belum bisa dibuka. Coba lagi atau gunakan gambar dari galeri.",
      );
    };

    startCamera();

    return () => {
      isMounted = false;
      stopCamera();
    };
  }, [cameraReloadKey, prefersEnvironmentCamera]);

  const openCameraOrGallery = () => {
    fileInputRef.current?.click();
  };

  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      toast.success("Gambar berhasil diambil! Mengekstraksi gizi...");
      stopCamera();
      navigate("/scan-result", { state: { file, previewUrl, scanKey: createScanKey() } });
    }

    e.target.value = "";
  };

  const handleCaptureFrame = () => {
    if (cameraStatus !== "ready" || !videoRef.current || !canvasRef.current) {
      toast.error("Kamera belum siap. Tunggu sebentar lalu coba lagi.");
      return;
    }

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const drawingContext = canvasElement.getContext("2d");

    if (
      !drawingContext ||
      !videoElement.videoWidth ||
      !videoElement.videoHeight
    ) {
      toast.error("Preview kamera belum tersedia.");
      return;
    }

    setIsCapturing(true);
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    drawingContext.drawImage(
      videoElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height,
    );

    canvasElement.toBlob(
      (blob) => {
        if (!blob) {
          setIsCapturing(false);
          toast.error("Gagal mengambil gambar. Coba lagi.");
          return;
        }

        const capturedFile = new File([blob], `scan-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        const previewUrl = URL.createObjectURL(blob);
        toast.success("Gambar berhasil diambil! Mengekstraksi gizi...");
        stopCamera();
        navigate("/scan-result", {
          state: { file: capturedFile, previewUrl, scanKey: createScanKey() },
        });
      },
      "image/jpeg",
      0.95,
    );
  };

  const handleToggleFlash = async () => {
    const track = streamRef.current?.getVideoTracks?.()[0];
    const capabilities = track?.getCapabilities?.();

    if (!track || cameraStatus !== "ready") {
      return;
    }

    if (!capabilities?.torch) {
      toast("Flash tidak tersedia pada kamera ini.");
      return;
    }

    try {
      await track.applyConstraints({ advanced: [{ torch: !isFlashOn }] });
      setIsFlashOn((prev) => !prev);
    } catch {
      toast.error("Flash tidak dapat diaktifkan di perangkat ini.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#041722] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(45,212,191,0.35),transparent_34%),radial-gradient(circle_at_100%_10%,rgba(59,130,246,0.18),transparent_28%),linear-gradient(180deg,#082437_0%,#061523_52%,#020617_100%)]" />
      <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="absolute -left-20 bottom-24 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.9rem,env(safe-area-inset-top))] sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.15rem] border border-white/[0.18] bg-white/[0.14] text-white shadow-[0_14px_35px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition hover:bg-white/[0.2] active:scale-95"
          >
            <X size={22} />
          </button>

          <div className="min-w-0 rounded-full border border-white/[0.16] bg-white/[0.16] px-5 py-2.5 text-center shadow-[0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur-2xl">
            <p className="text-[13px] font-bold tracking-tight text-white">
              Arahkan ke Label Gizi
            </p>
            <p className="mt-0.5 text-[10px] font-medium text-white/[0.65]">
              Pastikan label masuk area scan
            </p>
          </div>

          <button
            onClick={handleToggleFlash}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.15rem] border shadow-[0_14px_35px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition active:scale-95 ${
              isFlashOn
                ? "border-amber-200 bg-amber-100 text-amber-700 shadow-[0_0_28px_rgba(251,191,36,0.28)]"
                : "border-white/[0.18] bg-white/[0.14] text-white hover:bg-white/[0.2]"
            }`}
          >
            <Flashlight size={22} />
          </button>
        </div>

        <div className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-[2.25rem] border border-white/[0.16] bg-slate-950 shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
              cameraStatus === "ready"
                ? "scale-100 opacity-100"
                : "scale-[1.03] opacity-45"
            }`}
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12)_0%,rgba(2,6,23,0.04)_42%,rgba(2,6,23,0.42)_100%)]" />
          <div className="scanner-soft-grid pointer-events-none absolute inset-0 opacity-45" />

          <div className="pointer-events-none absolute inset-x-0 top-5 flex justify-center px-5">
            <div className="inline-flex max-w-[90%] items-center gap-2 rounded-full border border-white/[0.14] bg-black/[0.18] px-4 py-2 text-[11px] font-semibold text-white/[0.86] shadow-[0_12px_32px_rgba(0,0,0,0.16)] backdrop-blur-xl">
              <span
                className={`h-2 w-2 rounded-full ${
                  cameraStatus === "ready"
                    ? "bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]"
                    : cameraStatus === "error"
                      ? "bg-orange-300"
                      : "animate-pulse bg-sky-300"
                }`}
              />
              <span className="truncate">{cameraLabel}</span>
            </div>
          </div>

          {cameraStatus === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#041722]/45 px-6 backdrop-blur-[2px]">
              <div className="rounded-[2rem] border border-white/[0.14] bg-white/[0.12] px-6 py-5 text-center shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.14]">
                  <LoaderCircle
                    size={30}
                    className="animate-spin text-emerald-300"
                  />
                </div>
                <p className="mt-4 text-sm font-bold text-white">
                  Menyiapkan kamera
                </p>
                <p className="mt-1 text-xs font-medium text-white/[0.68]">
                  Tunggu sebentar, live preview sedang dimuat
                </p>
              </div>
            </div>
          )}

          {cameraStatus === "error" && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#041722]/60 p-6 backdrop-blur-sm">
              <div className="w-full rounded-[2rem] border border-white/[0.16] bg-white/[0.94] p-5 text-center text-slate-900 shadow-[0_28px_70px_rgba(0,0,0,0.26)]">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                  <AlertCircle size={28} />
                </div>
                <p className="mt-4 text-base font-extrabold">
                  Kamera belum bisa dibuka
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {cameraError}
                </p>

                <button
                  onClick={() => setCameraReloadKey((prev) => prev + 1)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg active:scale-95"
                >
                  <RefreshCw size={16} />
                  Coba Lagi
                </button>
              </div>
            </div>
          )}

          {cameraStatus === "ready" && (
            <>
              <div className="pointer-events-none absolute inset-x-7 bottom-40 top-24 rounded-[2rem] border border-white/[0.16] bg-white/[0.03] shadow-[inset_0_0_28px_rgba(255,255,255,0.07)]" />

              <div className="pointer-events-none absolute inset-x-8 bottom-44 top-28 rounded-[1.9rem]">
                <div className="absolute left-0 top-0 h-16 w-16 rounded-tl-[1.55rem] border-l-[5px] border-t-[5px] border-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.65)]" />
                <div className="absolute right-0 top-0 h-16 w-16 rounded-tr-[1.55rem] border-r-[5px] border-t-[5px] border-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.65)]" />
                <div className="absolute bottom-0 left-0 h-16 w-16 rounded-bl-[1.55rem] border-b-[5px] border-l-[5px] border-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.65)]" />
                <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-[1.55rem] border-b-[5px] border-r-[5px] border-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.65)]" />

                <div className="scanner-sweep-qris absolute inset-x-5 bottom-5 top-5">
                  <span className="absolute left-0 right-0 top-0 h-[3px] rounded-full bg-[linear-gradient(90deg,transparent_0%,#5eead4_18%,#ecfeff_50%,#5eead4_82%,transparent_100%)] shadow-[0_0_22px_rgba(94,234,212,0.95)]" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-[6.7rem] flex justify-center px-6">
                <div className="rounded-full border border-white/[0.14] bg-black/[0.2] px-4 py-2 text-[11px] font-semibold text-white/[0.78] shadow-[0_12px_32px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                  Label gizi terlihat jelas = hasil lebih akurat
                </div>
              </div>
            </>
          )}

          <div className="absolute inset-x-8 bottom-5">
            <div className="rounded-[1.6rem] border border-white/[0.16] bg-black/[0.22] px-3 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <button
                  onClick={openCameraOrGallery}
                  className="group flex h-[62px] flex-col items-center justify-center gap-1.5 rounded-[1.15rem] border border-white/[0.14] bg-white/[0.10] text-white transition hover:bg-white/[0.16] active:scale-95"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.12] text-white/90">
                    <ImageIcon size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-white/85">
                    Galeri
                  </span>
                </button>

                <button
                  onClick={handleCaptureFrame}
                  disabled={cameraStatus !== "ready" || isCapturing}
                  className="relative flex h-[64px] w-[64px] items-center justify-center rounded-full transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute inset-[-5px] rounded-full bg-emerald-300/20 blur-md" />
                  <span className="relative flex h-full w-full items-center justify-center rounded-full border-[5px] border-white/90 bg-[linear-gradient(135deg,#34d399_0%,#14b8a6_55%,#06b6d4_100%)] text-white shadow-[0_14px_32px_rgba(20,184,166,0.34)]">
                    {isCapturing ? (
                      <LoaderCircle size={24} className="animate-spin" />
                    ) : (
                      <Camera size={24} />
                    )}
                  </span>
                </button>

                <button
                  onClick={() => setCameraReloadKey((prev) => prev + 1)}
                  className="group flex h-[62px] flex-col items-center justify-center gap-1.5 rounded-[1.15rem] border border-white/[0.14] bg-white/[0.10] text-white transition hover:bg-white/[0.16] active:scale-95"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.12] text-white/90">
                    <RefreshCw size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-white/85">
                    Muat Ulang
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageCapture}
        accept="image/*"
        capture={prefersEnvironmentCamera ? "environment" : "user"}
        className="hidden"
      />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Scanner;
