
import React from 'react';
import { ShoppingBag, Zap, Star, Lock, Check } from 'lucide-react';
import { Card, Button } from '../components/Shared';
import { useUser } from '../context/UserContext';

const Shop: React.FC = () => {
  const { stats, buyItem } = useUser();
  const categories = ['Все', 'Аватары', 'Бейджи', 'Темы'];
  const typeLabels = {
      Theme: 'Тема',
      Badge: 'Бейдж',
      Avatar: 'Аватар',
      Feature: 'Функция'
  };
  
  const items = [
      { id: 1, name: 'Неоновая тема', price: 500, type: 'Theme', image: '🎨' },
      { id: 2, name: 'Золотая гантель', price: 1200, type: 'Badge', image: '🏆' },
      { id: 3, name: 'Кибер-аватар', price: 800, type: 'Avatar', image: '🤖' },
      { id: 4, name: 'Премиум-аналитика', price: 2500, type: 'Feature', image: '📈' },
  ];

  const handleBuy = (item: typeof items[0]) => {
      buyItem(item);
  };

  const isOwned = (id: number) => stats.inventory?.some(i => i.id === id);

  return (
    <div className="pb-24 animate-fade-in bg-slate-50 min-h-screen">
        <div className="p-6 bg-white shadow-sm border-b border-slate-100 sticky top-0 z-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-extrabold text-slate-900">Магазин</h1>
                <div className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full font-bold text-sm flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-sm" />
                    {stats.zc} ZC
                </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {categories.map((cat, i) => (
                    <button 
                        key={cat} 
                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
            {items.map(item => {
                const owned = isOwned(item.id);
                const affordable = stats.zc >= item.price;
                
                return (
                    <Card key={item.id} className="flex flex-col items-center p-4 gap-3 relative overflow-hidden group">
                        <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">{item.image}</div>
                        <div className="text-center">
                            <p className="font-bold text-slate-800 leading-tight">{item.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mt-1">{typeLabels[item.type]}</p>
                        </div>
                        
                        {owned ? (
                            <div className="mt-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-xs font-bold flex items-center gap-1">
                                <Check size={12} /> Приобретено
                            </div>
                        ) : (
                            <Button 
                                onClick={() => handleBuy(item)}
                                disabled={!affordable}
                                className={`!py-2 !text-xs mt-2 ${!affordable ? 'opacity-50' : ''}`}
                                variant={affordable ? 'primary' : 'secondary'}
                            >
                                {!affordable ? <Lock size={12} /> : <Zap size={12} />}
                                {item.price} ZC
                            </Button>
                        )}
                    </Card>
                );
            })}
        </div>
        
        <div className="px-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white flex items-center justify-between shadow-lg shadow-blue-500/20">
                <div>
                    <p className="font-bold text-lg">Оформить премиум</p>
                    <p className="text-xs opacity-80">Удваивайте ZC и открывайте больше бонусов</p>
                </div>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Star fill="currentColor" size={20} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default Shop;
