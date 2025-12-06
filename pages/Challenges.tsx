
import React, { useState } from 'react';
import { Trophy, Users, Target, ArrowRight, Shield, Crown, Medal } from 'lucide-react';
import { Card, Button, ProgressBar } from '../components/Shared';
import { useUser } from '../context/UserContext';

const Challenges: React.FC = () => {
  const { stats } = useUser();
  const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard'>('challenges');
  const [leaderboardFilter, setLeaderboardFilter] = useState<'global' | 'friends'>('global');

  const leaderboardData = [
      { rank: 1, name: 'Игорь Титов', xp: 15400, img: 'https://picsum.photos/seed/mike/100', isFriend: false },
      { rank: 2, name: 'Анна Морозова', xp: 14200, img: 'https://picsum.photos/seed/sarah/100', isFriend: true },
      { rank: 3, name: 'Кирилл Волков', xp: 13800, img: 'https://picsum.photos/seed/john/100', isFriend: false },
      { rank: 4, name: 'Марина Орлова', xp: 12500, img: 'https://picsum.photos/seed/bruce/100', isFriend: true },
      { rank: 5, name: 'Олег Лебедев', xp: 11000, img: 'https://picsum.photos/seed/clark/100', isFriend: false },
  ];

  // Insert current user into list for demo
  const userRankEntry = { 
      rank: 428, 
      name: stats.name || 'Вы', 
      xp: stats.xp, 
      img: 'https://picsum.photos/seed/me/100', 
      isMe: true,
      isFriend: false
  };

  const getRankIcon = (rank: number) => {
      if (rank === 1) return <Crown size={20} className="text-yellow-500 fill-yellow-500" />;
      if (rank === 2) return <Medal size={20} className="text-slate-400 fill-slate-400" />;
      if (rank === 3) return <Medal size={20} className="text-orange-700 fill-orange-700" />;
      return <span className="font-bold text-slate-500 w-5 text-center">{rank}</span>;
  };

  return (
    <div className="pb-24 animate-fade-in bg-slate-50 min-h-screen">
       <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 pb-6 rounded-b-3xl shadow-xl">
          <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-extrabold">Арена</h1>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/10">
                  Глобальный рейтинг №{userRankEntry.rank}
              </div>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex p-1 bg-black/20 rounded-xl backdrop-blur-sm">
              <button 
                onClick={() => setActiveTab('challenges')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'challenges' ? 'bg-white text-purple-700 shadow-sm' : 'text-white/70 hover:text-white'}`}
              >
                  Челленджи
              </button>
              <button 
                onClick={() => setActiveTab('leaderboard')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'leaderboard' ? 'bg-white text-purple-700 shadow-sm' : 'text-white/70 hover:text-white'}`}
              >
                  Таблица лидеров
              </button>
          </div>
       </div>

       <div className="p-4 space-y-6 relative z-10">
           
           {activeTab === 'challenges' ? (
               <>
                    {/* Active Challenge */}
                    <Card className="!p-0 overflow-hidden border-none shadow-lg">
                        <div className="bg-orange-500 p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-2 font-bold">
                                <Target size={20} /> Активно
                            </div>
                            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">До конца 2 дня</span>
                        </div>
                        <div className="p-4 bg-white">
                            <h3 className="text-lg font-bold text-slate-800 mb-1">Неделя без сахара</h3>
                            <p className="text-sm text-slate-500 mb-4">Исключите сладкие напитки и десерты на 7 дней подряд.</p>
                            <ProgressBar current={5} max={7} color="bg-orange-500" label="Дни завершены" />
                        </div>
                    </Card>

                    {/* Available Challenges */}
                    <div>
                        <h3 className="font-bold text-slate-800 mb-3 px-1">Доступно сейчас</h3>
                        <div className="space-y-3">
                            {[
                                { title: '10 тыс. шагов в день', reward: '100 опыта', users: '12 тыс.', icon: '🏃' },
                                { title: 'Жаворонок', reward: 'Бейдж', users: '5 тыс.', icon: '🌅' },
                            ].map((c, i) => (
                                <Card key={i} className="flex items-center gap-4">
                                    <div className="text-3xl">{c.icon}</div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800">{c.title}</h4>
                                        <div className="flex gap-3 text-xs text-slate-500 mt-1">
                                            <span className="flex items-center gap-1 text-yellow-600 font-bold"><Trophy size={12} /> {c.reward}</span>
                                            <span className="flex items-center gap-1"><Users size={12} /> {c.users}</span>
                                        </div>
                                    </div>
                                    <Button variant="secondary" className="!w-auto !py-2 !text-xs">Вступить</Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                    
                    {/* Teaser to switch tab */}
                    <Card 
                        className="bg-slate-800 text-white flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
                        onClick={() => setActiveTab('leaderboard')}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-yellow-400">
                                <Shield size={20} />
                            </div>
                            <div>
                                <p className="font-bold">Смотреть таблицу</p>
                                <p className="text-xs text-slate-400">Узнайте своё место</p>
                            </div>
                        </div>
                        <ArrowRight size={20} className="text-slate-500" />
                    </Card>
               </>
           ) : (
               <>
                   {/* Filter */}
                   <div className="flex justify-center gap-2 mb-2">
                       <button 
                            onClick={() => setLeaderboardFilter('global')}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold border ${leaderboardFilter === 'global' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'}`}
                       >
                           Глобально
                       </button>
                       <button 
                            onClick={() => setLeaderboardFilter('friends')}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold border ${leaderboardFilter === 'friends' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'}`}
                       >
                           Друзья
                       </button>
                   </div>

                   {/* List */}
                   <div className="space-y-2">
                       {/* Top 3 */}
                       <div className="flex justify-center items-end gap-4 mb-6 mt-2">
                           {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((user, i) => (
                               <div key={user.rank} className={`flex flex-col items-center ${i === 1 ? '-mb-2 z-10' : ''}`}>
                                   <div className={`relative rounded-full border-4 ${i === 1 ? 'w-20 h-20 border-yellow-400 shadow-xl shadow-yellow-500/30' : 'w-14 h-14 border-slate-200'}`}>
                                       <img src={user.img} className="w-full h-full rounded-full object-cover" />
                                       <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white">
                                           #{user.rank}
                                       </div>
                                   </div>
                                   <p className="font-bold text-xs mt-4 text-slate-800">{user.name.split(' ')[0]}</p>
                                   <p className="text-[10px] text-slate-500 font-bold">{user.xp / 1000}k</p>
                               </div>
                           ))}
                       </div>

                       {/* Rest of list */}
                       {leaderboardData.slice(3).map(user => (
                           <div key={user.rank} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-4 shadow-sm">
                               <div className="w-6 flex justify-center">{getRankIcon(user.rank)}</div>
                               <img src={user.img} className="w-10 h-10 rounded-full bg-slate-100" />
                               <div className="flex-1">
                                   <p className="font-bold text-sm text-slate-800">{user.name}</p>
                                   <p className="text-xs text-slate-400">Уровень {Math.floor(user.xp / 1000)}</p>
                               </div>
                               <div className="text-right">
                                   <p className="font-bold text-sm text-blue-600">{user.xp}</p>
                                   <p className="text-[10px] text-slate-400 font-medium">опыт</p>
                               </div>
                           </div>
                       ))}

                       {/* User Sticky Item */}
                       <div className="sticky bottom-20 mt-4 bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-4 shadow-xl text-white transform scale-105">
                               <div className="w-6 flex justify-center text-slate-400 font-bold text-sm">#{userRankEntry.rank}</div>
                               <img src={userRankEntry.img} className="w-10 h-10 rounded-full bg-slate-700 border-2 border-blue-500" />
                               <div className="flex-1">
                                   <p className="font-bold text-sm">Вы</p>
                                   <p className="text-xs text-slate-400">Уровень {stats.level}</p>
                               </div>
                               <div className="text-right">
                                   <p className="font-bold text-sm text-blue-400">{userRankEntry.xp}</p>
                                   <p className="text-[10px] text-slate-500 font-medium">опыт</p>
                               </div>
                        </div>
                   </div>
               </>
           )}
       </div>
    </div>
  );
};

export default Challenges;
