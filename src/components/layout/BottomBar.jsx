import { NavLink } from "react-router-dom";
import { Home, Clock, Scan, Heart, User } from "lucide-react";

const BottomBar = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto rounded-[2rem] border border-white/80 bg-white/92 shadow-[0_-18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="relative mx-auto grid h-[4.6rem] max-w-md grid-cols-5">
        <NavItem to="/home" icon={<Home size={24} />} label="Home" />
        <NavItem to="/history" icon={<Clock size={24} />} label="History" />

        <div className="flex justify-center h-full w-full relative">
          <NavLink
            to="/scanner"
            className={({ isActive }) =>
              `absolute -top-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-[6px] border-white shadow-[0_20px_40px_var(--diabites-green-shadow)] transition-all duration-200 hover:scale-[1.04] active:scale-95 ${
                isActive
                  ? "bg-[var(--diabites-green-dark)]"
                  : "bg-[var(--diabites-green)]"
              }`
            }
          >
            <Scan size={28} className="text-white drop-shadow-sm" />
          </NavLink>
        </div>

        <NavItem to="/community" icon={<Heart size={24} />} label="Community" />
        <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink to={to} className="group flex h-full w-full items-center justify-center">
      {({ isActive }) => (
        <div className="flex flex-col items-center justify-center gap-1.5">
          <div
            className={`rounded-2xl p-2 transition-all duration-200 ${
              isActive
                ? "bg-[var(--diabites-green-soft)] text-[var(--diabites-green)] shadow-[0_10px_24px_var(--diabites-green-shadow-soft)]"
                : "text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-700"
            }`}
          >
            {icon}
          </div>
          <span
            className={`text-[10px] font-semibold tracking-[0.01em] ${
              isActive ? "text-[var(--diabites-green)]" : "text-slate-500"
            }`}
          >
            {label}
          </span>
        </div>
      )}
    </NavLink>
  );
};

export default BottomBar;
