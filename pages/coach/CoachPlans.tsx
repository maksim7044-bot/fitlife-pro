import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Calendar, ArrowRight } from 'lucide-react';
import { Card } from '../../components/Shared';

const CoachPlans: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    { id: 1, name: 'Гипертрофия Pro', duration: '12 недель', clients: 5, color: 'bg-blue-500' },
    { id: 2, name: 'Сушка', duration: '8 недель', clients: 8, color: 'bg-orange-500' },
    { id: 3, name: 'Домашние тренировки', duration: '4 недели', clients: 2, color: 'bg-green-500' },
  ];

  return (
    <div className="p-4 pb-24 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Планы тренировок</h1>

      <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => navigate('/coach/plan/edit/new')}
            className="w-full h-32 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-2 hover:bg-white hover:border-blue-400 hover:text-blue-500 transition-all"
          >
              <Plus size={32} />
              <span className="font-bold">Создать план</span>
          </button>

          {plans.map(plan => (
              <Card 
                key={plan.id} 
                className="relative overflow-hidden group cursor-pointer" 
                onClick={() => navigate(`/coach/plan/edit/${plan.id}`)}
              >
                  <div className={`absolute top-0 left-0 w-2 h-full ${plan.color}`}></div>
                  <div className="pl-4">
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-slate-800">{plan.name}</h3>
                          <div className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-500 uppercase">Черновик</div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500 mt-4">
                          <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{plan.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{plan.clients} клиентов</span>
                          </div>
                      </div>

                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-slate-900 text-white p-2 rounded-full">
                              <ArrowRight size={16} />
                          </div>
                      </div>
                  </div>
              </Card>
          ))}
      </div>
    </div>
  );
};

export default CoachPlans;
