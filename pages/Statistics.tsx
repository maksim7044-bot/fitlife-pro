
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '../components/Shared';
import { useUser } from '../context/UserContext';

const Statistics: React.FC = () => {
  const { foodLogs, measurementLogs } = useUser();

  // Aggregate data for the last 7 days
  const data = useMemo(() => {
      const result = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
          const dayName = d.toLocaleDateString('ru-RU', { weekday: 'short' });

          // Calculate Calories for this day
          const calories = foodLogs
              .filter(log => log.timestamp.startsWith(dateStr))
              .reduce((acc, curr) => acc + curr.macros.calories, 0);

          // Find Weight for this day (or use most recent previous)
          // For simplicity, we try to find exact match, otherwise look for the latest measurement before this date
          const exactWeight = measurementLogs.find(log => log.timestamp.startsWith(dateStr))?.weight;
          
          // Fallback logic for weight line graph continuity
          let displayWeight = exactWeight;
          if (!displayWeight) {
              const prevMeasurements = measurementLogs.filter(log => new Date(log.timestamp) < d);
              if (prevMeasurements.length > 0) {
                  displayWeight = prevMeasurements[0].weight; // Assuming sorted desc in context, if not sort first
              } else {
                  displayWeight = 75; // Default fallback if no history
              }
          }

          result.push({
              name: dayName,
              date: dateStr,
              kcal: calories,
              weight: displayWeight
          });
      }
      return result;
  }, [foodLogs, measurementLogs]);

  return (
    <div className="p-4 pb-24 space-y-6 animate-fade-in bg-slate-50 min-h-screen">
        <h1 className="text-2xl font-extrabold text-slate-900">Ваш прогресс</h1>

        {/* Weight Chart */}
        <Card>
            <h3 className="font-bold text-slate-800 mb-4">Динамика веса (7 дней)</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
                        <Tooltip 
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                            labelStyle={{color: '#64748b'}}
                        />
                        <Area type="monotone" dataKey="weight" name="Вес" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>

        {/* Calories Chart */}
        <Card>
            <h3 className="font-bold text-slate-800 mb-4">Потребление калорий</h3>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <Tooltip 
                             cursor={{fill: '#f1f5f9'}}
                             contentStyle={{borderRadius: '12px', border: 'none'}} 
                        />
                        <Bar dataKey="kcal" name="Калории" fill="#fb923c" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    </div>
  );
};

export default Statistics;
