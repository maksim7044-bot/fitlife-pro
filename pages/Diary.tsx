
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal, Flame, X, Trash2, Edit3 } from 'lucide-react';
import { Card, ProgressBar, Button } from '../components/Shared';
import { DAILY_TARGETS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FoodItem } from '../types';

const Diary: React.FC = () => {
  const navigate = useNavigate();
  const { foodLogs, deleteFoodItem } = useUser();
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const MEAL_LABELS: Record<FoodItem['mealType'], string> = {
    breakfast: 'Завтрак',
    lunch: 'Обед',
    dinner: 'Ужин',
    snack: 'Перекус'
  };

  // Calculate totals from real logs
  const totals = foodLogs.reduce((acc, item) => ({
      calories: acc.calories + item.macros.calories,
      protein: acc.protein + item.macros.protein,
      fats: acc.fats + item.macros.fats,
      carbs: acc.carbs + item.macros.carbs
  }), { calories: 0, protein: 0, fats: 0, carbs: 0 });

  const meals = [
    { id: 'breakfast', name: MEAL_LABELS.breakfast, items: foodLogs.filter(f => f.mealType === 'breakfast') },
    { id: 'lunch', name: MEAL_LABELS.lunch, items: foodLogs.filter(f => f.mealType === 'lunch') },
    { id: 'dinner', name: MEAL_LABELS.dinner, items: foodLogs.filter(f => f.mealType === 'dinner') },
    { id: 'snack', name: 'Перекусы', items: foodLogs.filter(f => f.mealType === 'snack') }
  ];

  const handleDelete = () => {
      if (selectedItem) {
          deleteFoodItem(selectedItem.id);
          setSelectedItem(null);
      }
  };

  return (
    <div className="pb-24 animate-fade-in bg-slate-50 min-h-screen">
      {/* Header Date Nav */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 shadow-sm flex justify-between items-center">
        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><ChevronLeft size={24} /></button>
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-slate-900">Сегодня</h1>
            <span className="text-xs text-slate-500 font-medium">27 окт 2023</span>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><ChevronRight size={24} /></button>
      </div>

      <div className="p-4 space-y-6">
        {/* Macro Summary */}
        <Card className="bg-white border-none shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Сводка дня</h3>
                <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                    <Flame size={16} fill="currentColor" />
                    {Math.max(0, DAILY_TARGETS.calories - totals.calories)} осталось
                </div>
            </div>
            
            <div className="space-y-3">
                <ProgressBar label="Калории" current={totals.calories} max={DAILY_TARGETS.calories} color="bg-blue-500" />
                <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Белки</div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1">
                             <div className="h-full bg-green-500" style={{width: `${Math.min((totals.protein / DAILY_TARGETS.protein) * 100, 100)}%`}}></div>
                        </div>
                        <div className="text-[10px] font-bold">{totals.protein} / {DAILY_TARGETS.protein} г</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Жиры</div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1">
                             <div className="h-full bg-yellow-500" style={{width: `${Math.min((totals.fats / DAILY_TARGETS.fats) * 100, 100)}%`}}></div>
                        </div>
                        <div className="text-[10px] font-bold">{totals.fats} / {DAILY_TARGETS.fats} г</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Углеводы</div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1">
                             <div className="h-full bg-purple-500" style={{width: `${Math.min((totals.carbs / DAILY_TARGETS.carbs) * 100, 100)}%`}}></div>
                        </div>
                        <div className="text-[10px] font-bold">{totals.carbs} / {DAILY_TARGETS.carbs} г</div>
                    </div>
                </div>
            </div>
        </Card>

        {/* Meals List */}
        <div className="space-y-4">
            {meals.map(meal => (
                <div key={meal.id}>
                    <div className="flex justify-between items-center mb-2 px-1">
                        <h2 className="text-lg font-bold text-slate-800">{meal.name}</h2>
                        <span className="text-sm text-slate-400 font-medium">
                            {meal.items.reduce((acc, item) => acc + item.macros.calories, 0)} ккал
                        </span>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        {meal.items.length > 0 ? (
                            <div className="divide-y divide-slate-50">
                                {meal.items.map(item => (
                                    <div 
                                        key={item.id} 
                                        className="p-4 flex justify-between items-center active:bg-slate-50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        <div>
                                            <p className="font-medium text-slate-800">{item.name}</p>
                                            <p className="text-xs text-slate-500">
                                                {item.macros.calories} ккал • Белки: {item.macros.protein} г • Жиры: {item.macros.fats} г • Углеводы: {item.macros.carbs} г
                                            </p>
                                        </div>
                                        <button className="text-slate-300 hover:text-slate-500">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 text-center">
                                <p className="text-sm text-slate-400">Пока нет записей</p>
                            </div>
                        )}
                        
                        <button 
                            onClick={() => navigate('/add')}
                            className="w-full p-3 flex items-center justify-center gap-2 text-blue-500 font-medium hover:bg-blue-50 transition-colors border-t border-slate-50"
                        >
                            <Plus size={18} /> Добавить продукт
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Details Modal */}
        {selectedItem && (
            <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center animate-fade-in" onClick={() => setSelectedItem(null)}>
                <div className="bg-white w-full rounded-t-3xl p-6 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{selectedItem.name}</h2>
                            <p className="text-slate-500 capitalize">{MEAL_LABELS[selectedItem.mealType] || 'Приём пищи'}</p>
                        </div>
                        <button onClick={() => setSelectedItem(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-8">
                        <div className="bg-blue-50 p-3 rounded-xl text-center">
                            <p className="text-xs font-bold text-slate-400">Ккал</p>
                            <p className="font-black text-slate-800">{selectedItem.macros.calories}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-xl text-center">
                            <p className="text-xs font-bold text-slate-400">Белки</p>
                            <p className="font-black text-slate-800">{selectedItem.macros.protein}g</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-xl text-center">
                            <p className="text-xs font-bold text-slate-400">Жиры</p>
                            <p className="font-black text-slate-800">{selectedItem.macros.fats}g</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-xl text-center">
                            <p className="text-xs font-bold text-slate-400">Углеводы</p>
                            <p className="font-black text-slate-800">{selectedItem.macros.carbs}g</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button variant="secondary" onClick={() => alert('Здесь появится окно редактирования')}>
                            <Edit3 size={18} /> Редактировать запись
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            <Trash2 size={18} /> Удалить запись
                        </Button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Diary;
