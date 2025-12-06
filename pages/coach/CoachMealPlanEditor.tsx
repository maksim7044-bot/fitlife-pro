
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Search, MoreHorizontal } from 'lucide-react';
import { Card, Button } from '../../components/Shared';

const CoachMealPlanEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === 'new';

  const [planName, setPlanName] = useState(isNew ? '' : 'Белковая сушка');
  const [calories, setCalories] = useState(isNew ? 2000 : 2200);
  
  // Mock Data Structure
  const [meals, setMeals] = useState([
    { id: 1, name: 'Завтрак', foods: [{ name: 'Овсяная каша', cals: 300 }] },
    { id: 2, name: 'Обед', foods: [{ name: 'Куриная грудка', cals: 165 }, { name: 'Рис', cals: 200 }] },
    { id: 3, name: 'Ужин', foods: [] },
    { id: 4, name: 'Перекус', foods: [] },
  ]);

  const addFood = (mealId: number) => {
    // In a real app, this would open a food picker modal
    const newFood = { name: 'Новый продукт', cals: 100 };
    setMeals(meals.map(m => m.id === mealId ? { ...m, foods: [...m.foods, newFood] } : m));
  };

  const removeFood = (mealId: number, foodIdx: number) => {
    setMeals(meals.map(m => m.id === mealId ? { 
      ...m, 
      foods: m.foods.filter((_, i) => i !== foodIdx) 
    } : m));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={24} className="text-slate-700" />
            </button>
            <div>
                <h1 className="text-xl font-bold text-slate-900">{isNew ? 'Новый план питания' : 'Редактировать план'}</h1>
            </div>
        </div>
        <button className="text-blue-500 font-bold text-sm hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
            <Save size={16} /> Сохранить
        </button>
      </div>

      <div className="p-4 space-y-6">
          {/* Basic Info */}
          <Card className="space-y-4">
              <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Название плана</label>
                  <input 
                    type="text" 
                    value={planName}
                    onChange={e => setPlanName(e.target.value)}
                    placeholder="например, «Баланс 1600»"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none font-bold text-slate-800"
                  />
              </div>
              <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Суточная цель (ккал)</label>
                  <input 
                    type="number" 
                    value={calories}
                    onChange={e => setCalories(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none font-bold text-slate-800"
                  />
              </div>
          </Card>

          {/* Meals Editor */}
          <div className="space-y-4">
              <h3 className="font-bold text-slate-800 px-1">Дневной график</h3>
              
              {meals.map(meal => (
                  <div key={meal.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                      <div className="bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center">
                          <h4 className="font-bold text-slate-700">{meal.name}</h4>
                          <span className="text-xs font-medium text-slate-400">
                              {meal.foods.reduce((acc, f) => acc + f.cals, 0)} ккал
                          </span>
                      </div>
                      
                      <div className="divide-y divide-slate-50">
                          {meal.foods.map((food, idx) => (
                              <div key={idx} className="p-3 flex justify-between items-center group">
                                  <div>
                                      <p className="font-medium text-sm text-slate-800">{food.name}</p>
                                      <p className="text-xs text-slate-400">{food.cals} ккал</p>
                                  </div>
                                  <button 
                                    onClick={() => removeFood(meal.id, idx)}
                                    className="p-2 text-slate-300 hover:text-red-500"
                                  >
                                      <Trash2 size={16} />
                                  </button>
                              </div>
                          ))}
                          
                          {meal.foods.length === 0 && (
                              <div className="p-4 text-center text-xs text-slate-400 italic">
                                  Продукты не добавлены
                              </div>
                          )}

                          <button 
                            onClick={() => addFood(meal.id)}
                            className="w-full p-3 text-sm font-bold text-blue-500 flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                          >
                              <Plus size={16} /> Добавить продукт
                          </button>
                      </div>
                  </div>
              ))}
              
              <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 font-bold flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-500 hover:bg-white transition-all">
                  <Plus size={20} /> Добавить приём пищи
              </button>
          </div>
      </div>
    </div>
  );
};

export default CoachMealPlanEditor;
