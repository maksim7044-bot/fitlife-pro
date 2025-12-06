
import React, { useState } from 'react';
import { ArrowLeft, Bell, Plus, Trash2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Shared';

const Reminders: React.FC = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([
    { id: 1, title: 'Завтрак', time: '08:00', active: true, type: 'food' },
    { id: 2, title: 'Тренировка', time: '17:30', active: true, type: 'workout' },
    { id: 3, title: 'Взвешивание', time: '07:00', active: false, type: 'measure' },
  ]);

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
       {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Напоминания</h1>
         </div>
      </div>

      <div className="p-4 space-y-4">
          <Card className="bg-blue-50 border-blue-100 flex gap-4 p-4">
              <div className="p-3 bg-white rounded-full text-blue-500 shadow-sm h-fit">
                  <Bell size={24} />
              </div>
              <div>
                  <h3 className="font-bold text-blue-900">Держите стабильность!</h3>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                      Тех, кто регулярно ведёт дневник питания и тренировок, на 70% чаще достигают своих целей.
                  </p>
              </div>
          </Card>

          <div className="space-y-3">
              {reminders.map(r => (
                  <Card key={r.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                          <div className="text-slate-800">
                              <p className="font-bold text-lg">{r.time}</p>
                              <p className="text-sm text-slate-500 flex items-center gap-1">
                                  <span className={`w-2 h-2 rounded-full ${r.type === 'food' ? 'bg-orange-400' : r.type === 'workout' ? 'bg-blue-400' : 'bg-purple-400'}`} />
                                  {r.title}
                              </p>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                           <button 
                              onClick={() => toggleReminder(r.id)}
                              className={`w-12 h-7 rounded-full transition-colors relative ${r.active ? 'bg-blue-500' : 'bg-slate-200'}`}
                           >
                               <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${r.active ? 'left-6' : 'left-1'}`} />
                           </button>
                           <button onClick={() => deleteReminder(r.id)} className="text-slate-300 hover:text-red-400">
                               <Trash2 size={18} />
                           </button>
                      </div>
                  </Card>
              ))}
          </div>

          <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-2 text-slate-500 font-bold hover:bg-white hover:border-blue-300 hover:text-blue-500 transition-all">
              <Plus size={20} /> Добавить напоминание
          </button>
      </div>
    </div>
  );
};

export default Reminders;
