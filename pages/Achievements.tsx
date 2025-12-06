
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Star, Trophy } from 'lucide-react';
import { Card, ProgressBar } from '../components/Shared';

const Achievements: React.FC = () => {
  const navigate = useNavigate();

  const badges = [
      { id: 1, name: 'Первые шаги', desc: 'Завершите первую тренировку', icon: '👟', progress: 100, max: 100, unlocked: true },
      { id: 2, name: 'Чистое питание', desc: 'Записывайте питание 7 дней', icon: '🥗', progress: 5, max: 7, unlocked: false },
      { id: 3, name: 'Силовик', desc: 'Поднимите суммарно 1000 кг', icon: '🏋️', progress: 850, max: 1000, unlocked: false },
      { id: 4, name: 'Жаворонок', desc: 'Потренируйтесь до 8 утра', icon: '🌅', progress: 1, max: 1, unlocked: true },
      { id: 5, name: 'Командный игрок', desc: 'Присоединитесь к челленджу', icon: '🤝', progress: 0, max: 1, unlocked: false },
      { id: 6, name: 'Баланс воды', desc: 'Отслеживайте воду 30 дней', icon: '💧', progress: 12, max: 30, unlocked: false },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
       {/* Hero Header */}
       <div className="bg-slate-900 text-white p-6 pb-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-10">
               <Trophy size={150} />
           </div>
           
           <button onClick={() => navigate(-1)} className="relative z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 mb-6">
               <ArrowLeft size={20} />
           </button>

           <div className="relative z-10">
               <h1 className="text-3xl font-black mb-2">Достижения</h1>
               <p className="text-slate-400 text-sm mb-6">Открывайте бейджи и получайте награды ZC и опыт.</p>
               
               <div className="flex items-center gap-4">
                   <div className="flex-1 bg-slate-800 rounded-xl p-3 border border-slate-700">
                       <p className="text-xs text-slate-400 uppercase font-bold mb-1">Открыто</p>
                       <p className="text-2xl font-black text-white">2 <span className="text-sm text-slate-500 font-normal">/ 6</span></p>
                   </div>
                   <div className="flex-1 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-3 shadow-lg shadow-orange-500/20">
                       <p className="text-xs text-white/80 uppercase font-bold mb-1">Набрано ZC</p>
                       <p className="text-2xl font-black text-white">150</p>
                   </div>
               </div>
           </div>
       </div>

       {/* Grid */}
       <div className="p-4 -mt-6 relative z-10 grid grid-cols-2 gap-3">
           {badges.map(badge => (
               <Card key={badge.id} className={`flex flex-col items-center text-center p-4 gap-2 ${!badge.unlocked ? 'bg-slate-100 opacity-90' : ''}`}>
                   <div className="relative mb-2">
                       <div className={`text-4xl ${!badge.unlocked ? 'grayscale opacity-50 blur-[1px]' : 'animate-bounce-subtle'}`}>
                           {badge.icon}
                       </div>
                       {!badge.unlocked && (
                           <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                               <Lock size={24} />
                           </div>
                       )}
                       {badge.unlocked && (
                           <div className="absolute -top-1 -right-1 text-yellow-500 bg-white rounded-full shadow-sm p-0.5">
                               <Star size={12} fill="currentColor" />
                           </div>
                       )}
                   </div>
                   
                   <div>
                       <h3 className="font-bold text-sm text-slate-900">{badge.name}</h3>
                       <p className="text-[10px] text-slate-500 leading-tight mt-1 h-6">{badge.desc}</p>
                   </div>

                   <div className="w-full mt-2">
                       <ProgressBar current={badge.progress} max={badge.max} color={badge.unlocked ? 'bg-green-500' : 'bg-slate-400'} />
                   </div>
               </Card>
           ))}
       </div>
    </div>
  );
};

export default Achievements;
