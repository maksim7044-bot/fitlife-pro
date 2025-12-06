import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Plus, MoreHorizontal, Trash2, Clock, RotateCcw, X, Check, Search } from 'lucide-react';
import { Button, Card } from '../../components/Shared';

// Types specific to local state to simplify the demo
interface PlanState {
  cycles: { id: string; name: string }[];
  weeks: { id: string; name: string }[];
  days: { id: string; name: string }[];
  exercises: any[];
}

const CoachPlanEditor: React.FC = () => {
  const navigate = useNavigate();
  
  // State for selections
  const [selectedCycleId, setSelectedCycleId] = useState('c1');
  const [selectedWeekId, setSelectedWeekId] = useState('w1');
  const [selectedDayId, setSelectedDayId] = useState('d1');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data
  const cycles = [{ id: 'c1', name: 'Месяц 1' }, { id: 'c2', name: 'Месяц 2' }];
  const weeks = [{ id: 'w1', name: 'Неделя 1' }, { id: 'w2', name: 'Неделя 2' }, { id: 'w3', name: 'Неделя 3' }];
  const days = [
      { id: 'd1', name: 'День 1' }, 
      { id: 'd2', name: 'День 2' }, 
      { id: 'd3', name: 'День 3' },
      { id: 'd4', name: 'День 4' }
  ];

  const [exercises, setExercises] = useState([
      { id: 'e1', name: 'Жим штанги лёжа', muscle: 'Грудь', sets: [{ reps: 10, weight: 60 }, { reps: 8, weight: 65 }] },
      { id: 'e2', name: 'Жим гантелей на наклонной', muscle: 'Грудь', sets: [{ reps: 12, weight: 20 }, { reps: 12, weight: 20 }] }
  ]);

  // Modal State
  const [modalFilter, setModalFilter] = useState('Все');
  const modalExercises = [
      { id: 'm1', name: 'Кроссовер', muscle: 'Грудь' },
      { id: 'm2', name: 'Отжимания', muscle: 'Грудь' },
      { id: 'm3', name: 'Тяга верхнего блока', muscle: 'Спина' },
      { id: 'm4', name: 'Тяга штанги в наклоне', muscle: 'Спина' },
      { id: 'm5', name: 'Приседания', muscle: 'Ноги' },
  ];
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const handleAddExercises = () => {
      const newExercises = modalExercises
        .filter(ex => selectedExercises.includes(ex.id))
        .map(ex => ({
            ...ex,
            sets: [{ reps: 10, weight: 0 }] // Default set
        }));
      
      setExercises([...exercises, ...newExercises]);
      setIsModalOpen(false);
      setSelectedExercises([]);
  };

  const toggleExerciseSelection = (id: string) => {
      if (selectedExercises.includes(id)) {
          setSelectedExercises(selectedExercises.filter(e => e !== id));
      } else {
          setSelectedExercises([...selectedExercises, id]);
      }
  };

  return (
    <div className="bg-slate-50 h-screen flex flex-col overflow-hidden relative">
      {/* 1. Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 flex justify-between items-center shrink-0 shadow-sm z-20">
        <button onClick={() => navigate('/coach')} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={24} className="text-slate-700" />
        </button>
        <div className="text-center">
            <h1 className="font-bold text-slate-900">Гипертрофия Pro</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Режим редактирования</p>
        </div>
        <button className="p-2 text-slate-400">
            <HelpCircle size={24} />
        </button>
      </div>

      {/* 2. Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
          
          {/* Cycles (Months) */}
          <div className="p-4 bg-white border-b border-slate-100">
             <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                {cycles.map(cycle => (
                    <button 
                        key={cycle.id}
                        onClick={() => setSelectedCycleId(cycle.id)}
                        className={`text-lg font-bold whitespace-nowrap transition-colors ${selectedCycleId === cycle.id ? 'text-blue-600' : 'text-slate-400'}`}
                    >
                        {cycle.name}
                    </button>
                ))}
                <button className="text-blue-500 bg-blue-50 p-1 rounded-full"><Plus size={16} /></button>
             </div>
          </div>

          {/* Microcycles (Weeks) */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
             <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {weeks.map(week => (
                    <button 
                        key={week.id}
                        onClick={() => setSelectedWeekId(week.id)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedWeekId === week.id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-white text-slate-600 border border-slate-200'}`}
                    >
                        {week.name}
                    </button>
                ))}
                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-500"><Plus size={16} /></button>
             </div>
          </div>

          {/* Content Area */}
          <div className="p-4 space-y-6">
              
              {/* Add Exercise Hero Button */}
              {exercises.length === 0 && (
                 <div className="py-12 flex flex-col items-center justify-center text-center">
                    <p className="text-slate-400 mb-4">Для этого дня ещё нет упражнений.</p>
                    <Button className="!w-auto px-8" onClick={() => setIsModalOpen(true)}>Добавить упражнения</Button>
                 </div>
              )}

              {/* Exercise List */}
              {exercises.map((ex, idx) => (
                  <Card key={idx} className="border-l-4 border-l-blue-500 overflow-hidden">
                      <div className="flex justify-between items-start mb-3">
                          <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                                  {idx + 1}. {ex.muscle}
                              </span>
                              <h3 className="font-bold text-slate-800 text-lg">{ex.name}</h3>
                          </div>
                          <div className="flex gap-1">
                              <button className="p-2 text-slate-300 hover:text-blue-500"><HelpCircle size={18} /></button>
                              <button 
                                className="p-2 text-slate-300 hover:text-red-500"
                                onClick={() => setExercises(exercises.filter((_, i) => i !== idx))}
                              >
                                  <Trash2 size={18} />
                              </button>
                          </div>
                      </div>

                      {/* Sets Table */}
                      <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                          <div className="grid grid-cols-10 text-[10px] text-slate-400 font-bold uppercase text-center mb-1">
                              <span className="col-span-2">Подход</span>
                              <span className="col-span-3">Кг</span>
                              <span className="col-span-3">Повторы</span>
                              <span className="col-span-2"></span>
                          </div>
                          {ex.sets.map((set: any, sIdx: number) => (
                              <div key={sIdx} className="grid grid-cols-10 items-center gap-2">
                                  <div className="col-span-2 flex justify-center">
                                      <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                                          {sIdx + 1}
                                      </div>
                                  </div>
                                  <input type="number" defaultValue={set.weight} className="col-span-3 bg-white border border-slate-200 rounded-md py-1 text-center text-sm font-bold text-slate-700" />
                                  <input type="number" defaultValue={set.reps} className="col-span-3 bg-white border border-slate-200 rounded-md py-1 text-center text-sm font-bold text-slate-700" />
                                  <button className="col-span-2 flex justify-center text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
                              </div>
                          ))}
                          <button className="w-full py-2 flex items-center justify-center text-xs font-bold text-blue-500 gap-1 bg-blue-50/50 rounded-lg mt-2 border border-dashed border-blue-200">
                              <Plus size={12} /> Добавить подход
                          </button>
                      </div>

                      {/* Settings Row */}
                      <div className="flex gap-3 mt-4">
                          <div className="flex-1 bg-slate-50 rounded-lg p-2 flex items-center justify-center gap-2 text-slate-600 text-xs font-medium">
                              <Clock size={14} />
                              <input defaultValue={90} className="w-8 bg-transparent text-center border-b border-slate-300 focus:border-blue-500 outline-none" /> сек отдыха
                          </div>
                          <div className="flex-1 bg-slate-50 rounded-lg p-2 flex items-center justify-center gap-2 text-slate-600 text-xs font-medium cursor-pointer">
                              <RotateCcw size={14} />
                              Заменить
                          </div>
                      </div>
                  </Card>
              ))}

               {/* Big Add Button */}
               {exercises.length > 0 && (
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-4 rounded-2xl border-2 border-dashed border-blue-300 text-blue-500 font-bold flex flex-col items-center justify-center gap-2 bg-blue-50/30 hover:bg-blue-50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Plus size={24} />
                        </div>
                        Добавить упражнения
                    </button>
               )}
          </div>
      </div>

      {/* 3. Sticky Bottom Days Nav (Requirement 4.4.3) */}
      <div className="bg-white border-t border-slate-200 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] pb-safe z-30 shrink-0">
          <div className="flex p-2 gap-2 overflow-x-auto no-scrollbar">
             {days.map(day => (
                 <button 
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    className={`flex-shrink-0 min-w-[80px] h-12 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all ${selectedDayId === day.id ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/20 transform scale-105' : 'bg-slate-100 text-slate-500'}`}
                 >
                    <span>{day.name}</span>
                    <span className="text-[9px] font-normal opacity-70">{exercises.length} упр.</span>
                 </button>
             ))}
             <button className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center">
                 <Plus size={20} />
             </button>
          </div>
      </div>

      {/* 4. Add Exercises Modal */}
      {isModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center sm:justify-center animate-fade-in">
              <div className="bg-white w-full h-[85vh] sm:h-[600px] sm:w-[400px] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl">
                  {/* Modal Header */}
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                      <h2 className="text-xl font-bold text-slate-900">Добавить упражнения</h2>
                      <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                          <X size={20} className="text-slate-600" />
                      </button>
                  </div>
                  
                  {/* Filters */}
                  <div className="p-3 border-b border-slate-100 overflow-x-auto no-scrollbar flex gap-2">
                      {['Все', 'Грудь', 'Спина', 'Ноги', 'Руки'].map(filter => (
                          <button 
                            key={filter}
                            onClick={() => setModalFilter(filter)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${modalFilter === filter ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
                          >
                              {filter}
                          </button>
                      ))}
                  </div>

                  {/* Exercise List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                      {modalExercises
                        .filter(e => modalFilter === 'Все' || e.muscle === modalFilter)
                        .map(ex => {
                          const isSelected = selectedExercises.includes(ex.id);
                          return (
                              <div 
                                key={ex.id}
                                onClick={() => toggleExerciseSelection(ex.id)}
                                className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${isSelected ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                              >
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                                          <div className="w-6 h-6 bg-slate-200 rounded-full" />
                                      </div>
                                      <div>
                                          <p className={`font-bold text-sm ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>{ex.name}</p>
                                          <p className="text-xs text-slate-400">{ex.muscle}</p>
                                      </div>
                                  </div>
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                                      {isSelected && <Check size={14} className="text-white" />}
                                  </div>
                              </div>
                          );
                      })}
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 border-t border-slate-100 bg-white safe-bottom">
                      <Button onClick={handleAddExercises} disabled={selectedExercises.length === 0} className={selectedExercises.length === 0 ? 'opacity-50' : ''}>
                          Добавить {selectedExercises.length} упражнений
                      </Button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default CoachPlanEditor;