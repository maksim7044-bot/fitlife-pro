
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Scan, Mic } from 'lucide-react';
import { Card, Button } from '../components/Shared';
import { RECENT_FOODS } from '../constants';
import { useUser } from '../context/UserContext';
import { FoodItem } from '../types';
import { hapticFeedback, notificationFeedback } from '../utils/telegram';

const AddFood: React.FC = () => {
    const navigate = useNavigate();
    const { addFoodItem, addXp, addZc } = useUser();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSave = (food: Partial<FoodItem>) => {
        const newItem: FoodItem = {
            id: Date.now().toString(),
            name: food.name || 'Быстрое добавление',
            macros: food.macros || { calories: 100, protein: 5, fats: 2, carbs: 10 },
            timestamp: new Date().toISOString(),
            mealType: 'breakfast' // default for quick add
        };

        addFoodItem(newItem);
        addXp(5, 'Продукт добавлен');
        addZc(2);
        notificationFeedback('success');
        navigate('/diary');
    };

    const createNewFood = () => {
        const newItem: FoodItem = {
            id: Date.now().toString(),
            name: searchTerm || 'Новый продукт',
            macros: { calories: 250, protein: 10, fats: 5, carbs: 20 },
            timestamp: new Date().toISOString(),
            mealType: 'breakfast'
        };
        addFoodItem(newItem);
        addXp(10, 'Создан новый продукт');
        notificationFeedback('success');
        navigate('/diary');
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20 relative z-10">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold">Добавить продукт</h1>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Поиск продуктов (например, «яблоко», «овсянка»)..."
                        className="w-full bg-slate-100 rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 border-transparent border"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                    <div className="absolute right-2 top-2 flex gap-1">
                        <button className="p-1.5 text-slate-500 hover:text-blue-500"><Scan size={20} /></button>
                        <button className="p-1.5 text-slate-500 hover:text-blue-500"><Mic size={20} /></button>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Quick Add Tabs */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {['Недавнее', 'Избранное', 'Мои блюда', 'Рецепты'].map((tab, i) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${i === 0 ? 'bg-blue-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-3">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">История за сегодня</h2>
                    {RECENT_FOODS.map((food) => (
                        <Card key={food.id} className="flex justify-between items-center active:bg-slate-50" onClick={() => handleSave(food)}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">
                                    🥑
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">{food.name}</p>
                                    <p className="text-xs text-slate-500">
                                        {food.macros.calories} ккал • {food.macros.protein} г белка • {food.macros.carbs} г углеводов
                                    </p>
                                </div>
                            </div>
                            <button className="w-8 h-8 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-50">
                                <Plus size={18} />
                            </button>
                        </Card>
                    ))}
                </div>

                <Button className="mt-4" onClick={createNewFood}>
                    Создать «{searchTerm || 'Новый продукт'}»
                </Button>
            </div>
        </div>
    );
};

export default AddFood;
