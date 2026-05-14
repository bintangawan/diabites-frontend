import BrandLogo from '../common/BrandLogo';

const GlobalHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-center px-4">
        <BrandLogo
          className="h-10 w-[9.5rem] sm:w-[10.5rem]"
          imageClassName="scale-[1.72]"
          priority
        />
      </div>
    </header>
  );
};

export default GlobalHeader;
