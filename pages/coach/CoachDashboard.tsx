
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, ChevronRight, Utensils, Video, FileText, Calendar, Activity, ArrowLeft } from 'lucide-react';
import { Card } from '../../components/Shared';

const CoachDashboard: React.FC = () => {
  const navigate = useNavigate();

  const clients = [
    { id: 1, name: 'Анна Морозова', status: 'active', lastActive: '2 ч назад', plan: 'Похудение Pro' },
    { id: 2, name: 'Кирилл Волков', status: 'active', lastActive: '5 ч назад', plan: 'Тактическая сила' },
    { id: 3, name: 'Марина Орлова', status: 'inactive', lastActive: '3 дн. назад', plan: '-' },
  ];

  return (
    <div className="p-4 pb-24 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
          <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Клиенты</h1>
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-500 mt-1 transition-colors"
              >
                  <ArrowLeft size={14} /> Вернуться к режиму клиента
              </button>
          </div>
          <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Plus size={24} />
          </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
          <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
          <input 
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Поиск клиентов..."
          />
      </div>

      {/* Tools / Quick Links */}
      <div className="grid grid-cols-4 gap-3 mb-6">
          <button 
            onClick={() => navigate('/coach/plans')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-95 transition-transform"
          >
             <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Calendar size={18} /></div>
             <span className="text-[10px] font-bold text-slate-600">Планы</span>
          </button>
          <button 
            onClick={() => navigate('/coach/meal-plans')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-95 transition-transform"
          >
             <div className="p-2 bg-green-50 text-green-600 rounded-full"><Utensils size={18} /></div>
             <span className="text-[10px] font-bold text-slate-600">Питание</span>
          </button>
          <button 
            onClick={() => navigate('/coach/video-library')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-95 transition-transform"
          >
             <div className="p-2 bg-purple-50 text-purple-600 rounded-full"><Video size={18} /></div>
             <span className="text-[10px] font-bold text-slate-600">Видео</span>
          </button>
          <button 
            onClick={() => navigate('/coach/reports')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-95 transition-transform"
          >
             <div className="p-2 bg-orange-50 text-orange-600 rounded-full"><FileText size={18} /></div>
             <span className="text-[10px] font-bold text-slate-600">Отчёты</span>
          </button>
      </div>

      {/* Stats Summary with Link to Activity */}
      <div className="grid grid-cols-2 gap-3 mb-6">
         <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
             <p className="text-xs text-slate-500 font-bold uppercase">Активных</p>
             <p className="text-2xl font-black text-slate-800">12</p>
         </div>
         <div 
            onClick={() => navigate('/coach/client-activity')}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm cursor-pointer active:scale-95 transition-transform flex flex-col justify-between"
         >
             <div className="flex justify-between items-start">
                <p className="text-xs text-slate-500 font-bold uppercase">Лента активности</p>
                <Activity size={16} className="text-blue-500" />
             </div>
             <p className="text-xs font-medium text-blue-500 mt-2">Открыть ленту &rarr;</p>
         </div>
      </div>

      {/* Client List */}
      <div className="space-y-3">
          {clients.map(client => (
              <Card 
                key={client.id} 
                className="flex items-center gap-3 active:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/coach/client/${client.id}`)}
              >
                  <div className="relative">
                      <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                         <img src={`https://picsum.photos/seed/${client.id}/100`} className="w-full h-full object-cover" />
                      </div>
                      {client.status === 'active' && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                  </div>
                  <div className="flex-1">
                      <h3 className="font-bold text-slate-800">{client.name}</h3>
                      <p className="text-xs text-slate-500">{client.plan}</p>
                  </div>
                  <div className="text-right mr-2">
                      <p className="text-[10px] text-slate-400 font-medium">{client.lastActive}</p>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
              </Card>
          ))}
      </div>
    </div>
  );
};

export default CoachDashboard;
