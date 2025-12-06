
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Utensils, Dumbbell, Ruler, Clock, CheckCircle } from 'lucide-react';
import { Card } from '../../components/Shared';

const CoachClientActivity: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'workout' | 'food' | 'measure'>('all');

  const activities = [
      { id: 1, client: 'Анна Морозова', type: 'workout', title: 'Завершена тренировка: День ног', time: '10 мин назад', details: 'Объём: 4 500 кг', color: 'bg-blue-100 text-blue-600', icon: <Dumbbell size={16} /> },
      { id: 2, client: 'Кирилл Волков', type: 'food', title: 'Добавлен ужин', time: '45 мин назад', details: '650 ккал • 45 г белка', color: 'bg-orange-100 text-orange-600', icon: <Utensils size={16} /> },
      { id: 3, client: 'Мария Лебедева', type: 'measure', title: 'Обновлён вес', time: '2 ч назад', details: '92,5 кг (-0,5 кг)', color: 'bg-purple-100 text-purple-600', icon: <Ruler size={16} /> },
      { id: 4, client: 'Анна Морозова', type: 'food', title: 'Добавлен обед', time: '5 ч назад', details: '450 ккал', color: 'bg-orange-100 text-orange-600', icon: <Utensils size={16} /> },
      { id: 5, client: 'Илья Сафронов', type: 'workout', title: 'Старт кардио-сессии', time: 'Вчера', details: '30 мин бега', color: 'bg-blue-100 text-blue-600', icon: <Dumbbell size={16} /> },
  ];

  const filterOptions = [
      { value: 'all', label: 'Все' },
      { value: 'workout', label: 'Тренировки' },
      { value: 'food', label: 'Питание' },
      { value: 'measure', label: 'Замеры' },
  ];

  const filteredActivities = filter === 'all' ? activities : activities.filter(a => a.type === filter);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
       {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-center shadow-sm">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={24} className="text-slate-700" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Активность клиентов</h1>
         </div>
         <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
             <Search size={24} />
         </button>
      </div>

      {/* Filters */}
      <div className="bg-white px-4 pb-3 pt-1 overflow-x-auto no-scrollbar flex gap-2 border-b border-slate-50">
          {filterOptions.map(({ value, label }) => (
              <button 
                key={value}
                onClick={() => setFilter(value)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${filter === value ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'}`}
              >
                  {label}
              </button>
          ))}
      </div>

      {/* Feed */}
      <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Clock size={12} /> Последние обновления
          </div>

          {filteredActivities.map(activity => (
              <Card key={activity.id} className="flex gap-3 p-3 items-start relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200"></div>
                  
                  <div className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activity.color}`}>
                      {activity.icon}
                  </div>
                  
                  <div className="flex-1">
                      <div className="flex justify-between items-start">
                          <p className="font-bold text-sm text-slate-900">{activity.client}</p>
                          <span className="text-[10px] text-slate-400 font-medium">{activity.time}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-600 mt-0.5">{activity.title}</p>
                      <p className="text-xs text-slate-400 mt-1 bg-slate-50 inline-block px-2 py-1 rounded">{activity.details}</p>
                  </div>
              </Card>
          ))}

          <div className="text-center py-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  <CheckCircle size={14} /> Вы в курсе всего!
              </div>
          </div>
      </div>
    </div>
  );
};

export default CoachClientActivity;
