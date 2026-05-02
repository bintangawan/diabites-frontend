import { NavLink } from "react-router-dom";
import { Home, Clock, Scan, Heart, User } from "lucide-react";

const BottomBar = () => {
  return (
    // Tambahan rounded-t-3xl biar ujung atasnya agak membulat manis
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 pb-safe z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
      {/* Pake grid-cols-5 agar 5 menu terbagi SANGAT RATA (masing-masing 20%) */}
      <div className="grid grid-cols-5 max-w-md mx-auto h-16 relative">
        <NavItem to="/home" icon={<Home size={24} />} label="Home" />
        <NavItem to="/history" icon={<Clock size={24} />} label="History" />

        {/* Center FAB (Floating Action Button) - DIJAMIN CENTER */}
        <div className="flex justify-center h-full w-full relative">
          <NavLink
            to="/scanner"
            className={({ isActive }) =>
              `absolute -top-6 flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 border-4 border-white ${
                isActive
                  ? "bg-teal-700 shadow-teal-600/40"
                  : "bg-teal-600 shadow-slate-300"
              }`
            }
          >
            <Scan size={28} className="text-white" />
          </NavLink>
        </div>

        <NavItem to="/community" icon={<Heart size={24} />} label="Community" />
        <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center gap-1 transition-colors h-full w-full ${
        isActive ? "text-teal-600" : "text-slate-400 hover:text-slate-600"
      }`
    }
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </NavLink>
);

export default BottomBar;
