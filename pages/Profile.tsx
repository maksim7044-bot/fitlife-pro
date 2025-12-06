
import React from 'react';
import { User, Settings, Shield, Award, ChevronRight, LogOut } from 'lucide-react';
import { Card, ProgressBar } from '../components/Shared';
import { MOCK_ACHIEVEMENTS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { stats } = useUser();
  const { level, xp, nextLevelXp, zc, streak } = stats;
  const progress = (xp / nextLevelXp) * 100;

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
         <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-md">
            <img src="https://picsum.photos/200" alt="Avatar" className="w-full h-full object-cover" />
         </div>
         <div className="flex-1">
             <h1 className="text-xl font-bold text-slate-900">{stats.name || 'Пользователь'}</h1>
             <p className="text-sm text-slate-500">Уровень {level} • Новичок</p>
             <div className="mt-2 w-full max-w-[160px]">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1 text-right">{xp} / {nextLevelXp} опыта</p>
             </div>
         </div>
         <button 
            onClick={() => navigate('/settings')}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
         >
             <Settings size={24} />
         </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
         <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-100">
             <div className="flex items-center gap-2 mb-1 text-orange-600">
                 <div className="p-1 bg-white rounded-md shadow-sm"><Award size={16} /></div>
                 <span className="text-xs font-bold uppercase">Баланс</span>
             </div>
             <p className="text-2xl font-black text-slate-800">{zc}</p>
             <p className="text-xs text-slate-500">Монеты FitCoins (ZC)</p>
         </Card>
         <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
             <div className="flex items-center gap-2 mb-1 text-blue-600">
                 <div className="p-1 bg-white rounded-md shadow-sm"><Shield size={16} /></div>
                 <span className="text-xs font-bold uppercase">Серия</span>
             </div>
             <p className="text-2xl font-black text-slate-800">{streak} дней</p>
             <p className="text-xs text-slate-500">Держите темп!</p>
         </Card>
      </div>

      {/* Badges */}
      <div>
         <div className="flex justify-between items-center mb-3">
             <h2 className="text-lg font-bold text-slate-800">Достижения</h2>
             <button onClick={() => navigate('/achievements')} className="text-sm text-blue-500 font-medium">Все</button>
         </div>
         <div className="grid grid-cols-2 gap-3">
            {MOCK_ACHIEVEMENTS.slice(0, 4).map(badge => (
                <Card key={badge.id} className={`flex flex-col items-center text-center gap-2 ${!badge.completed ? 'opacity-60 grayscale' : ''}`}>
                    <div className="text-3xl">{badge.icon}</div>
                    <div>
                        <p className="font-bold text-sm text-slate-800">{badge.name}</p>
                        <p className="text-[10px] text-slate-500 leading-tight mt-1">{badge.description}</p>
                    </div>
                </Card>
            ))}
         </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-2">
         {[
             { icon: <User size={20} />, label: 'Личные данные', path: '/settings' },
             { icon: <Shield size={20} />, label: 'Конфиденциальность и безопасность', path: '/settings' },
             { icon: <Award size={20} />, label: 'Подписка', path: '/shop' },
         ].map((item, i) => (
             <button 
                key={i} 
                onClick={() => item.path && navigate(item.path)}
                className="w-full bg-white p-4 rounded-xl flex items-center justify-between shadow-sm active:scale-[0.99] transition-transform"
             >
                 <div className="flex items-center gap-3 text-slate-700">
                     {item.icon}
                     <span className="font-medium">{item.label}</span>
                 </div>
                 <ChevronRight size={18} className="text-slate-300" />
             </button>
         ))}
         
         <button className="w-full p-4 flex items-center justify-center gap-2 text-red-500 font-medium mt-4">
             <LogOut size={20} />
             Выйти
         </button>
      </div>
    </div>
  );
};

export default Profile;
