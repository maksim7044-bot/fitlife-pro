
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, MoreVertical, Calendar, TrendingUp, Utensils, Award, ChevronRight, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, Button } from '../../components/Shared';

const CoachClientProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'diary' | 'progress'>('overview');

  // Mock Data
  const client = {
    name: 'Анна Морозова',
    plan: 'Похудение Pro',
    status: 'Активна',
    img: `https://picsum.photos/seed/${id}/200`,
    weight: 68.5,
    targetWeight: 65,
    streak: 12,
  };

  const weightData = [
    { name: 'Н1', weight: 70.2 },
    { name: 'Н2', weight: 69.8 },
    { name: 'Н3', weight: 69.1 },
    { name: 'Н4', weight: 68.5 },
  ];

  const complianceData = [
    { name: 'Пн', score: 100 },
    { name: 'Вт', score: 85 },
    { name: 'Ср', score: 90 },
    { name: 'Чт', score: 100 },
    { name: 'Пт', score: 60 },
    { name: 'Сб', score: 95 },
    { name: 'Вс', score: 100 },
  ];

  // Mock Diary Data for the client
  const diaryMeals = [
      { type: 'Завтрак', name: 'Овсянка с ягодами', cals: 350, p: 12, f: 6, c: 60, time: '08:30' },
      { type: 'Обед', name: 'Салат с курицей-гриль', cals: 450, p: 45, f: 15, c: 10, time: '13:15' },
      { type: 'Перекус', name: 'Протеиновый коктейль', cals: 120, p: 24, f: 1, c: 3, time: '16:00' },
      { type: 'Ужин', name: 'Лосось со спаржей', cals: 550, p: 35, f: 25, c: 5, time: '19:30' },
  ];

  // Mock Measurement History
  const measurementHistory = [
      { date: '27 окт', weight: 68.5, chest: 95, waist: 72, hips: 98 },
      { date: '20 окт', weight: 69.1, chest: 95, waist: 73, hips: 99 },
      { date: '13 окт', weight: 69.8, chest: 96, waist: 74, hips: 100 },
  ];

  const tabs = [
    { key: 'overview', label: 'Обзор' },
    { key: 'diary', label: 'Дневник' },
    { key: 'progress', label: 'Прогресс' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
                <ArrowLeft size={24} className="text-slate-700" />
            </button>
            <div className="flex gap-2">
                <button 
                    onClick={() => navigate(`/chat/${id}`)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
                >
                    <MessageSquare size={20} />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                    <MoreVertical size={20} />
                </button>
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-md">
                <img src={client.img} alt={client.name} className="w-full h-full object-cover" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-900">{client.name}</h1>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wide">{client.status}</span>
                    <span>• {client.plan}</span>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-6 border-b border-slate-100">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-3 text-sm font-bold transition-colors relative ${activeTab === tab.key ? 'text-blue-600' : 'text-slate-400'}`}
                >
                    {tab.label}
                    {activeTab === tab.key && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                </button>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {activeTab === 'overview' && (
            <>
                <div className="grid grid-cols-2 gap-3">
                    <Card className="p-3">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Текущий вес</p>
                        <p className="text-xl font-black text-slate-800">{client.weight} <span className="text-xs text-slate-400 font-normal">кг</span></p>
                    </Card>
                    <Card className="p-3">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Серия</p>
                        <p className="text-xl font-black text-slate-800">{client.streak} <span className="text-xs text-slate-400 font-normal">дней</span></p>
                    </Card>
                </div>

                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800">Индекс соблюдения</h3>
                        <span className="text-green-500 font-bold text-sm">92%</span>
                    </div>
                    <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={complianceData}>
                                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800">Динамика веса</h3>
                        <span className="text-slate-400 text-xs">-1.7 кг</span>
                    </div>
                    <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weightData}>
                                <defs>
                                    <linearGradient id="colorW" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} fill="url(#colorW)" />
                                <Tooltip />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <div>
                    <h3 className="font-bold text-slate-800 mb-2">Последняя активность</h3>
                    <div className="space-y-2">
                        <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                            <div className="p-2 bg-orange-100 text-orange-500 rounded-lg"><Utensils size={16} /></div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-800">Записан обед</p>
                                <p className="text-xs text-slate-500">450 ккал • салат с курицей</p>
                            </div>
                            <span className="text-xs text-slate-400">2 ч назад</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-500 rounded-lg"><TrendingUp size={16} /></div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-800">Тренировка завершена</p>
                                <p className="text-xs text-slate-500">День ног • 60 мин</p>
                            </div>
                            <span className="text-xs text-slate-400">Вчера</span>
                        </div>
                    </div>
                </div>
            </>
        )}
        
        {activeTab === 'diary' && (
            <div className="space-y-4">
                 <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                      <button className="p-1 text-slate-400 hover:text-slate-600"><ArrowLeft size={18} /></button>
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                          <Calendar size={16} className="text-blue-500" /> Сегодня
                      </div>
                      <button className="p-1 text-slate-400 hover:text-slate-600"><ChevronRight size={18} /></button>
                 </div>

                 <div className="grid grid-cols-3 gap-3 text-center">
                     <div className="bg-white p-2 rounded-xl border border-slate-100">
                         <p className="text-[10px] text-slate-400 font-bold uppercase">Калории</p>
                         <p className="font-black text-slate-800">1470</p>
                     </div>
                     <div className="bg-white p-2 rounded-xl border border-slate-100">
                         <p className="text-[10px] text-slate-400 font-bold uppercase">Белки</p>
                         <p className="font-black text-green-500">116 г</p>
                     </div>
                     <div className="bg-white p-2 rounded-xl border border-slate-100">
                         <p className="text-[10px] text-slate-400 font-bold uppercase">Углеводы</p>
                         <p className="font-black text-orange-500">78 г</p>
                     </div>
                 </div>

                 <div className="space-y-3">
                     {diaryMeals.map((meal, idx) => (
                         <Card key={idx} className="flex justify-between items-center">
                             <div>
                                 <p className="text-xs font-bold text-slate-400 mb-0.5 flex items-center gap-1">
                                     <Clock size={10} /> {meal.time} • {meal.type}
                                 </p>
                                 <h4 className="font-bold text-slate-800">{meal.name}</h4>
                             </div>
                             <div className="text-right">
                                 <p className="font-black text-slate-800">{meal.cals}</p>
                                 <p className="text-[10px] text-slate-400 font-bold">ккал</p>
                             </div>
                         </Card>
                     ))}
                 </div>
            </div>
        )}

        {activeTab === 'progress' && (
             <div className="space-y-6">
                 {/* Visual Graph Placeholder for more complex metrics */}
                 <Card>
                    <h3 className="font-bold text-slate-800 mb-4">Динамика замеров</h3>
                    <div className="h-40 w-full flex items-end justify-between gap-2">
                         {[60, 65, 55, 70, 68, 75, 72].map((h, i) => (
                             <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group hover:bg-blue-200 transition-colors" style={{height: `${h}%`}}>
                                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                     {h}см
                                 </div>
                             </div>
                         ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                        <span>Н1</span><span>Н2</span><span>Н3</span><span>Н4</span>
                    </div>
                 </Card>

                 {/* Detailed History Table */}
                 <div>
                     <h3 className="font-bold text-slate-800 mb-3">История замеров</h3>
                     <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                         <table className="w-full text-sm">
                             <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase border-b border-slate-100">
                                 <tr>
                                     <th className="p-3 text-left">Дата</th>
                                     <th className="p-3 text-center">Вес</th>
                                     <th className="p-3 text-center">Талия</th>
                                     <th className="p-3 text-right">Бёдра</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-50">
                                 {measurementHistory.map((entry, i) => (
                                     <tr key={i} className="hover:bg-slate-50">
                                         <td className="p-3 font-medium text-slate-800">{entry.date}</td>
                                         <td className="p-3 text-center text-slate-600">{entry.weight} кг</td>
                                         <td className="p-3 text-center text-slate-600">{entry.waist} см</td>
                                         <td className="p-3 text-right text-slate-600">{entry.hips} см</td>
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                     </div>
                 </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CoachClientProfile;
