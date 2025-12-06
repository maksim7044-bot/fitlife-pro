
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Copy, Plus, MoreHorizontal, Trash2 } from 'lucide-react';
import { Card, Button } from '../components/Shared';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { PlannedMeal } from '../types';

const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const MEAL_LABELS: Record<PlannedMeal['type'], string> = {
    Breakfast: 'Завтрак',
    Lunch: 'Обед',
    Dinner: 'Ужин',
    Snack: 'Перекус'
};

const MEAL_ICONS: Record<PlannedMeal['type'], string> = {
    Breakfast: '🍳',
    Lunch: '🥗',
    Dinner: '🍽️',
    Snack: '🍎'
};

const Planner: React.FC = () => {
    const navigate = useNavigate();
    const { plannedMeals, addPlannedMeal, removePlannedMeal } = useUser();
    
    // Calculate dates for the current week view
    const days = DAY_LABELS;
    const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1); // Start at today (Mon=0)

    // Helper to get date string for selected day (assuming current week)
    const getSelectedDateString = (index: number) => {
        const today = new Date();
        const currentDay = today.getDay() === 0 ? 6 : today.getDay() - 1;
        const diff = index - currentDay;
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + diff);
        return targetDate.toISOString().split('T')[0];
    };

    const selectedDateStr = getSelectedDateString(selectedDayIndex);

    const currentDayMeals = useMemo(() => {
        return plannedMeals.filter(m => m.date === selectedDateStr);
    }, [plannedMeals, selectedDateStr]);

    const handleAddMeal = (type: PlannedMeal['type']) => {
        // In a real app, this opens a food picker. For demo, add a mock meal.
        const mockMeals = [
            { name: 'Овсянка с ягодами', cal: 350, p: 12 },
            { name: 'Салат с курицей-гриль', cal: 450, p: 45 },
            { name: 'Протеиновый смузи', cal: 150, p: 25 },
            { name: 'Лосось с овощами', cal: 550, p: 35 },
        ];
        const randomMeal = mockMeals[Math.floor(Math.random() * mockMeals.length)];
        
        const newMeal: PlannedMeal = {
            id: Date.now().toString(),
            date: selectedDateStr,
            type,
            name: randomMeal.name,
            calories: randomMeal.cal,
            protein: randomMeal.p
        };
        addPlannedMeal(newMeal);
    };

    return (
        <div className="pb-24 animate-fade-in bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
                <button onClick={() => navigate(-1)}><ChevronLeft size={24} className="text-slate-600" /></button>
                <h1 className="font-bold text-slate-900">План питания</h1>
                <button><Copy size={20} className="text-slate-400 hover:text-blue-500" /></button>
            </div>

            {/* Calendar Strip */}
            <div className="bg-white pt-2 pb-4 px-4 border-b border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
                <div className="flex justify-between min-w-[320px]">
                    {days.map((d, i) => {
                         // Calculate simplified day number for display
                         const today = new Date();
                         const currentDay = today.getDay() === 0 ? 6 : today.getDay() - 1;
                         const targetDate = new Date();
                         targetDate.setDate(today.getDate() + (i - currentDay));
                         
                         return (
                            <button 
                                key={d} 
                                onClick={() => setSelectedDayIndex(i)}
                                className={`flex flex-col items-center gap-1 min-w-[40px] transition-all ${i === selectedDayIndex ? 'text-blue-600 scale-110' : 'text-slate-400'}`}
                            >
                                <span className="text-xs font-bold">{d}</span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i === selectedDayIndex ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100'}`}>
                                    {targetDate.getDate()}
                                </div>
                            </button>
                         )
                    })}
                </div>
            </div>

            {/* Plan Content */}
            <div className="p-4 space-y-6">
                {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as PlannedMeal['type'][]).map((type) => {
                    const mealsForType = currentDayMeals.filter(m => m.type === type);
                    
                    return (
                        <div key={type}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-slate-800">{MEAL_LABELS[type]}</h3>
                                <span className="text-xs text-slate-400 font-medium">
                                    {mealsForType.reduce((acc, m) => acc + m.calories, 0)} ккал
                                </span>
                            </div>
                            
                            <div className="space-y-2">
                                {mealsForType.map(meal => (
                                    <Card key={meal.id} className="!p-3 flex gap-3 items-center border-l-4 border-l-blue-500">
                                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-lg">
                                            {MEAL_ICONS[type]}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-800 text-sm">{meal.name}</p>
                                            <p className="text-xs text-slate-500">{meal.calories} ккал • {meal.protein} г белка</p>
                                        </div>
                                        <button 
                                            onClick={() => removePlannedMeal(meal.id)}
                                            className="text-slate-300 hover:text-red-500 p-2"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </Card>
                                ))}

                                <button 
                                    onClick={() => handleAddMeal(type as any)}
                                    className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm gap-2 hover:bg-white hover:border-blue-300 hover:text-blue-500 transition-colors"
                                >
                                    <Plus size={16} /> Добавить {MEAL_LABELS[type].toLowerCase()}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="px-4 mt-4">
                 <Button variant="secondary" className="!bg-white border border-slate-200 shadow-sm">
                    Сохранить как шаблон
                 </Button>
            </div>
        </div>
    );
};

export default Planner;
