
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Flame, Utensils, Zap, ChevronRight, Award, Bell, Ruler, ShoppingBag, Camera, MessageSquare, CheckCircle } from 'lucide-react';
import { Card, SectionHeader } from '../components/Shared';
import { useUser } from '../context/UserContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, dailyTasks } = useUser();

  const getTaskIcon = (iconName: string) => {
      switch(iconName) {
          case 'Utensils': return <Utensils size={16} />;
          case 'Zap': return <Zap size={16} />;
          case 'Droplet': return <Activity size={16} />;
          default: return <CheckCircle size={16} />;
      }
  };

  const getTaskColor = (color: string) => {
      switch(color) {
          case 'orange': return 'text-orange-600 bg-orange-100';
          case 'blue': return 'text-blue-600 bg-blue-100';
          case 'cyan': return 'text-cyan-600 bg-cyan-100';
          default: return 'text-slate-600 bg-slate-100';
      }
  };
  
  const getBarColor = (color: string) => {
      switch(color) {
          case 'orange': return 'bg-orange-500';
          case 'blue': return 'bg-blue-500';
          case 'cyan': return 'bg-cyan-500';
          default: return 'bg-slate-500';
      }
  };

  return (
    <div className="p-4 space-y-6 animate-fade-in pb-32">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Привет, {stats.name || 'Атлет'}! 👋</h1>
          <p className="text-sm text-slate-500">Уровень {stats.level} • {stats.xp} опыта</p>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={() => navigate('/shop')} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                {stats.zc} ZC
            </button>
            <button onClick={() => navigate('/chat/coach')} className="p-2 bg-white rounded-full shadow-sm border border-slate-100 relative active:scale-95 transition-transform">
                <MessageSquare size={20} className="text-slate-600" />
            </button>
            <button onClick={() => navigate('/reminders')} className="p-2 bg-white rounded-full shadow-sm border border-slate-100 relative active:scale-95 transition-transform">
                <Bell size={20} className="text-slate-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
        </div>
      </div>

      {/* Activity Rings (Simplified visual representation) */}
      <Card className="flex items-center justify-between !p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl shadow-slate-900/20">
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Дневная активность</h3>
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <Flame className="text-red-400" size={18} />
                    <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-red-500 rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-slate-300">1450 ккал</span>
                </div>
                <div className="flex items-center gap-3">
                    <Activity className="text-green-400" size={18} />
                    <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-[45%] bg-green-500 rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-slate-300">35 мин</span>
                </div>
                <div className="flex items-center gap-3">
                    <Zap className="text-blue-400" size={18} />
                    <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-[80%] bg-blue-500 rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-slate-300">8 ч</span>
                </div>
            </div>
        </div>
        
        {/* Simplified Ring Visual */}
        <div className="relative w-24 h-24 flex items-center justify-center">
           <svg className="w-full h-full transform -rotate-90">
             <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-700" />
             <circle cx="48" cy="48" r="40" stroke="#ef4444" strokeWidth="6" fill="transparent" strokeDasharray="251" strokeDashoffset="60" strokeLinecap="round" />
             <circle cx="48" cy="48" r="30" stroke="#22c55e" strokeWidth="6" fill="transparent" strokeDasharray="188" strokeDashoffset="90" strokeLinecap="round" />
             <circle cx="48" cy="48" r="20" stroke="#3b82f6" strokeWidth="6" fill="transparent" strokeDasharray="125" strokeDashoffset="20" strokeLinecap="round" />
           </svg>
        </div>
      </Card>

      {/* Daily Tasks */}
      <div>
        <SectionHeader title="Задачи дня" />
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
             {dailyTasks.map(task => (
                 <div 
                    key={task.id}
                    onClick={() => task.type === 'workout' ? navigate('/workouts') : task.type === 'food' ? navigate('/add') : null}
                    className={`min-w-[140px] bg-white p-3 rounded-2xl border border-slate-100 flex flex-col gap-2 shadow-sm active:scale-[0.98] transition-transform cursor-pointer ${task.completed ? 'opacity-70 grayscale-[0.5]' : ''}`}
                 >
                    <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-lg ${getTaskColor(task.color)}`}>
                            {getTaskIcon(task.icon)}
                        </div>
                        <span className="text-xs font-bold text-slate-400">+{task.rewardZC} ZC</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-800">{task.title}</p>
                        <p className="text-xs text-slate-500">{task.current}/{task.target} {task.completed ? 'Готово' : ''}</p>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${getBarColor(task.color)}`} 
                            style={{ width: `${(task.current / task.target) * 100}%` }}
                        />
                    </div>
                 </div>
             ))}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-3 px-1">Быстрые действия</h2>
        <div className="grid grid-cols-4 gap-3">
             <Card onClick={() => navigate('/measure')} className="flex flex-col items-center justify-center py-3 gap-1 active:scale-95 transition-transform !p-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Ruler size={16} />
                </div>
                <span className="font-semibold text-[10px]">Замеры</span>
             </Card>
             <Card onClick={() => navigate('/challenges')} className="flex flex-col items-center justify-center py-3 gap-1 active:scale-95 transition-transform !p-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Award size={16} />
                </div>
                <span className="font-semibold text-[10px]">Челлендж</span>
             </Card>
             <Card onClick={() => navigate('/planner')} className="flex flex-col items-center justify-center py-3 gap-1 active:scale-95 transition-transform !p-2">
                 <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Utensils size={16} />
                </div>
                <span className="font-semibold text-[10px]">Планер</span>
             </Card>
             <Card onClick={() => navigate('/shop')} className="flex flex-col items-center justify-center py-3 gap-1 active:scale-95 transition-transform !p-2">
                 <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                    <ShoppingBag size={16} />
                </div>
                <span className="font-semibold text-[10px]">Магазин</span>
             </Card>
             <Card onClick={() => navigate('/photo-progress')} className="flex flex-col items-center justify-center py-3 gap-1 active:scale-95 transition-transform !p-2">
                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Camera size={16} />
                </div>
                <span className="font-semibold text-[10px]">Фото</span>
             </Card>
             <Card onClick={() => navigate('/workouts')} className="flex flex-col items-center justify-center py-3 gap-1 active:scale-95 transition-transform !p-2">
                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Zap size={16} />
                </div>
                <span className="font-semibold text-[10px]">Тренировка</span>
             </Card>
             <Card onClick={() => navigate('/reminders')} className="flex flex-col items-center justify-center py-3 gap-1 active:scale-95 transition-transform !p-2">
                 <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Bell size={16} />
                </div>
                <span className="font-semibold text-[10px]">Напоминания</span>
             </Card>
        </div>
      </div>

       {/* Coach Teaser */}
       <Card className="!bg-slate-900 !text-white flex items-center justify-between active:scale-95 transition-transform mt-4" onClick={() => navigate('/coach')}>
          <div>
            <h3 className="font-bold">Режим тренера</h3>
            <p className="text-xs text-slate-400">Переключиться на интерфейс тренера</p>
          </div>
          <ChevronRight />
       </Card>
    </div>
  );
};

export default Dashboard;
