
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Plus, BarChart2, User, Users, Dumbbell, Calendar, LogOut } from 'lucide-react';
import { Role } from '../types';

interface BottomNavProps {
  role: Role;
}

const BottomNav: React.FC<BottomNavProps> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Don't show nav on specific nested pages if needed, but for now we keep it sticky
  // Hide on coach plan editor to maximize space as per requirement 4.4.3
  if (location.pathname.includes('/coach/plan/edit')) return null;

  // Shared styling for the fixed container respecting the max-width of the app
  const containerClasses = "fixed bottom-0 bg-white border-t border-slate-100 pb-safe pt-2 px-6 pb-6 z-50 flex items-end h-20 shadow-[0_-5px_10px_rgba(0,0,0,0.02)] w-full max-w-[480px]";

  if (role === Role.CLIENT) {
    return (
      <div className={`${containerClasses} justify-between`}>
        <NavButton 
          icon={<Home size={24} />} 
          label="Главная" 
          active={isActive('/')} 
          onClick={() => navigate('/')} 
        />
        <NavButton 
          icon={<BookOpen size={24} />} 
          label="Дневник" 
          active={isActive('/diary')} 
          onClick={() => navigate('/diary')} 
        />
        
        {/* Central Add Button */}
        <div className="relative -top-5">
           <button 
             onClick={() => navigate('/add')}
             className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/40 active:scale-95 transition-transform"
           >
             <Plus size={28} strokeWidth={2.5} />
           </button>
        </div>

        <NavButton 
          icon={<BarChart2 size={24} />} 
          label="Статистика" 
          active={isActive('/statistics')} 
          onClick={() => navigate('/statistics')} 
        />
        <NavButton 
          icon={<User size={24} />} 
          label="Профиль" 
          active={isActive('/profile')} 
          onClick={() => navigate('/profile')} 
        />
      </div>
    );
  }

  // COACH NAV
  return (
    <div className={`${containerClasses} justify-around items-center`}>
      <NavButton 
        icon={<Users size={24} />} 
        label="Клиенты" 
        active={isActive('/coach')} 
        onClick={() => navigate('/coach')} 
      />
      <NavButton 
        icon={<Dumbbell size={24} />} 
        label="Упражнения" 
        active={isActive('/coach/exercises')} 
        onClick={() => navigate('/coach/exercises')} 
      />
      <NavButton 
        icon={<Calendar size={24} />} 
        label="Планы" 
        active={isActive('/coach/plans')} 
        onClick={() => navigate('/coach/plans')} 
      />
      <div className="h-8 w-px bg-slate-200 mx-1"></div>
      <NavButton 
        icon={<LogOut size={24} className="text-red-400" />} 
        label="Выход" 
        active={false} 
        onClick={() => navigate('/')} 
      />
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center gap-1 w-12 transition-colors duration-200 ${active ? 'text-blue-500' : 'text-slate-400'}`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default BottomNav;
