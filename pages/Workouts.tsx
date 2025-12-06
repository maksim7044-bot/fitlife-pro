
import React, { useState } from 'react';
import { Play, Calendar, Clock, ChevronRight, CheckCircle, Dumbbell, History, X, List } from 'lucide-react';
import { Card, Button } from '../components/Shared';
import { useNavigate, Link } from 'react-router-dom';

const Workouts: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'plan' | 'history'>('plan');
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);

  const upcomingWorkouts = [
    { id: 'w1', name: 'Жимовой день (грудь и трицепсы)', duration: '45 мин', exercises: 6, status: 'next', date: 'Сегодня', volume: '3200 кг', intensity: 'Высокая' },
    { id: 'w2', name: 'Тяговый день (спина и бицепсы)', duration: '50 мин', exercises: 7, status: 'upcoming', date: 'Завтра', volume: '4100 кг', intensity: 'Средняя' },
    { id: 'w3', name: 'День ног', duration: '60 мин', exercises: 5, status: 'upcoming', date: 'Ср, 30 окт', volume: '5000 кг', intensity: 'Высокая' },
  ];

  const history = [
    { id: 101, name: 'Тренировка всего тела', date: '25 окт', duration: '55 мин', volume: '4 500 кг', completed: true },
    { id: 102, name: 'Кардио и корпус', date: '23 окт', duration: '30 мин', volume: '—', completed: true },
  ];

  const exerciseList = [
    { name: 'Жим штанги лёжа', sets: '3', reps: '8-10' },
    { name: 'Жим гантелей на наклонной', sets: '3', reps: '10-12' },
    { name: 'Разгибания на блоке', sets: '4', reps: '12-15' },
    { name: 'Махи в стороны', sets: '3', reps: '15-20' },
    { name: 'Армейский жим', sets: '3', reps: '8-10' },
    { name: 'Французский жим', sets: '3', reps: '10-12' },
  ];

  const openPreview = (workout: any) => {
    setSelectedWorkout(workout);
  };

  const startWorkout = () => {
    if (selectedWorkout) {
      navigate(`/workout/active/${selectedWorkout.id}`);
    }
  };

  return (
    <div className="pb-24 animate-fade-in bg-slate-50 min-h-screen">
      <div className="p-4 bg-white sticky top-0 z-10 shadow-sm border-b border-slate-100">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-4">Тренировки</h1>
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('plan')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'plan' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
          >
            Мой план
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'history' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
          >
            История
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'plan' ? (
          <>
            {/* Hero Card for Next Workout */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 shadow-xl shadow-slate-900/20">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Dumbbell size={120} />
              </div>
              <div className="relative z-10">
                <span className="inline-block px-2 py-1 bg-blue-500 rounded text-[10px] font-bold uppercase mb-3">Следующая</span>
                <h2 className="text-2xl font-bold mb-1">{upcomingWorkouts[0].name}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-300 mb-6">
                  <div className="flex items-center gap-1"><Clock size={14} /> {upcomingWorkouts[0].duration}</div>
                  <div className="flex items-center gap-1"><Dumbbell size={14} /> {upcomingWorkouts[0].exercises} упражнений</div>
                </div>
                <Button
                  onClick={() => openPreview(upcomingWorkouts[0])}
                  className="!bg-white !text-slate-900 border-none shadow-lg hover:bg-slate-100"
                >
                  <Play size={18} fill="currentColor" /> Начать тренировку
                </Button>
              </div>
            </div>

            <h3 className="font-bold text-slate-800 mt-4 ml-1">Ближайшие</h3>
            <div className="space-y-3">
              {upcomingWorkouts.slice(1).map(workout => (
                <Card
                  key={workout.id}
                  className="flex items-center justify-between active:scale-[0.99] transition-transform cursor-pointer"
                  onClick={() => openPreview(workout)}
                >
                  <div>
                    <h4 className="font-bold text-slate-800">{workout.name}</h4>
                    <div className="flex gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {workout.date}</span>
                      <span>•</span>
                      <span>{workout.duration}</span>
                    </div>
                  </div>
                  <button className="p-2 bg-slate-100 rounded-full text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </Card>
              ))}
            </div>

            <button className="w-full py-4 text-center text-sm font-medium text-blue-500 hover:text-blue-600">
              Весь календарь
            </button>
          </>
        ) : (
          <div className="space-y-3">
            {history.map(session => (
              <Card key={session.id} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{session.name}</h4>
                  <p className="text-xs text-slate-500">{session.date} • {session.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-700">{session.volume}</p>
                  <p className="text-[10px] text-slate-400">Объём</p>
                </div>
              </Card>
            ))}
            <div className="text-center pt-8 opacity-50">
              <History size={48} className="mx-auto mb-2 text-slate-300" />
              <p className="text-sm text-slate-400">Больше нет записей</p>
            </div>
          </div>
        )}
      </div>

      {/* Workout Preview Modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center sm:justify-center animate-fade-in" onClick={() => setSelectedWorkout(null)}>
          <div className="bg-white w-full h-[85vh] sm:h-[600px] sm:w-[400px] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="relative h-32 bg-slate-900 text-white p-6 flex items-end">
              <button
                onClick={() => setSelectedWorkout(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20"
              >
                <X size={20} />
              </button>
              <div>
                <span className="inline-block px-2 py-0.5 bg-blue-500 rounded text-[10px] font-bold uppercase mb-2">
                  Интенсивность: {selectedWorkout.intensity}
                </span>
                <h2 className="text-2xl font-black leading-none">{selectedWorkout.name}</h2>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 border-b border-slate-100 divide-x divide-slate-100">
              <div className="p-3 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Длительность</p>
                <p className="font-bold text-slate-800">{selectedWorkout.duration}</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Объём</p>
                <p className="font-bold text-slate-800">{selectedWorkout.volume}</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Упражнения</p>
                <p className="font-bold text-slate-800">{exerciseList.length}</p>
              </div>
            </div>

            {/* Exercise List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                <List size={14} /> План тренировки
              </div>
              {exerciseList.map((ex, i) => (
                <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-4">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-500">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-slate-800">{ex.name}</p>
                    <p className="text-xs text-slate-500">{ex.sets} подхода × {ex.reps} повторов</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-white border-t border-slate-100 pb-safe">
              <Link
                to={`/workout/active/${selectedWorkout.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium transition-all active:scale-95 bg-blue-500 text-white shadow-lg shadow-blue-500/30"
              >
                <Play fill="currentColor" size={18} /> Начать тренировку
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
