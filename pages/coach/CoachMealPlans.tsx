
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Utensils, Users, MoreVertical, Copy } from 'lucide-react';
import { Card } from '../../components/Shared';

const CoachMealPlans: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    { id: 1, name: 'Белковая сушка', calories: 2200, clients: 4, tags: ['Жиросжигание', 'Высокий белок'] },
    { id: 2, name: 'Чистый набор', calories: 3200, clients: 2, tags: ['Набор массы'] },
    { id: 3, name: 'Кето-перезагрузка', calories: 1800, clients: 1, tags: ['Кето', 'Мало углеводов'] },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-center shadow-sm">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={24} className="text-slate-700" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Планы питания</h1>
         </div>
         <button 
            onClick={() => navigate('/coach/meal-plan/edit/new')}
            className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
         >
             <Plus size={20} />
         </button>
      </div>

      <div className="p-4 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-xs text-slate-400 uppercase font-bold">Всего планов</p>
                  <p className="text-2xl font-black text-slate-800">12</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-xs text-slate-400 uppercase font-bold">Назначения</p>
                  <p className="text-2xl font-black text-blue-500">48</p>
              </div>
          </div>

          {/* List */}
          <div className="space-y-3">
              {plans.map(plan => (
                  <Card 
                    key={plan.id} 
                    className="active:scale-[0.99] transition-transform cursor-pointer"
                    onClick={() => navigate(`/coach/meal-plan/edit/${plan.id}`)}
                  >
                      <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                  <Utensils size={20} />
                              </div>
                              <div>
                                  <h3 className="font-bold text-slate-800">{plan.name}</h3>
                                  <p className="text-xs text-slate-500">{plan.calories} ккал/день</p>
                              </div>
                          </div>
                          <button className="text-slate-300 hover:text-slate-600">
                              <MoreVertical size={20} />
                          </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3 mb-3">
                          {plan.tags.map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded border border-slate-200">
                                  {tag}
                              </span>
                          ))}
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                              <Users size={14} /> {plan.clients} клиентов на плане
                          </div>
                          <button className="text-blue-500 text-xs font-bold flex items-center gap-1 hover:bg-blue-50 p-1 rounded" onClick={(e) => {e.stopPropagation();}}>
                              <Copy size={12} /> Дублировать
                          </button>
                      </div>
                  </Card>
              ))}
          </div>
      </div>
    </div>
  );
};

export default CoachMealPlans;
